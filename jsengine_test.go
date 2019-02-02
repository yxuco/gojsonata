/*
 * Copyright © 2018. TIBCO Software Inc.
 * This file is subject to the license terms contained
 * in the license file that is distributed with this file.
 */
package gojsonata

import (
	"fmt"
	"io/ioutil"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestEngineInit(t *testing.T) {
	modules := CachedModules()
	fmt.Printf("cached modules %+v\n", modules)
	assert.Equal(t, 7, len(modules), "number of initial cache should contain 7 modules")
	assert.Contains(t, modules, "traceur-runtime", "traceur-runtime should be one of the cached modules")
	assert.Contains(t, modules, "jsonata", "jsonata should be one of the cached modules")
	assert.Contains(t, modules, "parser", "parser should be one of the cached modules")
	assert.Contains(t, modules, "functions", "functions should be one of the cached modules")
	assert.Contains(t, modules, "signature", "signature should be one of the cached modules")
	assert.Contains(t, modules, "utils", "utils should be one of the cached modules")
	assert.Contains(t, modules, "datetime", "datetime should be one of the cached modules")
}

func TestSimpleExpr(t *testing.T) {

	value, err := RunScript(
		`var data = {
		  example: [
		    {value: 4},
		    {value: 7},
		    {value: 13}
		  ]
	    };
	  
	    var expression = jsonata('$sum(example.value)');
	    expression.evaluate(data);`)
	require.NoError(t, err, "simple expression should not result in error")
	result, err := value.ToInteger()
	require.NoError(t, err, "result should be an integer")
	assert.Equal(t, int64(24), result, "sum of values should be 24")
}

func TestCallScript(t *testing.T) {
	result, err := CallScriptFile("./tests/vehicle.js", "result")
	require.NoError(t, err, "load vehicle.js file should not be error")
	expected, err := ioutil.ReadFile("./tests/vehicle-result.json")
	require.NoError(t, err, "read result file should not be error")
	assert.Equal(t, string(expected), result.String(), "result should match content of vehicle-result.json")
}

func TestTransform(t *testing.T) {
	data, err := ioutil.ReadFile("./tests/vehicle.json")
	require.NoError(t, err, "read data file should not be error")
	expr, err := ioutil.ReadFile("./tests/vehicle-expr.txt")
	require.NoError(t, err, "read expr file should not be error")
	result, err := Transform(string(data), string(expr))
	require.NoError(t, err, "call transform function should not be error")
	fmt.Printf("result value: %s\n", result)
	expected, err := ioutil.ReadFile("./tests/vehicle-result.json")
	require.NoError(t, err, "read result file should not be error")
	assert.Equal(t, string(expected), result, "result should match content of vehicle-result.json")
}
