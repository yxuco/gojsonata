/*
 * Copyright © 2018. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */

package gojsonata

import (
	"fmt"
	"io/ioutil"
	"path"
	"strings"
	"sync"

	"github.com/pkg/errors"
	"github.com/robertkrimen/otto"
	"github.com/yxuco/gojsonata/jsdata"
)

// Engine is modular vm environment
type Engine struct {
	// it is based on otto
	*otto.Otto
	// sourceCache contains the exported value of loaded source code - sync map[string]otto.Value
	sourceCache sync.Map
}

// NewEngine creates a new otto vm instance.
func NewEngine() *Engine {
	return &Engine{
		Otto: otto.New(),
	}
}

var jsengine *Engine

func init() {
	jsengine = NewEngine()
	jsengine.registerResources()

	// Provide global "require" method in the module scope.
	jsRequire := func(call otto.FunctionCall) otto.Value {
		jsModuleName := call.Argument(0).String()

		moduleValue, err := jsengine.Require(jsModuleName)
		if err != nil {
			jsException(jsengine, "failed to load required module "+jsModuleName+": "+err.Error())
			return otto.UndefinedValue()
		}
		return moduleValue
	}
	jsengine.Set("require", jsRequire)

	// set global var for jsonata module
	jm, _ := jsengine.Require("jsonata")
	jsengine.Set("jsonata", jm)

	// define global js function for jsonata transformation
	jsengine.Run(`var transform = function(data, expr) {
		var expression = jsonata(expr);
		var result = expression.evaluate(JSON.parse(data));
		return JSON.stringify(result);
	}`)
}

// CachedModules returns names of js modules currently loaded in the engine
func CachedModules() []string {
	var keys []string
	jsengine.sourceCache.Range(func(k, v interface{}) bool {
		keys = append(keys, k.(string))
		return true
	})
	return keys
}

// Transform executes JSONata expression on input JSON data, and returns the transformation result
func Transform(data, expr string) (string, error) {
	value, err := jsengine.Call("transform", nil, data, expr)
	if err != nil {
		return "", errors.Wrapf(err, "failed to transform data")
	}
	return value.String(), nil
}

// CallScriptFile evaluates content of js or json file, and return value of specified result var
// the file extension must be .js or .json
func CallScriptFile(filename, result string) (otto.Value, error) {
	source, err := ioutil.ReadFile(filename)
	if err != nil {
		return otto.UndefinedValue(), err
	}

	// call json parser
	if path.Ext(filename) == ".json" {
		return jsengine.Call("JSON.parse", nil, string(source))
	}
	return CallScript(string(source), result)
}

// CallScript evaluates a js script, and return value of specified result var
// It checks if all required modules are loaded in cache
func CallScript(source, result string) (otto.Value, error) {
	// wrap script in a js function
	source = "(function() {\n" + source + "\nreturn " + result + ";\n})"

	// Note: support for require(module) added to init()
	return jsengine.Call(source, nil)
}

// RunScript executes js script and returns the result
// It checks if all required modules are loaded in cache
func RunScript(source interface{}) (otto.Value, error) {
	// Note: support for require(module) added to init()
	return jsengine.Run(source)
}

// AddModuleSource loads source code of a js module file and add the result to cache,
// so later script evaluation can use this module
func AddModuleSource(key, source string) error {
	return jsengine.addModule(key, source)
}

// AddModuleFile loads content of a js module file and add the result to cache,
// so later script evaluation can use this module
func AddModuleFile(filename string) error {
	source, err := ioutil.ReadFile(filename)
	if err != nil {
		return err
	}

	return jsengine.addModule(sourceKey(filename), string(source))
}

// LoadModule loads source code of a js module.
// It recursively loads dependent modules required by the source code.
// All dependent modules' source code should be preloaded in jsdata, or loaded before this module.
// Note: this implementation is based on https://github.com/ddliu/motto/blob/master/module.go
func (m *Engine) LoadModule(source string) (otto.Value, error) {
	// Wraps the source to create a module environment
	source = "(function(module) {var require = module.require;var exports = module.exports;var __dirname = module.__dirname;\n" + source + "\n})"

	// Provide the "require" method in the module scope.
	jsRequire := func(call otto.FunctionCall) otto.Value {
		jsModuleName := call.Argument(0).String()

		moduleValue, err := m.Require(jsModuleName)
		if err != nil {
			jsException(m, "failed to load required module "+jsModuleName+": "+err.Error())
			return otto.UndefinedValue()
		}
		return moduleValue
	}

	jsModule, _ := m.Object(`({exports: {}})`)
	jsModule.Set("require", jsRequire)
	jsModule.Set("__dirname", "")
	jsExports, _ := jsModule.Get("exports")

	// Run the module source, with "jsModule" as the "module" variable, "jsExports" as "this"(Nodejs capable).
	moduleReturn, err := m.Call(source, jsExports, jsModule)
	if err != nil {
		return otto.UndefinedValue(), err
	}

	if !moduleReturn.IsUndefined() {
		jsModule.Set("exports", moduleReturn)
		return moduleReturn, nil
	}
	return jsModule.Get("exports")
}

// Require implements js 'require(name)' for modeules.
// It first check if the module is already in cache, then check if it is a preloaded resource in jsdata.
// It returns error if source code of the specified module is not found.
// Note: input name may contains file path info, e.g., ./js/mycode.js, but
// the cache key will use only the file name without suffix, i.e., mycode => value
func (m *Engine) Require(name string) (otto.Value, error) {
	// return cached value if already loaded
	key := sourceKey(name)
	if cache, ok := m.sourceCache.Load(key); ok {
		fmt.Printf("found module %s in cache\n", name)
		return cache.(otto.Value), nil
	}

	// find a known asset in jsdata
	asset := assetName(name)
	if asset != "" {
		// load a known asset and add it to cache
		if err := m.registerResource(asset); err != nil {
			return otto.UndefinedValue(), err
		}
		// return the newly added asset in cache
		if value, ok := m.sourceCache.Load(key); ok {
			return value.(otto.Value), nil
		}
	}
	return otto.UndefinedValue(), errors.Errorf("required module %s is not loaded", name)
}

func (m *Engine) registerResources() error {
	// must load traceur-runtime first
	traceurAsset := assetName("traceur-runtime")
	if traceurAsset != "" {
		if err := m.registerResource(traceurAsset); err != nil {
			return err
		}
	} else {
		return errors.New("cannot find traceur-runtime in jsdata")
	}

	// add all other known asset from jsdata
	assets := jsdata.AssetNames()
	for _, a := range assets {
		err := m.registerResource(a)
		if err != nil {
			return err
		}
	}
	return nil
}

func (m *Engine) registerResource(name string) error {
	// check cache first
	key := sourceKey(name)
	if _, ok := m.sourceCache.Load(key); ok {
		fmt.Printf("module %s already loaded, skip register\n", name)
		return nil
	}

	// load a known asset
	data := jsdata.MustAsset(name)
	return m.addModule(key, string(data))
}

// addModule loads source code of a js module and add the result to cache,
// so later script evaluation can use this module
func (m *Engine) addModule(key, source string) error {
	fmt.Printf("load resource %s content %d ...\n", key, len(source))
	oValue, err := m.LoadModule(source)
	if err != nil {
		return errors.Wrapf(err, "failed to load js resource %s", key)
	}
	fmt.Printf("add resource %s to cache\n", key)
	m.sourceCache.Store(key, oValue)
	return nil
}

// assetName is the asset ID in jsdata, it may not be the same as the module name in request('module')
// e.g., require('./datetime') refers the asset name 'js/datetime.js'
// here, we find the asset correponding to a module name by comparing keys of all known assets
// return the asset name, or "" if not found
func assetName(module string) string {
	key := sourceKey(module)
	assets := jsdata.AssetNames()
	for _, a := range assets {
		if key == sourceKey(a) {
			return a
		}
	}
	return ""
}

func sourceKey(name string) string {
	key := path.Base(strings.ToLower(strings.TrimSpace(name)))
	ext := path.Ext(key)
	if ext == ".js" {
		key = key[0 : len(key)-3]
	}
	return key
}

// Throw a javascript error, see https://github.com/robertkrimen/otto/issues/17
func jsException(vm *Engine, msg string) {
	value, _ := vm.Call("new Error", nil, msg)
	panic(value)
}
