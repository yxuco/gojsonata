"use strict";
var utils = require('./utils');
var functions = (function() {
  'use strict';
  var $__1 = $traceurRuntime.initGeneratorFunction(evaluateMatcher),
      $__5 = $traceurRuntime.initGeneratorFunction(contains),
      $__8 = $traceurRuntime.initGeneratorFunction(match),
      $__16 = $traceurRuntime.initGeneratorFunction(replace),
      $__27 = $traceurRuntime.initGeneratorFunction(split),
      $__35 = $traceurRuntime.initGeneratorFunction(map),
      $__38 = $traceurRuntime.initGeneratorFunction(filter),
      $__41 = $traceurRuntime.initGeneratorFunction(foldLeft),
      $__49 = $traceurRuntime.initGeneratorFunction(each),
      $__56 = $traceurRuntime.initGeneratorFunction(sort),
      $__57 = $traceurRuntime.initGeneratorFunction(sift);
  var isNumeric = utils.isNumeric;
  var isArrayOfStrings = utils.isArrayOfStrings;
  var isArrayOfNumbers = utils.isArrayOfNumbers;
  var createSequence = utils.createSequence;
  var isFunction = utils.isFunction;
  var isLambda = utils.isLambda;
  var isIterable = utils.isIterable;
  var getFunctionArity = utils.getFunctionArity;
  function sum(args) {
    if (typeof args === 'undefined') {
      return undefined;
    }
    var total = 0;
    args.forEach(function(num) {
      total += num;
    });
    return total;
  }
  function count(args) {
    if (typeof args === 'undefined') {
      return 0;
    }
    return args.length;
  }
  function max(args) {
    if (typeof args === 'undefined' || args.length === 0) {
      return undefined;
    }
    return Math.max.apply(Math, args);
  }
  function min(args) {
    if (typeof args === 'undefined' || args.length === 0) {
      return undefined;
    }
    return Math.min.apply(Math, args);
  }
  function average(args) {
    if (typeof args === 'undefined' || args.length === 0) {
      return undefined;
    }
    var total = 0;
    args.forEach(function(num) {
      total += num;
    });
    return total / args.length;
  }
  function string(arg) {
    if (typeof arg === 'undefined') {
      return undefined;
    }
    var str;
    if (typeof arg === 'string') {
      str = arg;
    } else if (isFunction(arg)) {
      str = '';
    } else if (typeof arg === 'number' && !isFinite(arg)) {
      throw {
        code: "D3001",
        value: arg,
        stack: (new Error()).stack
      };
    } else
      str = JSON.stringify(arg, function(key, val) {
        return (typeof val !== 'undefined' && val !== null && val.toPrecision && isNumeric(val)) ? Number(val.toPrecision(15)) : (val && isFunction(val)) ? '' : val;
      });
    return str;
  }
  function substring(str, start, length) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    var strArray = Array.from(str);
    var strLength = strArray.length;
    if (strLength + start < 0) {
      start = 0;
    }
    if (typeof length !== 'undefined') {
      if (length <= 0) {
        return '';
      }
      var end = start >= 0 ? start + length : strLength + start + length;
      return strArray.slice(start, end).join('');
    }
    return strArray.slice(start).join('');
  }
  function substringBefore(str, chars) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    var pos = str.indexOf(chars);
    if (pos > -1) {
      return str.substr(0, pos);
    } else {
      return str;
    }
  }
  function substringAfter(str, chars) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    var pos = str.indexOf(chars);
    if (pos > -1) {
      return str.substr(pos + chars.length);
    } else {
      return str;
    }
  }
  function lowercase(str) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    return str.toLowerCase();
  }
  function uppercase(str) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    return str.toUpperCase();
  }
  function length(str) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    return Array.from(str).length;
  }
  function trim(str) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    var result = str.replace(/[ \t\n\r]+/gm, ' ');
    if (result.charAt(0) === ' ') {
      result = result.substring(1);
    }
    if (result.charAt(result.length - 1) === ' ') {
      result = result.substring(0, result.length - 1);
    }
    return result;
  }
  function pad(str, width, char) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    if (typeof char === 'undefined' || char.length === 0) {
      char = ' ';
    }
    var result;
    var padLength = Math.abs(width) - length(str);
    if (padLength > 0) {
      var padding = (new Array(padLength + 1)).join(char);
      if (char.length > 1) {
        padding = substring(padding, 0, padLength);
      }
      if (width > 0) {
        result = str + padding;
      } else {
        result = padding + str;
      }
    } else {
      result = str;
    }
    return result;
  }
  function evaluateMatcher(matcher, str) {
    var result,
        $__2,
        $__3,
        $__4;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            result = matcher.apply(this, [str]);
            $ctx.state = 21;
            break;
          case 21:
            $ctx.state = (isIterable(result)) ? 11 : 16;
            break;
          case 11:
            $__3 = $ctx.wrapYieldStar(result[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__4 = $__3[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__4.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__4.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__4.value;
          case 10:
            $__2 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__2;
            $ctx.state = 16;
            break;
          case 16:
            if (result && !(typeof result.start === 'number' || result.end === 'number' || Array.isArray(result.groups) || isFunction(result.next))) {
              throw {
                code: "T1010",
                stack: (new Error()).stack
              };
            }
            $ctx.state = 23;
            break;
          case 23:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__1, this);
  }
  function contains(str, token) {
    var result,
        matches,
        $__6,
        $__7;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof str === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            $ctx.state = (typeof token === 'string') ? 20 : 14;
            break;
          case 20:
            result = (str.indexOf(token) !== -1);
            $ctx.state = 21;
            break;
          case 14:
            $__6 = $ctx.wrapYieldStar(evaluateMatcher(token, str)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__7 = $__6[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__7.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__7.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__7.value;
          case 13:
            matches = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            result = (typeof matches !== 'undefined');
            $ctx.state = 21;
            break;
          case 21:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__5, this);
  }
  function match(str, regex, limit) {
    var result,
        count,
        matches,
        $__9,
        $__10,
        $__11,
        $__12,
        $__13,
        $__14,
        $__15;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof str === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            if (limit < 0) {
              throw {
                stack: (new Error()).stack,
                value: limit,
                code: 'D3040',
                index: 3
              };
            }
            result = createSequence();
            $ctx.state = 48;
            break;
          case 48:
            $ctx.state = (typeof limit === 'undefined' || limit > 0) ? 42 : 40;
            break;
          case 42:
            count = 0;
            $ctx.state = 43;
            break;
          case 43:
            $__9 = $ctx.wrapYieldStar(evaluateMatcher(regex, str)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__10 = $__9[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__10.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__10.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__10.value;
          case 13:
            matches = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            $ctx.state = (typeof matches !== 'undefined') ? 39 : 40;
            break;
          case 39:
            $ctx.state = (typeof matches !== 'undefined' && (typeof limit === 'undefined' || count < limit)) ? 36 : 40;
            break;
          case 36:
            result.push({
              match: matches.match,
              index: matches.start,
              groups: matches.groups
            });
            $ctx.state = 37;
            break;
          case 37:
            $__11 = matches.next;
            $__12 = evaluateMatcher($__11);
            $ctx.state = 33;
            break;
          case 33:
            $__14 = $ctx.wrapYieldStar($__12[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 29;
            break;
          case 29:
            $__15 = $__14[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = ($__15.done) ? 20 : 19;
            break;
          case 20:
            $ctx.sent = $__15.value;
            $ctx.state = 27;
            break;
          case 19:
            $ctx.state = 29;
            return $__15.value;
          case 27:
            $__13 = $ctx.sentIgnoreThrow;
            $ctx.state = 31;
            break;
          case 31:
            matches = $__13;
            $ctx.state = 35;
            break;
          case 35:
            count++;
            $ctx.state = 39;
            break;
          case 40:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__8, this);
  }
  function replace(str, pattern, replacement, limit) {
    var self,
        replacer,
        result,
        position,
        count,
        index,
        matches,
        replacedWith,
        $__17,
        $__18,
        $__19,
        $__20,
        $__21,
        $__22,
        $__23,
        $__24,
        $__25,
        $__26;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof str === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            self = this;
            if (pattern === '') {
              throw {
                code: "D3010",
                stack: (new Error()).stack,
                value: pattern,
                index: 2
              };
            }
            if (limit < 0) {
              throw {
                code: "D3011",
                stack: (new Error()).stack,
                value: limit,
                index: 4
              };
            }
            if (typeof replacement === 'string') {
              replacer = function(regexMatch) {
                var substitute = '';
                var position = 0;
                var index = replacement.indexOf('$', position);
                while (index !== -1 && position < replacement.length) {
                  substitute += replacement.substring(position, index);
                  position = index + 1;
                  var dollarVal = replacement.charAt(position);
                  if (dollarVal === '$') {
                    substitute += '$';
                    position++;
                  } else if (dollarVal === '0') {
                    substitute += regexMatch.match;
                    position++;
                  } else {
                    var maxDigits = void 0;
                    if (regexMatch.groups.length === 0) {
                      maxDigits = 1;
                    } else {
                      maxDigits = Math.floor(Math.log(regexMatch.groups.length) * Math.LOG10E) + 1;
                    }
                    index = parseInt(replacement.substring(position, position + maxDigits), 10);
                    if (maxDigits > 1 && index > regexMatch.groups.length) {
                      index = parseInt(replacement.substring(position, position + maxDigits - 1), 10);
                    }
                    if (!isNaN(index)) {
                      if (regexMatch.groups.length > 0) {
                        var submatch = regexMatch.groups[index - 1];
                        if (typeof submatch !== 'undefined') {
                          substitute += submatch;
                        }
                      }
                      position += index.toString().length;
                    } else {
                      substitute += '$';
                    }
                  }
                  index = replacement.indexOf('$', position);
                }
                substitute += replacement.substring(position);
                return substitute;
              };
            } else {
              replacer = replacement;
            }
            result = '';
            position = 0;
            $ctx.state = 74;
            break;
          case 74:
            $ctx.state = (typeof limit === 'undefined' || limit > 0) ? 66 : 68;
            break;
          case 66:
            count = 0;
            $ctx.state = 67;
            break;
          case 67:
            $ctx.state = (typeof pattern === 'string') ? 63 : 14;
            break;
          case 63:
            index = str.indexOf(pattern, position);
            while (index !== -1 && (typeof limit === 'undefined' || count < limit)) {
              result += str.substring(position, index);
              result += replacement;
              position = index + pattern.length;
              count++;
              index = str.indexOf(pattern, position);
            }
            result += str.substring(position);
            $ctx.state = 64;
            break;
          case 14:
            $__17 = $ctx.wrapYieldStar(evaluateMatcher(pattern, str)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__18 = $__17[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__18.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__18.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__18.value;
          case 13:
            matches = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            $ctx.state = (typeof matches !== 'undefined') ? 52 : 60;
            break;
          case 52:
            $ctx.state = (typeof matches !== 'undefined' && (typeof limit === 'undefined' || count < limit)) ? 53 : 57;
            break;
          case 53:
            result += str.substring(position, matches.start);
            replacedWith = replacer.apply(self, [matches]);
            $ctx.state = 54;
            break;
          case 54:
            $ctx.state = (isIterable(replacedWith)) ? 28 : 33;
            break;
          case 28:
            $__20 = $ctx.wrapYieldStar(replacedWith[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 29;
            break;
          case 29:
            $__21 = $__20[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = ($__21.done) ? 20 : 19;
            break;
          case 20:
            $ctx.sent = $__21.value;
            $ctx.state = 27;
            break;
          case 19:
            $ctx.state = 29;
            return $__21.value;
          case 27:
            $__19 = $ctx.sentIgnoreThrow;
            $ctx.state = 31;
            break;
          case 31:
            replacedWith = $__19;
            $ctx.state = 33;
            break;
          case 33:
            if (typeof replacedWith === 'string') {
              result += replacedWith;
            } else {
              throw {
                code: "D3012",
                stack: (new Error()).stack,
                value: replacedWith
              };
            }
            position = matches.start + matches.match.length;
            count++;
            $ctx.state = 56;
            break;
          case 56:
            $__22 = matches.next;
            $__23 = evaluateMatcher($__22);
            $ctx.state = 50;
            break;
          case 50:
            $__25 = $ctx.wrapYieldStar($__23[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 46;
            break;
          case 46:
            $__26 = $__25[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 43;
            break;
          case 43:
            $ctx.state = ($__26.done) ? 37 : 36;
            break;
          case 37:
            $ctx.sent = $__26.value;
            $ctx.state = 44;
            break;
          case 36:
            $ctx.state = 46;
            return $__26.value;
          case 44:
            $__24 = $ctx.sentIgnoreThrow;
            $ctx.state = 48;
            break;
          case 48:
            matches = $__24;
            $ctx.state = 52;
            break;
          case 57:
            result += str.substring(position);
            $ctx.state = 64;
            break;
          case 60:
            result = str;
            $ctx.state = 64;
            break;
          case 68:
            result = str;
            $ctx.state = 64;
            break;
          case 64:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__16, this);
  }
  function base64encode(str) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    var btoa = typeof window !== 'undefined' ? window.btoa : function(str) {
      return new global.Buffer(str, 'binary').toString('base64');
    };
    return btoa(str);
  }
  function base64decode(str) {
    if (typeof str === 'undefined') {
      return undefined;
    }
    var atob = typeof window !== 'undefined' ? window.atob : function(str) {
      return new global.Buffer(str, 'base64').toString('binary');
    };
    return atob(str);
  }
  function split(str, separator, limit) {
    var result,
        count,
        matches,
        start,
        $__28,
        $__29,
        $__30,
        $__31,
        $__32,
        $__33,
        $__34;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof str === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            if (limit < 0) {
              throw {
                code: "D3020",
                stack: (new Error()).stack,
                value: limit,
                index: 3
              };
            }
            result = [];
            $ctx.state = 57;
            break;
          case 57:
            $ctx.state = (typeof limit === 'undefined' || limit > 0) ? 52 : 51;
            break;
          case 52:
            $ctx.state = (typeof separator === 'string') ? 50 : 48;
            break;
          case 50:
            result = str.split(separator, limit);
            $ctx.state = 51;
            break;
          case 48:
            count = 0;
            $ctx.state = 49;
            break;
          case 49:
            $__28 = $ctx.wrapYieldStar(evaluateMatcher(separator, str)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__29 = $__28[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__29.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__29.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__29.value;
          case 13:
            matches = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            $ctx.state = (typeof matches !== 'undefined') ? 41 : 45;
            break;
          case 41:
            start = 0;
            $ctx.state = 42;
            break;
          case 42:
            $ctx.state = (typeof matches !== 'undefined' && (typeof limit === 'undefined' || count < limit)) ? 36 : 40;
            break;
          case 36:
            result.push(str.substring(start, matches.start));
            start = matches.end;
            $ctx.state = 37;
            break;
          case 37:
            $__30 = matches.next;
            $__31 = evaluateMatcher($__30);
            $ctx.state = 33;
            break;
          case 33:
            $__33 = $ctx.wrapYieldStar($__31[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 29;
            break;
          case 29:
            $__34 = $__33[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = ($__34.done) ? 20 : 19;
            break;
          case 20:
            $ctx.sent = $__34.value;
            $ctx.state = 27;
            break;
          case 19:
            $ctx.state = 29;
            return $__34.value;
          case 27:
            $__32 = $ctx.sentIgnoreThrow;
            $ctx.state = 31;
            break;
          case 31:
            matches = $__32;
            $ctx.state = 35;
            break;
          case 35:
            count++;
            $ctx.state = 42;
            break;
          case 40:
            if (typeof limit === 'undefined' || count < limit) {
              result.push(str.substring(start));
            }
            $ctx.state = 51;
            break;
          case 45:
            result.push(str);
            $ctx.state = 51;
            break;
          case 51:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__27, this);
  }
  function join(strs, separator) {
    if (typeof strs === 'undefined') {
      return undefined;
    }
    if (typeof separator === 'undefined') {
      separator = "";
    }
    return strs.join(separator);
  }
  function formatNumber(value, picture, options) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    var defaults = {
      "decimal-separator": ".",
      "grouping-separator": ",",
      "exponent-separator": "e",
      "infinity": "Infinity",
      "minus-sign": "-",
      "NaN": "NaN",
      "percent": "%",
      "per-mille": "\u2030",
      "zero-digit": "0",
      "digit": "#",
      "pattern-separator": ";"
    };
    var properties = defaults;
    if (typeof options !== 'undefined') {
      Object.keys(options).forEach(function(key) {
        properties[key] = options[key];
      });
    }
    var decimalDigitFamily = [];
    var zeroCharCode = properties['zero-digit'].charCodeAt(0);
    for (var ii = zeroCharCode; ii < zeroCharCode + 10; ii++) {
      decimalDigitFamily.push(String.fromCharCode(ii));
    }
    var activeChars = decimalDigitFamily.concat([properties['decimal-separator'], properties['exponent-separator'], properties['grouping-separator'], properties.digit, properties['pattern-separator']]);
    var subPictures = picture.split(properties['pattern-separator']);
    if (subPictures.length > 2) {
      throw {
        code: 'D3080',
        stack: (new Error()).stack
      };
    }
    var splitParts = function(subpicture) {
      var prefix = (function() {
        var ch;
        for (var ii = 0; ii < subpicture.length; ii++) {
          ch = subpicture.charAt(ii);
          if (activeChars.indexOf(ch) !== -1 && ch !== properties['exponent-separator']) {
            return subpicture.substring(0, ii);
          }
        }
      })();
      var suffix = (function() {
        var ch;
        for (var ii = subpicture.length - 1; ii >= 0; ii--) {
          ch = subpicture.charAt(ii);
          if (activeChars.indexOf(ch) !== -1 && ch !== properties['exponent-separator']) {
            return subpicture.substring(ii + 1);
          }
        }
      })();
      var activePart = subpicture.substring(prefix.length, subpicture.length - suffix.length);
      var mantissaPart,
          exponentPart,
          integerPart,
          fractionalPart;
      var exponentPosition = subpicture.indexOf(properties['exponent-separator'], prefix.length);
      if (exponentPosition === -1 || exponentPosition > subpicture.length - suffix.length) {
        mantissaPart = activePart;
        exponentPart = undefined;
      } else {
        mantissaPart = activePart.substring(0, exponentPosition);
        exponentPart = activePart.substring(exponentPosition + 1);
      }
      var decimalPosition = mantissaPart.indexOf(properties['decimal-separator']);
      if (decimalPosition === -1) {
        integerPart = mantissaPart;
        fractionalPart = suffix;
      } else {
        integerPart = mantissaPart.substring(0, decimalPosition);
        fractionalPart = mantissaPart.substring(decimalPosition + 1);
      }
      return {
        prefix: prefix,
        suffix: suffix,
        activePart: activePart,
        mantissaPart: mantissaPart,
        exponentPart: exponentPart,
        integerPart: integerPart,
        fractionalPart: fractionalPart,
        subpicture: subpicture
      };
    };
    var validate = function(parts) {
      var error;
      var ii;
      var subpicture = parts.subpicture;
      var decimalPos = subpicture.indexOf(properties['decimal-separator']);
      if (decimalPos !== subpicture.lastIndexOf(properties['decimal-separator'])) {
        error = 'D3081';
      }
      if (subpicture.indexOf(properties.percent) !== subpicture.lastIndexOf(properties.percent)) {
        error = 'D3082';
      }
      if (subpicture.indexOf(properties['per-mille']) !== subpicture.lastIndexOf(properties['per-mille'])) {
        error = 'D3083';
      }
      if (subpicture.indexOf(properties.percent) !== -1 && subpicture.indexOf(properties['per-mille']) !== -1) {
        error = 'D3084';
      }
      var valid = false;
      for (ii = 0; ii < parts.mantissaPart.length; ii++) {
        var ch = parts.mantissaPart.charAt(ii);
        if (decimalDigitFamily.indexOf(ch) !== -1 || ch === properties.digit) {
          valid = true;
          break;
        }
      }
      if (!valid) {
        error = 'D3085';
      }
      var charTypes = parts.activePart.split('').map(function(char) {
        return activeChars.indexOf(char) === -1 ? 'p' : 'a';
      }).join('');
      if (charTypes.indexOf('p') !== -1) {
        error = 'D3086';
      }
      if (decimalPos !== -1) {
        if (subpicture.charAt(decimalPos - 1) === properties['grouping-separator'] || subpicture.charAt(decimalPos + 1) === properties['grouping-separator']) {
          error = 'D3087';
        }
      } else if (parts.integerPart.charAt(parts.integerPart.length - 1) === properties['grouping-separator']) {
        error = 'D3088';
      }
      if (subpicture.indexOf(properties['grouping-separator'] + properties['grouping-separator']) !== -1) {
        error = 'D3089';
      }
      var optionalDigitPos = parts.integerPart.indexOf(properties.digit);
      if (optionalDigitPos !== -1 && parts.integerPart.substring(0, optionalDigitPos).split('').filter(function(char) {
        return decimalDigitFamily.indexOf(char) > -1;
      }).length > 0) {
        error = 'D3090';
      }
      optionalDigitPos = parts.fractionalPart.lastIndexOf(properties.digit);
      if (optionalDigitPos !== -1 && parts.fractionalPart.substring(optionalDigitPos).split('').filter(function(char) {
        return decimalDigitFamily.indexOf(char) > -1;
      }).length > 0) {
        error = 'D3091';
      }
      var exponentExists = (typeof parts.exponentPart === 'string');
      if (exponentExists && parts.exponentPart.length > 0 && (subpicture.indexOf(properties.percent) !== -1 || subpicture.indexOf(properties['per-mille']) !== -1)) {
        error = 'D3092';
      }
      if (exponentExists && (parts.exponentPart.length === 0 || parts.exponentPart.split('').filter(function(char) {
        return decimalDigitFamily.indexOf(char) === -1;
      }).length > 0)) {
        error = 'D3093';
      }
      if (error) {
        throw {
          code: error,
          stack: (new Error()).stack
        };
      }
    };
    var analyse = function(parts) {
      var getGroupingPositions = function(part, toLeft) {
        var positions = [];
        var groupingPosition = part.indexOf(properties['grouping-separator']);
        while (groupingPosition !== -1) {
          var charsToTheRight = (toLeft ? part.substring(0, groupingPosition) : part.substring(groupingPosition)).split('').filter(function(char) {
            return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
          }).length;
          positions.push(charsToTheRight);
          groupingPosition = parts.integerPart.indexOf(properties['grouping-separator'], groupingPosition + 1);
        }
        return positions;
      };
      var integerPartGroupingPositions = getGroupingPositions(parts.integerPart);
      var regular = function(indexes) {
        if (indexes.length === 0) {
          return 0;
        }
        var gcd = function(a, b) {
          return b === 0 ? a : gcd(b, a % b);
        };
        var factor = indexes.reduce(gcd);
        for (var index = 1; index <= indexes.length; index++) {
          if (indexes.indexOf(index * factor) === -1) {
            return 0;
          }
        }
        return factor;
      };
      var regularGrouping = regular(integerPartGroupingPositions);
      var fractionalPartGroupingPositions = getGroupingPositions(parts.fractionalPart, true);
      var minimumIntegerPartSize = parts.integerPart.split('').filter(function(char) {
        return decimalDigitFamily.indexOf(char) !== -1;
      }).length;
      var scalingFactor = minimumIntegerPartSize;
      var fractionalPartArray = parts.fractionalPart.split('');
      var minimumFactionalPartSize = fractionalPartArray.filter(function(char) {
        return decimalDigitFamily.indexOf(char) !== -1;
      }).length;
      var maximumFactionalPartSize = fractionalPartArray.filter(function(char) {
        return decimalDigitFamily.indexOf(char) !== -1 || char === properties.digit;
      }).length;
      var exponentPresent = typeof parts.exponentPart === 'string';
      if (minimumIntegerPartSize === 0 && maximumFactionalPartSize === 0) {
        if (exponentPresent) {
          minimumFactionalPartSize = 1;
          maximumFactionalPartSize = 1;
        } else {
          minimumIntegerPartSize = 1;
        }
      }
      if (exponentPresent && minimumIntegerPartSize === 0 && parts.integerPart.indexOf(properties.digit) !== -1) {
        minimumIntegerPartSize = 1;
      }
      if (minimumIntegerPartSize === 0 && minimumFactionalPartSize === 0) {
        minimumFactionalPartSize = 1;
      }
      var minimumExponentSize = 0;
      if (exponentPresent) {
        minimumExponentSize = parts.exponentPart.split('').filter(function(char) {
          return decimalDigitFamily.indexOf(char) !== -1;
        }).length;
      }
      return {
        integerPartGroupingPositions: integerPartGroupingPositions,
        regularGrouping: regularGrouping,
        minimumIntegerPartSize: minimumIntegerPartSize,
        scalingFactor: scalingFactor,
        prefix: parts.prefix,
        fractionalPartGroupingPositions: fractionalPartGroupingPositions,
        minimumFactionalPartSize: minimumFactionalPartSize,
        maximumFactionalPartSize: maximumFactionalPartSize,
        minimumExponentSize: minimumExponentSize,
        suffix: parts.suffix,
        picture: parts.subpicture
      };
    };
    var parts = subPictures.map(splitParts);
    parts.forEach(validate);
    var variables = parts.map(analyse);
    var minus_sign = properties['minus-sign'];
    var zero_digit = properties['zero-digit'];
    var decimal_separator = properties['decimal-separator'];
    var grouping_separator = properties['grouping-separator'];
    if (variables.length === 1) {
      variables.push(JSON.parse(JSON.stringify(variables[0])));
      variables[1].prefix = minus_sign + variables[1].prefix;
    }
    var pic;
    if (value >= 0) {
      pic = variables[0];
    } else {
      pic = variables[1];
    }
    var adjustedNumber;
    if (pic.picture.indexOf(properties.percent) !== -1) {
      adjustedNumber = value * 100;
    } else if (pic.picture.indexOf(properties['per-mille']) !== -1) {
      adjustedNumber = value * 1000;
    } else {
      adjustedNumber = value;
    }
    var mantissa,
        exponent;
    if (pic.minimumExponentSize === 0) {
      mantissa = adjustedNumber;
    } else {
      var maxMantissa = Math.pow(10, pic.scalingFactor);
      var minMantissa = Math.pow(10, pic.scalingFactor - 1);
      mantissa = adjustedNumber;
      exponent = 0;
      while (mantissa < minMantissa) {
        mantissa *= 10;
        exponent -= 1;
      }
      while (mantissa > maxMantissa) {
        mantissa /= 10;
        exponent += 1;
      }
    }
    var roundedNumber = round(mantissa, pic.maximumFactionalPartSize);
    var makeString = function(value, dp) {
      var str = Math.abs(value).toFixed(dp);
      if (zero_digit !== '0') {
        str = str.split('').map(function(digit) {
          if (digit >= '0' && digit <= '9') {
            return decimalDigitFamily[digit.charCodeAt(0) - 48];
          } else {
            return digit;
          }
        }).join('');
      }
      return str;
    };
    var stringValue = makeString(roundedNumber, pic.maximumFactionalPartSize);
    var decimalPos = stringValue.indexOf('.');
    if (decimalPos === -1) {
      stringValue = stringValue + decimal_separator;
    } else {
      stringValue = stringValue.replace('.', decimal_separator);
    }
    while (stringValue.charAt(0) === zero_digit) {
      stringValue = stringValue.substring(1);
    }
    while (stringValue.charAt(stringValue.length - 1) === zero_digit) {
      stringValue = stringValue.substring(0, stringValue.length - 1);
    }
    decimalPos = stringValue.indexOf(decimal_separator);
    var padLeft = pic.minimumIntegerPartSize - decimalPos;
    var padRight = pic.minimumFactionalPartSize - (stringValue.length - decimalPos - 1);
    stringValue = (padLeft > 0 ? new Array(padLeft + 1).join(zero_digit) : '') + stringValue;
    stringValue = stringValue + (padRight > 0 ? new Array(padRight + 1).join(zero_digit) : '');
    decimalPos = stringValue.indexOf(decimal_separator);
    if (pic.regularGrouping > 0) {
      var groupCount = Math.floor((decimalPos - 1) / pic.regularGrouping);
      for (var group = 1; group <= groupCount; group++) {
        stringValue = [stringValue.slice(0, decimalPos - group * pic.regularGrouping), grouping_separator, stringValue.slice(decimalPos - group * pic.regularGrouping)].join('');
      }
    } else {
      pic.integerPartGroupingPositions.forEach(function(pos) {
        stringValue = [stringValue.slice(0, decimalPos - pos), grouping_separator, stringValue.slice(decimalPos - pos)].join('');
        decimalPos++;
      });
    }
    decimalPos = stringValue.indexOf(decimal_separator);
    pic.fractionalPartGroupingPositions.forEach(function(pos) {
      stringValue = [stringValue.slice(0, pos + decimalPos + 1), grouping_separator, stringValue.slice(pos + decimalPos + 1)].join('');
    });
    decimalPos = stringValue.indexOf(decimal_separator);
    if (pic.picture.indexOf(decimal_separator) === -1 || decimalPos === stringValue.length - 1) {
      stringValue = stringValue.substring(0, stringValue.length - 1);
    }
    if (typeof exponent !== 'undefined') {
      var stringExponent = makeString(exponent, 0);
      padLeft = pic.minimumExponentSize - stringExponent.length;
      if (padLeft > 0) {
        stringExponent = new Array(padLeft + 1).join(zero_digit) + stringExponent;
      }
      stringValue = stringValue + properties['exponent-separator'] + (exponent < 0 ? minus_sign : '') + stringExponent;
    }
    stringValue = pic.prefix + stringValue + pic.suffix;
    return stringValue;
  }
  function formatBase(value, radix) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    value = round(value);
    if (typeof radix === 'undefined') {
      radix = 10;
    } else {
      radix = round(radix);
    }
    if (radix < 2 || radix > 36) {
      throw {
        code: 'D3100',
        stack: (new Error()).stack,
        value: radix
      };
    }
    var result = value.toString(radix);
    return result;
  }
  function number(arg) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    if (typeof arg === 'number') {
      result = arg;
    } else if (typeof arg === 'string' && /^-?(0|([1-9][0-9]*))(\.[0-9]+)?([Ee][-+]?[0-9]+)?$/.test(arg) && !isNaN(parseFloat(arg)) && isFinite(arg)) {
      result = parseFloat(arg);
    } else if (arg === true) {
      result = 1;
    } else if (arg === false) {
      result = 0;
    } else {
      throw {
        code: "D3030",
        value: arg,
        stack: (new Error()).stack,
        index: 1
      };
    }
    return result;
  }
  function abs(arg) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    result = Math.abs(arg);
    return result;
  }
  function floor(arg) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    result = Math.floor(arg);
    return result;
  }
  function ceil(arg) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    result = Math.ceil(arg);
    return result;
  }
  function round(arg, precision) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    if (precision) {
      var value = arg.toString().split('e');
      arg = +(value[0] + 'e' + (value[1] ? (+value[1] + precision) : precision));
    }
    result = Math.round(arg);
    var diff = result - arg;
    if (Math.abs(diff) === 0.5 && Math.abs(result % 2) === 1) {
      result = result - 1;
    }
    if (precision) {
      value = result.toString().split('e');
      result = +(value[0] + 'e' + (value[1] ? (+value[1] - precision) : -precision));
    }
    if (Object.is(result, -0)) {
      result = 0;
    }
    return result;
  }
  function sqrt(arg) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    if (arg < 0) {
      throw {
        stack: (new Error()).stack,
        code: "D3060",
        index: 1,
        value: arg
      };
    }
    result = Math.sqrt(arg);
    return result;
  }
  function power(arg, exp) {
    var result;
    if (typeof arg === 'undefined') {
      return undefined;
    }
    result = Math.pow(arg, exp);
    if (!isFinite(result)) {
      throw {
        stack: (new Error()).stack,
        code: "D3061",
        index: 1,
        value: arg,
        exp: exp
      };
    }
    return result;
  }
  function random() {
    return Math.random();
  }
  function boolean(arg) {
    if (typeof arg === 'undefined') {
      return undefined;
    }
    var result = false;
    if (Array.isArray(arg)) {
      if (arg.length === 1) {
        result = boolean(arg[0]);
      } else if (arg.length > 1) {
        var trues = arg.filter(function(val) {
          return boolean(val);
        });
        result = trues.length > 0;
      }
    } else if (typeof arg === 'string') {
      if (arg.length > 0) {
        result = true;
      }
    } else if (isNumeric(arg)) {
      if (arg !== 0) {
        result = true;
      }
    } else if (arg !== null && (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object') {
      if (Object.keys(arg).length > 0) {
        result = true;
      }
    } else if (typeof arg === 'boolean' && arg === true) {
      result = true;
    }
    return result;
  }
  function not(arg) {
    return !boolean(arg);
  }
  function hofFuncArgs(func, arg1, arg2, arg3) {
    var func_args = [arg1];
    var length = getFunctionArity(func);
    if (length >= 2) {
      func_args.push(arg2);
    }
    if (length >= 3) {
      func_args.push(arg3);
    }
    return func_args;
  }
  function map(arr, func) {
    var result,
        i,
        func_args,
        res,
        $__36,
        $__37;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof arr === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            result = createSequence();
            $ctx.state = 28;
            break;
          case 28:
            i = 0;
            $ctx.state = 24;
            break;
          case 24:
            $ctx.state = (i < arr.length) ? 18 : 22;
            break;
          case 21:
            i++;
            $ctx.state = 24;
            break;
          case 18:
            func_args = hofFuncArgs(func, arr[i], i, arr);
            $ctx.state = 19;
            break;
          case 19:
            $__36 = $ctx.wrapYieldStar(func.apply(this, func_args)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__37 = $__36[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__37.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__37.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__37.value;
          case 13:
            res = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            if (typeof res !== 'undefined') {
              result.push(res);
            }
            $ctx.state = 21;
            break;
          case 22:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__35, this);
  }
  function filter(arr, func) {
    var result,
        i,
        entry,
        func_args,
        res,
        $__39,
        $__40;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof arr === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            result = createSequence();
            $ctx.state = 28;
            break;
          case 28:
            i = 0;
            $ctx.state = 24;
            break;
          case 24:
            $ctx.state = (i < arr.length) ? 18 : 22;
            break;
          case 21:
            i++;
            $ctx.state = 24;
            break;
          case 18:
            entry = arr[i];
            func_args = hofFuncArgs(func, entry, i, arr);
            $ctx.state = 19;
            break;
          case 19:
            $__39 = $ctx.wrapYieldStar(func.apply(this, func_args)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__40 = $__39[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__40.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__40.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__40.value;
          case 13:
            res = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            if (boolean(res)) {
              result.push(entry);
            }
            $ctx.state = 21;
            break;
          case 22:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__38, this);
  }
  function zip() {
    var result = [];
    var args = Array.prototype.slice.call(arguments);
    var length = Math.min.apply(Math, args.map(function(arg) {
      if (Array.isArray(arg)) {
        return arg.length;
      }
      return 0;
    }));
    for (var i = 0; i < length; i++) {
      var tuple = args.map(function(arg) {
        return arg[i];
      });
      result.push(tuple);
    }
    return result;
  }
  function foldLeft(sequence, func, init) {
    var result,
        index,
        $__42,
        $__43,
        $__44,
        $__45,
        $__46,
        $__47,
        $__48;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof sequence === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            if (getFunctionArity(func) !== 2) {
              throw {
                stack: (new Error()).stack,
                code: "D3050",
                index: 1
              };
            }
            if (typeof init === 'undefined' && sequence.length > 0) {
              result = sequence[0];
              index = 1;
            } else {
              result = init;
              index = 0;
            }
            $ctx.state = 28;
            break;
          case 28:
            $ctx.state = (index < sequence.length) ? 18 : 24;
            break;
          case 18:
            $__42 = func.apply;
            $__43 = sequence[index];
            $__44 = [result, $__43];
            $__45 = $__42.call(func, this, $__44);
            $ctx.state = 19;
            break;
          case 19:
            $__47 = $ctx.wrapYieldStar($__45[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__48 = $__47[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__48.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__48.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__48.value;
          case 13:
            $__46 = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            result = $__46;
            $ctx.state = 21;
            break;
          case 21:
            index++;
            $ctx.state = 28;
            break;
          case 24:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__41, this);
  }
  function keys(arg) {
    var result = createSequence();
    if (Array.isArray(arg)) {
      var merge = {};
      arg.forEach(function(item) {
        var allkeys = keys(item);
        allkeys.forEach(function(key) {
          merge[key] = true;
        });
      });
      result = keys(merge);
    } else if (arg !== null && (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && !(isLambda(arg))) {
      Object.keys(arg).forEach(function(key) {
        return result.push(key);
      });
    }
    return result;
  }
  function lookup(input, key) {
    var result;
    if (Array.isArray(input)) {
      result = createSequence();
      for (var ii = 0; ii < input.length; ii++) {
        var res = lookup(input[ii], key);
        if (typeof res !== 'undefined') {
          result.push(res);
        }
      }
    } else if (input !== null && (typeof input === 'undefined' ? 'undefined' : $traceurRuntime.typeof(input)) === 'object') {
      result = input[key];
    }
    return result;
  }
  function append(arg1, arg2) {
    if (typeof arg1 === 'undefined') {
      return arg2;
    }
    if (typeof arg2 === 'undefined') {
      return arg1;
    }
    if (!Array.isArray(arg1)) {
      arg1 = createSequence(arg1);
    }
    if (!Array.isArray(arg2)) {
      arg2 = [arg2];
    }
    return arg1.concat(arg2);
  }
  function exists(arg) {
    if (typeof arg === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
  function spread(arg) {
    var result = createSequence();
    if (Array.isArray(arg)) {
      arg.forEach(function(item) {
        result = append(result, spread(item));
      });
    } else if (arg !== null && (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === 'object' && !isLambda(arg)) {
      for (var key in arg) {
        var obj = {};
        obj[key] = arg[key];
        result.push(obj);
      }
    } else {
      result = arg;
    }
    return result;
  }
  function merge(arg) {
    if (typeof arg === 'undefined') {
      return undefined;
    }
    var result = {};
    arg.forEach(function(obj) {
      for (var prop in obj) {
        result[prop] = obj[prop];
      }
    });
    return result;
  }
  function reverse(arr) {
    if (typeof arr === 'undefined') {
      return undefined;
    }
    if (arr.length <= 1) {
      return arr;
    }
    var length = arr.length;
    var result = new Array(length);
    for (var i = 0; i < length; i++) {
      result[length - i - 1] = arr[i];
    }
    return result;
  }
  function each(obj, func) {
    var result,
        $__50,
        $__51,
        $__52,
        $__53,
        key,
        func_args,
        val,
        $__54,
        $__55;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            result = createSequence();
            $ctx.state = 32;
            break;
          case 32:
            $__50 = [];
            $__51 = obj;
            for ($__52 in $__51)
              $__50.push($__52);
            $ctx.state = 28;
            break;
          case 28:
            $__53 = 0;
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = ($__53 < $__50.length) ? 18 : 24;
            break;
          case 23:
            $__53++;
            $ctx.state = 26;
            break;
          case 18:
            key = $__50[$__53];
            $ctx.state = 19;
            break;
          case 19:
            $ctx.state = (!(key in $__51)) ? 23 : 16;
            break;
          case 16:
            func_args = hofFuncArgs(func, obj[key], key, obj);
            $ctx.state = 21;
            break;
          case 21:
            $__54 = $ctx.wrapYieldStar(func.apply(this, func_args)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__55 = $__54[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__55.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__55.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__55.value;
          case 10:
            val = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            if (typeof val !== 'undefined') {
              result.push(val);
            }
            $ctx.state = 23;
            break;
          case 24:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__49, this);
  }
  function sort(arr, comparator) {
    var comp,
        merge,
        msort,
        result,
        $__84,
        $__85;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof arr === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            $ctx.state = (arr.length <= 1) ? 4 : 5;
            break;
          case 4:
            $ctx.returnValue = arr;
            $ctx.state = -2;
            break;
          case 5:
            if (typeof comparator === 'undefined') {
              if (!isArrayOfNumbers(arr) && !isArrayOfStrings(arr)) {
                throw {
                  stack: (new Error()).stack,
                  code: "D3070",
                  index: 1
                };
              }
              comp = $traceurRuntime.initGeneratorFunction(function $__57(a, b) {
                return $traceurRuntime.createGeneratorInstance(function($ctx) {
                  while (true)
                    switch ($ctx.state) {
                      case 0:
                        $ctx.returnValue = a > b;
                        $ctx.state = -2;
                        break;
                      default:
                        return $ctx.end();
                    }
                }, $__57, this);
              });
            } else {
              comp = comparator;
            }
            merge = $traceurRuntime.initGeneratorFunction(function $__58(l, r) {
              var merge_iter,
                  merged,
                  $__70,
                  $__71;
              return $traceurRuntime.createGeneratorInstance(function($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      merge_iter = $traceurRuntime.initGeneratorFunction(function $__59(result, left, right) {
                        var $__60,
                            $__61,
                            $__62,
                            $__63,
                            $__64,
                            $__65,
                            $__66,
                            $__67,
                            $__68,
                            $__69;
                        return $traceurRuntime.createGeneratorInstance(function($ctx) {
                          while (true)
                            switch ($ctx.state) {
                              case 0:
                                $ctx.state = (left.length === 0) ? 49 : 48;
                                break;
                              case 49:
                                Array.prototype.push.apply(result, right);
                                $ctx.state = -2;
                                break;
                              case 48:
                                $ctx.state = (right.length === 0) ? 46 : 15;
                                break;
                              case 46:
                                Array.prototype.push.apply(result, left);
                                $ctx.state = -2;
                                break;
                              case 15:
                                $__60 = left[0];
                                $__61 = right[0];
                                $__62 = comp($__60, $__61);
                                $ctx.state = 16;
                                break;
                              case 16:
                                $__64 = $ctx.wrapYieldStar($__62[Symbol.iterator]());
                                $ctx.sent = void 0;
                                $ctx.action = 'next';
                                $ctx.state = 12;
                                break;
                              case 12:
                                $__65 = $__64[$ctx.action]($ctx.sentIgnoreThrow);
                                $ctx.state = 9;
                                break;
                              case 9:
                                $ctx.state = ($__65.done) ? 3 : 2;
                                break;
                              case 3:
                                $ctx.sent = $__65.value;
                                $ctx.state = 10;
                                break;
                              case 2:
                                $ctx.state = 12;
                                return $__65.value;
                              case 10:
                                $__63 = $ctx.sentIgnoreThrow;
                                $ctx.state = 14;
                                break;
                              case 14:
                                $ctx.state = ($__63) ? 29 : 43;
                                break;
                              case 29:
                                result.push(right[0]);
                                $ctx.state = 30;
                                break;
                              case 30:
                                $__66 = $ctx.wrapYieldStar(merge_iter(result, left, right.slice(1))[Symbol.iterator]());
                                $ctx.sent = void 0;
                                $ctx.action = 'next';
                                $ctx.state = 28;
                                break;
                              case 28:
                                $__67 = $__66[$ctx.action]($ctx.sentIgnoreThrow);
                                $ctx.state = 25;
                                break;
                              case 25:
                                $ctx.state = ($__67.done) ? 19 : 18;
                                break;
                              case 19:
                                $ctx.sent = $__67.value;
                                $ctx.state = -2;
                                break;
                              case 18:
                                $ctx.state = 28;
                                return $__67.value;
                              case 43:
                                result.push(left[0]);
                                $ctx.state = 44;
                                break;
                              case 44:
                                $__68 = $ctx.wrapYieldStar(merge_iter(result, left.slice(1), right)[Symbol.iterator]());
                                $ctx.sent = void 0;
                                $ctx.action = 'next';
                                $ctx.state = 42;
                                break;
                              case 42:
                                $__69 = $__68[$ctx.action]($ctx.sentIgnoreThrow);
                                $ctx.state = 39;
                                break;
                              case 39:
                                $ctx.state = ($__69.done) ? 33 : 32;
                                break;
                              case 33:
                                $ctx.sent = $__69.value;
                                $ctx.state = -2;
                                break;
                              case 32:
                                $ctx.state = 42;
                                return $__69.value;
                              default:
                                return $ctx.end();
                            }
                        }, $__59, this);
                      });
                      merged = [];
                      $ctx.state = 16;
                      break;
                    case 16:
                      $__70 = $ctx.wrapYieldStar(merge_iter(merged, l, r)[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 12;
                      break;
                    case 12:
                      $__71 = $__70[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = ($__71.done) ? 3 : 2;
                      break;
                    case 3:
                      $ctx.sent = $__71.value;
                      $ctx.state = 10;
                      break;
                    case 2:
                      $ctx.state = 12;
                      return $__71.value;
                    case 10:
                      $ctx.returnValue = merged;
                      $ctx.state = -2;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__58, this);
            });
            msort = $traceurRuntime.initGeneratorFunction(function $__59(array) {
              var middle,
                  left,
                  right,
                  $__72,
                  $__73,
                  $__74,
                  $__75,
                  $__76,
                  $__77,
                  $__78,
                  $__79,
                  $__80,
                  $__81,
                  $__82,
                  $__83;
              return $traceurRuntime.createGeneratorInstance(function($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      $ctx.state = (!Array.isArray(array) || array.length <= 1) ? 1 : 57;
                      break;
                    case 1:
                      $ctx.returnValue = array;
                      $ctx.state = -2;
                      break;
                    case 57:
                      middle = Math.floor(array.length / 2);
                      left = array.slice(0, middle);
                      right = array.slice(middle);
                      $ctx.state = 58;
                      break;
                    case 58:
                      $__72 = msort(left);
                      $ctx.state = 18;
                      break;
                    case 18:
                      $__74 = $ctx.wrapYieldStar($__72[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 14;
                      break;
                    case 14:
                      $__75 = $__74[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 11;
                      break;
                    case 11:
                      $ctx.state = ($__75.done) ? 5 : 4;
                      break;
                    case 5:
                      $ctx.sent = $__75.value;
                      $ctx.state = 12;
                      break;
                    case 4:
                      $ctx.state = 14;
                      return $__75.value;
                    case 12:
                      $__73 = $ctx.sentIgnoreThrow;
                      $ctx.state = 16;
                      break;
                    case 16:
                      left = $__73;
                      $ctx.state = 20;
                      break;
                    case 20:
                      $__76 = msort(right);
                      $ctx.state = 36;
                      break;
                    case 36:
                      $__78 = $ctx.wrapYieldStar($__76[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 32;
                      break;
                    case 32:
                      $__79 = $__78[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 29;
                      break;
                    case 29:
                      $ctx.state = ($__79.done) ? 23 : 22;
                      break;
                    case 23:
                      $ctx.sent = $__79.value;
                      $ctx.state = 30;
                      break;
                    case 22:
                      $ctx.state = 32;
                      return $__79.value;
                    case 30:
                      $__77 = $ctx.sentIgnoreThrow;
                      $ctx.state = 34;
                      break;
                    case 34:
                      right = $__77;
                      $ctx.state = 38;
                      break;
                    case 38:
                      $__80 = merge(left, right);
                      $ctx.state = 54;
                      break;
                    case 54:
                      $__82 = $ctx.wrapYieldStar($__80[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 50;
                      break;
                    case 50:
                      $__83 = $__82[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 47;
                      break;
                    case 47:
                      $ctx.state = ($__83.done) ? 41 : 40;
                      break;
                    case 41:
                      $ctx.sent = $__83.value;
                      $ctx.state = 48;
                      break;
                    case 40:
                      $ctx.state = 50;
                      return $__83.value;
                    case 48:
                      $__81 = $ctx.sentIgnoreThrow;
                      $ctx.state = 52;
                      break;
                    case 52:
                      $ctx.returnValue = $__81;
                      $ctx.state = -2;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__59, this);
            });
            $ctx.state = 24;
            break;
          case 24:
            $__84 = $ctx.wrapYieldStar(msort(arr)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 18;
            break;
          case 18:
            $__85 = $__84[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 15;
            break;
          case 15:
            $ctx.state = ($__85.done) ? 9 : 8;
            break;
          case 9:
            $ctx.sent = $__85.value;
            $ctx.state = 16;
            break;
          case 8:
            $ctx.state = 18;
            return $__85.value;
          case 16:
            result = $ctx.sentIgnoreThrow;
            $ctx.state = 20;
            break;
          case 20:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__56, this);
  }
  function shuffle(arr) {
    if (typeof arr === 'undefined') {
      return undefined;
    }
    if (arr.length <= 1) {
      return arr;
    }
    var result = new Array(arr.length);
    for (var i = 0; i < arr.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      if (i !== j) {
        result[i] = result[j];
      }
      result[j] = arr[i];
    }
    return result;
  }
  function sift(arg, func) {
    var result,
        $__86,
        $__87,
        $__88,
        $__89,
        item,
        entry,
        func_args,
        res,
        $__90,
        $__91;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            result = {};
            $ctx.state = 32;
            break;
          case 32:
            $__86 = [];
            $__87 = arg;
            for ($__88 in $__87)
              $__86.push($__88);
            $ctx.state = 28;
            break;
          case 28:
            $__89 = 0;
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = ($__89 < $__86.length) ? 18 : 24;
            break;
          case 23:
            $__89++;
            $ctx.state = 26;
            break;
          case 18:
            item = $__86[$__89];
            $ctx.state = 19;
            break;
          case 19:
            $ctx.state = (!(item in $__87)) ? 23 : 16;
            break;
          case 16:
            entry = arg[item];
            func_args = hofFuncArgs(func, entry, item, arg);
            $ctx.state = 21;
            break;
          case 21:
            $__90 = $ctx.wrapYieldStar(func.apply(this, func_args)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__91 = $__90[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__91.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__91.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__91.value;
          case 10:
            res = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            if (boolean(res)) {
              result[item] = entry;
            }
            $ctx.state = 23;
            break;
          case 24:
            if (Object.keys(result).length === 0) {
              result = undefined;
            }
            $ctx.state = 34;
            break;
          case 34:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__57, this);
  }
  return {
    sum: sum,
    count: count,
    max: max,
    min: min,
    average: average,
    string: string,
    substring: substring,
    substringBefore: substringBefore,
    substringAfter: substringAfter,
    lowercase: lowercase,
    uppercase: uppercase,
    length: length,
    trim: trim,
    pad: pad,
    match: match,
    contains: contains,
    replace: replace,
    split: split,
    join: join,
    formatNumber: formatNumber,
    formatBase: formatBase,
    number: number,
    floor: floor,
    ceil: ceil,
    round: round,
    abs: abs,
    sqrt: sqrt,
    power: power,
    random: random,
    boolean: boolean,
    not: not,
    map: map,
    zip: zip,
    filter: filter,
    foldLeft: foldLeft,
    sift: sift,
    keys: keys,
    lookup: lookup,
    append: append,
    exists: exists,
    spread: spread,
    merge: merge,
    reverse: reverse,
    each: each,
    sort: sort,
    shuffle: shuffle,
    base64encode: base64encode,
    base64decode: base64decode
  };
})();
module.exports = functions;
