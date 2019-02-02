# gojsonata
Execute JSONata query and transformation expressions in Golang.

## Problem Statement
We want a generic solution for transfomation of structured data in Golang.  [XSLT](https://www.w3.org/TR/xslt-30/) is the most advanced solution for transforming XML data, but it is not well supported by Golang.  [JSONata](http://jsonata.org/) is an elegant solution for transforming JSON data, but it supports only JavaScropts.

This project describes how to execute JSONata transformation expressions in Golang.  Following are the tools used to make it work.
* [otto](https://github.com/robertkrimen/otto) - A JavaScript interpreter in Go.  It supports only ES5 syntax.
* [JSONata](https://github.com/jsonata-js/jsonata) - query and transformation language for JSON.
* [traceur](https://github.com/google/traceur-compiler) - JavaScript transpiler for generating ES5 code from ES6+ code.
* [go-bindata](https://github.com/jteeuwen/go-bindata) - Go utility for converting any file into Golang source code.

We provide scripts to transpile JSONata code to ES5, and then convert the resulting files into Golang source code.

We then implement a Golang utility that you can use to transform any JSON data using JSONata expressions.  This utility creates an otto JavaScript interpreter, and preloads JSONata lib scripts when the it is loaded.  Thus, any complex data transformation request can be handled by a simple function call with input JSON data and an JSONata expression.

## Installation
Install [Go version 1.11.x](https://golang.org/doc/install) and [set GOPATH environment variable](https://golang.org/doc/code.html#GOPATH).  Clone this project, then setup and test it as follows:
```
export PATH=${GOPATH}/bin:${PATH}
go get -u -d github.com/yxuco/gojsonata
cd ${GOPATH}/src/github.com/yxuco/gojsonata
make
```

## Examples

Following Golang example shows a JSONata expression [vehicle-expr.txt](https://github.com/yxuco/gojsonata/tree/master/tests/vehicle-expr.txt) on the input data [vehicle.json](https://github.com/yxuco/gojsonata/tree/master/tests/vehicle.json).
```
	data, _ := ioutil.ReadFile("./tests/vehicle.json")
	expr, _ := ioutil.ReadFile("./tests/vehicle-expr.txt")
	result, _ := Transform(string(data), string(expr))
	fmt.Printf("result value: %s\n", result)
```

A simpler transformation can also be done as follows:
```
	value, _ := RunScript(
		`var data = {
		  example: [
		    {value: 4},
		    {value: 7},
		    {value: 13}
		  ]
	    };
	  
	    var expression = jsonata('$sum(example.value)');
	    expression.evaluate(data);`)
	result, _ := value.ToInteger()  // result = 24
```

The file [jsengine_test.go](https://github.com/yxuco/gojsonata/blob/master/jsengine_test.go) shows more Golang examples.

You may also use [motto](https://github.com/ddliu/motto) command-line tool to test JSONata transformations, which is demonstrated by the following commands in the [Makefile](https://github.com/yxuco/gojsonata/blob/master/Makefile).
```
    make motto
```

For quick interactive testing of JSONata scripts, you can use http://try.jsonata.org/ to edit JSON data and JSONata scripts, and view the results immediately. 