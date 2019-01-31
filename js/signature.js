"use strict";
var utils = require('./utils');
var signature = (function() {
  'use strict';
  var arraySignatureMapping = {
    "a": "arrays",
    "b": "booleans",
    "f": "functions",
    "n": "numbers",
    "o": "objects",
    "s": "strings"
  };
  function parseSignature(signature) {
    var position = 1;
    var params = [];
    var param = {};
    var prevParam = param;
    while (position < signature.length) {
      var symbol = signature.charAt(position);
      if (symbol === ':') {
        break;
      }
      var next = function() {
        params.push(param);
        prevParam = param;
        param = {};
      };
      var findClosingBracket = function(str, start, openSymbol, closeSymbol) {
        var depth = 1;
        var position = start;
        while (position < str.length) {
          position++;
          symbol = str.charAt(position);
          if (symbol === closeSymbol) {
            depth--;
            if (depth === 0) {
              break;
            }
          } else if (symbol === openSymbol) {
            depth++;
          }
        }
        return position;
      };
      switch (symbol) {
        case 's':
        case 'n':
        case 'b':
        case 'l':
        case 'o':
          param.regex = '[' + symbol + 'm]';
          param.type = symbol;
          next();
          break;
        case 'a':
          param.regex = '[asnblfom]';
          param.type = symbol;
          param.array = true;
          next();
          break;
        case 'f':
          param.regex = 'f';
          param.type = symbol;
          next();
          break;
        case 'j':
          param.regex = '[asnblom]';
          param.type = symbol;
          next();
          break;
        case 'x':
          param.regex = '[asnblfom]';
          param.type = symbol;
          next();
          break;
        case '-':
          prevParam.context = true;
          prevParam.contextRegex = new RegExp(prevParam.regex);
          prevParam.regex += '?';
          break;
        case '?':
        case '+':
          prevParam.regex += symbol;
          break;
        case '(':
          var endParen = findClosingBracket(signature, position, '(', ')');
          var choice = signature.substring(position + 1, endParen);
          if (choice.indexOf('<') === -1) {
            param.regex = '[' + choice + 'm]';
          } else {
            throw {
              code: "S0402",
              stack: (new Error()).stack,
              value: choice,
              offset: position
            };
          }
          param.type = '(' + choice + ')';
          position = endParen;
          next();
          break;
        case '<':
          if (prevParam.type === 'a' || prevParam.type === 'f') {
            var endPos = findClosingBracket(signature, position, '<', '>');
            prevParam.subtype = signature.substring(position + 1, endPos);
            position = endPos;
          } else {
            throw {
              code: "S0401",
              stack: (new Error()).stack,
              value: prevParam.type,
              offset: position
            };
          }
          break;
      }
      position++;
    }
    var regexStr = '^' + params.map(function(param) {
      return '(' + param.regex + ')';
    }).join('') + '$';
    var regex = new RegExp(regexStr);
    var getSymbol = function(value) {
      var symbol;
      if (utils.isFunction(value)) {
        symbol = 'f';
      } else {
        var type = (typeof value === 'undefined' ? 'undefined' : $traceurRuntime.typeof(value));
        switch (type) {
          case 'string':
            symbol = 's';
            break;
          case 'number':
            symbol = 'n';
            break;
          case 'boolean':
            symbol = 'b';
            break;
          case 'object':
            if (value === null) {
              symbol = 'l';
            } else if (Array.isArray(value)) {
              symbol = 'a';
            } else {
              symbol = 'o';
            }
            break;
          case 'undefined':
          default:
            symbol = 'm';
        }
      }
      return symbol;
    };
    var throwValidationError = function(badArgs, badSig) {
      var partialPattern = '^';
      var goodTo = 0;
      for (var index = 0; index < params.length; index++) {
        partialPattern += params[index].regex;
        var match = badSig.match(partialPattern);
        if (match === null) {
          throw {
            code: "T0410",
            stack: (new Error()).stack,
            value: badArgs[goodTo],
            index: goodTo + 1
          };
        }
        goodTo = match[0].length;
      }
      throw {
        code: "T0410",
        stack: (new Error()).stack,
        value: badArgs[goodTo],
        index: goodTo + 1
      };
    };
    return {
      definition: signature,
      validate: function(args, context) {
        var suppliedSig = '';
        args.forEach(function(arg) {
          suppliedSig += getSymbol(arg);
        });
        var isValid = regex.exec(suppliedSig);
        if (isValid) {
          var validatedArgs = [];
          var argIndex = 0;
          params.forEach(function(param, index) {
            var arg = args[argIndex];
            var match = isValid[index + 1];
            if (match === '') {
              if (param.context && param.contextRegex) {
                var contextType = getSymbol(context);
                if (param.contextRegex.test(contextType)) {
                  validatedArgs.push(context);
                } else {
                  throw {
                    code: "T0411",
                    stack: (new Error()).stack,
                    value: context,
                    index: argIndex + 1
                  };
                }
              } else {
                validatedArgs.push(arg);
                argIndex++;
              }
            } else {
              match.split('').forEach(function(single) {
                if (param.type === 'a') {
                  if (single === 'm') {
                    arg = undefined;
                  } else {
                    arg = args[argIndex];
                    var arrayOK = true;
                    if (typeof param.subtype !== 'undefined') {
                      if (single !== 'a' && match !== param.subtype) {
                        arrayOK = false;
                      } else if (single === 'a') {
                        if (arg.length > 0) {
                          var itemType = getSymbol(arg[0]);
                          if (itemType !== param.subtype.charAt(0)) {
                            arrayOK = false;
                          } else {
                            var differentItems = arg.filter(function(val) {
                              return (getSymbol(val) !== itemType);
                            });
                            arrayOK = (differentItems.length === 0);
                          }
                        }
                      }
                    }
                    if (!arrayOK) {
                      throw {
                        code: "T0412",
                        stack: (new Error()).stack,
                        value: arg,
                        index: argIndex + 1,
                        type: arraySignatureMapping[param.subtype]
                      };
                    }
                    if (single !== 'a') {
                      arg = [arg];
                    }
                  }
                  validatedArgs.push(arg);
                  argIndex++;
                } else {
                  validatedArgs.push(arg);
                  argIndex++;
                }
              });
            }
          });
          return validatedArgs;
        }
        throwValidationError(args, suppliedSig);
      }
    };
  }
  return parseSignature;
})();
module.exports = signature;
