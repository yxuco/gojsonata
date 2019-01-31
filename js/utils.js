"use strict";
var utils = (function() {
  'use strict';
  function isNumeric(n) {
    var isNum = false;
    if (typeof n === 'number') {
      isNum = !isNaN(n);
      if (isNum && !isFinite(n)) {
        throw {
          code: "D1001",
          value: n,
          stack: (new Error()).stack
        };
      }
    }
    return isNum;
  }
  function isArrayOfStrings(arg) {
    var result = false;
    if (Array.isArray(arg)) {
      result = (arg.filter(function(item) {
        return typeof item !== 'string';
      }).length === 0);
    }
    return result;
  }
  function isArrayOfNumbers(arg) {
    var result = false;
    if (Array.isArray(arg)) {
      result = (arg.filter(function(item) {
        return !isNumeric(item);
      }).length === 0);
    }
    return result;
  }
  function createSequence() {
    var sequence = [];
    sequence.sequence = true;
    if (arguments.length === 1) {
      sequence.push(arguments[0]);
    }
    return sequence;
  }
  function isSequence(value) {
    return value.sequence === true && Array.isArray(value);
  }
  function isFunction(arg) {
    return ((arg && (arg._jsonata_function === true || arg._jsonata_lambda === true)) || typeof arg === 'function');
  }
  function getFunctionArity(func) {
    var arity = typeof func.arity === 'number' ? func.arity : typeof func.implementation === 'function' ? func.implementation.length : typeof func.length === 'number' ? func.length : func.arguments.length;
    return arity;
  }
  function isLambda(arg) {
    return arg && arg._jsonata_lambda === true;
  }
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  function isIterable(arg) {
    return ((typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && arg !== null && iteratorSymbol in arg && 'next' in arg && typeof arg.next === 'function');
  }
  return {
    isNumeric: isNumeric,
    isArrayOfStrings: isArrayOfStrings,
    isArrayOfNumbers: isArrayOfNumbers,
    createSequence: createSequence,
    isSequence: isSequence,
    isFunction: isFunction,
    isLambda: isLambda,
    isIterable: isIterable,
    getFunctionArity: getFunctionArity
  };
})();
module.exports = utils;
