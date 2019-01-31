"use strict";
var dateTime = (function() {
  'use strict';
  var few = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  var ordinals = ['Zeroth', 'First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth', 'Eleventh', 'Twelfth', 'Thirteenth', 'Fourteenth', 'Fifteenth', 'Sixteenth', 'Seventeenth', 'Eighteenth', 'Nineteenth'];
  var decades = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety', 'Hundred'];
  var magnitudes = ['Thousand', 'Million', 'Billion', 'Trillion'];
  function numberToWords(value, ordinal) {
    var lookup = function(num, prev, ord) {
      var words = '';
      if (num <= 19) {
        words = (prev ? ' and ' : '') + (ord ? ordinals[num] : few[num]);
      } else if (num < 100) {
        var tens = Math.floor(num / 10);
        var remainder = num % 10;
        words = (prev ? ' and ' : '') + decades[tens - 2];
        if (remainder > 0) {
          words += '-' + lookup(remainder, false, ord);
        } else if (ord) {
          words = words.substring(0, words.length - 1) + 'ieth';
        }
      } else if (num < 1000) {
        var hundreds = Math.floor(num / 100);
        var remainder$__1 = num % 100;
        words = (prev ? ', ' : '') + few[hundreds] + ' Hundred';
        if (remainder$__1 > 0) {
          words += lookup(remainder$__1, true, ord);
        } else if (ord) {
          words += 'th';
        }
      } else {
        var mag = Math.floor(Math.log10(num) / 3);
        if (mag > magnitudes.length) {
          mag = magnitudes.length;
        }
        var factor = Math.pow(10, mag * 3);
        var mant = Math.floor(num / factor);
        var remainder$__2 = num - mant * factor;
        words = (prev ? ', ' : '') + lookup(mant, false, false) + ' ' + magnitudes[mag - 1];
        if (remainder$__2 > 0) {
          words += lookup(remainder$__2, true, ord);
        } else if (ord) {
          words += 'th';
        }
      }
      return words;
    };
    var words = lookup(value, false, ordinal);
    return words;
  }
  var wordValues = {};
  few.forEach(function(word, index) {
    wordValues[word.toLowerCase()] = index;
  });
  ordinals.forEach(function(word, index) {
    wordValues[word.toLowerCase()] = index;
  });
  decades.forEach(function(word, index) {
    var lword = word.toLowerCase();
    wordValues[lword] = (index + 2) * 10;
    wordValues[lword.substring(0, word.length - 1) + 'ieth'] = wordValues[lword];
  });
  wordValues.hundredth = 100;
  magnitudes.forEach(function(word, index) {
    var lword = word.toLowerCase();
    var val = Math.pow(10, (index + 1) * 3);
    wordValues[lword] = val;
    wordValues[lword + 'th'] = val;
  });
  function wordsToNumber(text) {
    var parts = text.split(/,\s|\sand\s|[\s\\-]/);
    var values = parts.map(function(part) {
      return wordValues[part];
    });
    var segs = [0];
    values.forEach(function(value) {
      if (value < 100) {
        var top = segs.pop();
        if (top >= 1000) {
          segs.push(top);
          top = 0;
        }
        segs.push(top + value);
      } else {
        segs.push(segs.pop() * value);
      }
    });
    var result = segs.reduce(function(a, b) {
      return a + b;
    }, 0);
    return result;
  }
  var romanNumerals = [[1000, 'm'], [900, 'cm'], [500, 'd'], [400, 'cd'], [100, 'c'], [90, 'xc'], [50, 'l'], [40, 'xl'], [10, 'x'], [9, 'ix'], [5, 'v'], [4, 'iv'], [1, 'i']];
  var romanValues = {
    'M': 1000,
    'D': 500,
    'C': 100,
    'L': 50,
    'X': 10,
    'V': 5,
    'I': 1
  };
  function decimalToRoman(value) {
    for (var index = 0; index < romanNumerals.length; index++) {
      var numeral = romanNumerals[index];
      if (value >= numeral[0]) {
        return numeral[1] + decimalToRoman(value - numeral[0]);
      }
    }
    return '';
  }
  function romanToDecimal(roman) {
    var decimal = 0;
    var max = 1;
    for (var i = roman.length - 1; i >= 0; i--) {
      var digit = roman[i];
      var value = romanValues[digit];
      if (value < max) {
        decimal -= value;
      } else {
        max = value;
        decimal += value;
      }
    }
    return decimal;
  }
  function decimalToLetters(value, aChar) {
    var letters = [];
    var aCode = aChar.charCodeAt(0);
    while (value > 0) {
      letters.unshift(String.fromCharCode((value - 1) % 26 + aCode));
      value = Math.floor((value - 1) / 26);
    }
    return letters.join('');
  }
  function lettersToDecimal(letters, aChar) {
    var aCode = aChar.charCodeAt(0);
    var decimal = 0;
    for (var i = 0; i < letters.length; i++) {
      decimal += (letters.charCodeAt(letters.length - i - 1) - aCode + 1) * Math.pow(26, i);
    }
    return decimal;
  }
  function formatInteger(value, picture) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    value = Math.floor(value);
    var format = analyseIntegerPicture(picture);
    return _formatInteger(value, format);
  }
  var formats = {
    DECIMAL: 'decimal',
    LETTERS: 'letters',
    ROMAN: 'roman',
    WORDS: 'words',
    SEQUENCE: 'sequence'
  };
  var tcase = {
    UPPER: 'upper',
    LOWER: 'lower',
    TITLE: 'title'
  };
  function _formatInteger(value, format) {
    var formattedInteger;
    var negative = value < 0;
    value = Math.abs(value);
    switch (format.primary) {
      case formats.LETTERS:
        formattedInteger = decimalToLetters(value, format.case === tcase.UPPER ? 'A' : 'a');
        break;
      case formats.ROMAN:
        formattedInteger = decimalToRoman(value);
        if (format.case === tcase.UPPER) {
          formattedInteger = formattedInteger.toUpperCase();
        }
        break;
      case formats.WORDS:
        formattedInteger = numberToWords(value, format.ordinal);
        if (format.case === tcase.UPPER) {
          formattedInteger = formattedInteger.toUpperCase();
        } else if (format.case === tcase.LOWER) {
          formattedInteger = formattedInteger.toLowerCase();
        }
        break;
      case formats.DECIMAL:
        formattedInteger = '' + value;
        var padLength = format.mandatoryDigits - formattedInteger.length;
        if (padLength > 0) {
          var padding = (new Array(padLength + 1)).join('0');
          formattedInteger = padding + formattedInteger;
        }
        if (format.zeroCode !== 0x30) {
          formattedInteger = Array.from(formattedInteger).map(function(code) {
            return String.fromCodePoint(code.codePointAt(0) + format.zeroCode - 0x30);
          }).join('');
        }
        if (format.regular) {
          var n = Math.floor((formattedInteger.length - 1) / format.groupingSeparators.position);
          for (var ii = n; ii > 0; ii--) {
            var pos = formattedInteger.length - ii * format.groupingSeparators.position;
            formattedInteger = formattedInteger.substr(0, pos) + format.groupingSeparators.character + formattedInteger.substr(pos);
          }
        } else {
          format.groupingSeparators.reverse().forEach(function(separator) {
            var pos = formattedInteger.length - separator.position;
            formattedInteger = formattedInteger.substr(0, pos) + separator.character + formattedInteger.substr(pos);
          });
        }
        if (format.ordinal) {
          var suffix123 = {
            '1': 'st',
            '2': 'nd',
            '3': 'rd'
          };
          var lastDigit = formattedInteger[formattedInteger.length - 1];
          var suffix = suffix123[lastDigit];
          if (!suffix || (formattedInteger.length > 1 && formattedInteger[formattedInteger.length - 2] === '1')) {
            suffix = 'th';
          }
          formattedInteger = formattedInteger + suffix;
        }
        break;
      case formats.SEQUENCE:
        throw {
          code: 'D3130',
          value: format.token
        };
    }
    if (negative) {
      formattedInteger = '-' + formattedInteger;
    }
    return formattedInteger;
  }
  var decimalGroups = [0x30, 0x0660, 0x06F0, 0x07C0, 0x0966, 0x09E6, 0x0A66, 0x0AE6, 0x0B66, 0x0BE6, 0x0C66, 0x0CE6, 0x0D66, 0x0DE6, 0x0E50, 0x0ED0, 0x0F20, 0x1040, 0x1090, 0x17E0, 0x1810, 0x1946, 0x19D0, 0x1A80, 0x1A90, 0x1B50, 0x1BB0, 0x1C40, 0x1C50, 0xA620, 0xA8D0, 0xA900, 0xA9D0, 0xA9F0, 0xAA50, 0xABF0, 0xFF10];
  function analyseIntegerPicture(picture) {
    var format = {
      type: 'integer',
      primary: formats.DECIMAL,
      case: tcase.LOWER,
      ordinal: false
    };
    var primaryFormat,
        formatModifier;
    var semicolon = picture.lastIndexOf(';');
    if (semicolon === -1) {
      primaryFormat = picture;
    } else {
      primaryFormat = picture.substring(0, semicolon);
      formatModifier = picture.substring(semicolon + 1);
      if (formatModifier[0] === 'o') {
        format.ordinal = true;
      }
    }
    switch (primaryFormat) {
      case 'A':
        format.case = tcase.UPPER;
      case 'a':
        format.primary = formats.LETTERS;
        break;
      case 'I':
        format.case = tcase.UPPER;
      case 'i':
        format.primary = formats.ROMAN;
        break;
      case 'W':
        format.case = tcase.UPPER;
        format.primary = formats.WORDS;
        break;
      case 'Ww':
        format.case = tcase.TITLE;
        format.primary = formats.WORDS;
        break;
      case 'w':
        format.primary = formats.WORDS;
        break;
      default:
        {
          var zeroCode = null;
          var mandatoryDigits = 0;
          var optionalDigits = 0;
          var groupingSeparators = [];
          var separatorPosition = 0;
          var formatCodepoints = Array.from(primaryFormat, function(c) {
            return c.codePointAt(0);
          }).reverse();
          formatCodepoints.forEach(function(codePoint) {
            var digit = false;
            for (var ii = 0; ii < decimalGroups.length; ii++) {
              var group = decimalGroups[ii];
              if (codePoint >= group && codePoint <= group + 9) {
                digit = true;
                mandatoryDigits++;
                separatorPosition++;
                if (zeroCode === null) {
                  zeroCode = group;
                } else if (group !== zeroCode) {
                  throw {code: 'D3131'};
                }
                break;
              }
            }
            if (!digit) {
              if (codePoint === 0x23) {
                separatorPosition++;
                optionalDigits++;
              } else {
                groupingSeparators.push({
                  position: separatorPosition,
                  character: String.fromCodePoint(codePoint)
                });
              }
            }
          });
          if (mandatoryDigits > 0) {
            format.primary = formats.DECIMAL;
            format.zeroCode = zeroCode;
            format.mandatoryDigits = mandatoryDigits;
            format.optionalDigits = optionalDigits;
            var regularRepeat = function(separators) {
              if (separators.length === 0) {
                return 0;
              }
              var sepChar = separators[0].character;
              for (var ii = 1; ii < separators.length; ii++) {
                if (separators[ii].character !== sepChar) {
                  return 0;
                }
              }
              var indexes = separators.map(function(separator) {
                return separator.position;
              });
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
            var regular = regularRepeat(groupingSeparators);
            if (regular > 0) {
              format.regular = true;
              format.groupingSeparators = {
                position: regular,
                character: groupingSeparators[0].character
              };
            } else {
              format.regular = false;
              format.groupingSeparators = groupingSeparators;
            }
          } else {
            format.primary = formats.SEQUENCE;
            format.token = primaryFormat;
          }
        }
    }
    return format;
  }
  var defaultPresentationModifiers = {
    Y: '1',
    M: '1',
    D: '1',
    d: '1',
    F: 'n',
    W: '1',
    w: '1',
    X: '1',
    x: '1',
    H: '1',
    h: '1',
    P: 'n',
    m: '01',
    s: '01',
    f: '1',
    Z: '01:01',
    z: '01:01',
    C: 'n',
    E: 'n'
  };
  function analyseDateTimePicture(picture) {
    var spec = [];
    var format = {
      type: 'datetime',
      parts: spec
    };
    var addLiteral = function(start, end) {
      if (end > start) {
        var literal = picture.substring(start, end);
        literal = literal.split(']]').join(']');
        spec.push({
          type: 'literal',
          value: literal
        });
      }
    };
    var start = 0,
        pos = 0;
    while (pos < picture.length) {
      if (picture.charAt(pos) === '[') {
        if (picture.charAt(pos + 1) === '[') {
          addLiteral(start, pos);
          spec.push({
            type: 'literal',
            value: '['
          });
          pos += 2;
          start = pos;
          continue;
        }
        addLiteral(start, pos);
        start = pos;
        pos = picture.indexOf(']', start);
        if (pos === -1) {
          throw {code: 'D3135'};
        }
        var marker = picture.substring(start + 1, pos);
        marker = marker.split(/\s+/).join('');
        var def = {
          type: 'marker',
          component: marker.charAt(0)
        };
        var comma = marker.lastIndexOf(',');
        var presMod = void 0;
        if (comma !== -1) {
          var widthMod = marker.substring(comma + 1);
          var dash = widthMod.indexOf('-');
          var min = void 0,
              max = void 0;
          var parseWidth = function(wm) {
            if (typeof wm === 'undefined' || wm === '*') {
              return undefined;
            } else {
              return parseInt(wm);
            }
          };
          if (dash === -1) {
            min = widthMod;
          } else {
            min = widthMod.substring(0, dash);
            max = widthMod.substring(dash + 1);
          }
          var widthDef = {
            min: parseWidth(min),
            max: parseWidth(max)
          };
          def.width = widthDef;
          presMod = marker.substring(1, comma);
        } else {
          presMod = marker.substring(1);
        }
        if (presMod.length === 1) {
          def.presentation1 = presMod;
        } else if (presMod.length > 1) {
          var lastChar = presMod.charAt(presMod.length - 1);
          if ('atco'.indexOf(lastChar) !== -1) {
            def.presentation2 = lastChar;
            if (lastChar === 'o') {
              def.ordinal = true;
            }
            def.presentation1 = presMod.substring(0, presMod.length - 1);
          } else {
            def.presentation1 = presMod;
          }
        } else {
          def.presentation1 = defaultPresentationModifiers[def.component];
        }
        if (typeof def.presentation1 === 'undefined') {
          throw {
            code: 'D3132',
            value: def.component
          };
        }
        if (def.presentation1[0] === 'n') {
          def.names = tcase.LOWER;
        } else if (def.presentation1[0] === 'N') {
          if (def.presentation1[1] === 'n') {
            def.names = tcase.TITLE;
          } else {
            def.names = tcase.UPPER;
          }
        } else if ('YMDdFWwXxHhmsf'.indexOf(def.component) !== -1) {
          var integerPattern = def.presentation1;
          if (def.presentation2) {
            integerPattern += ';' + def.presentation2;
          }
          def.integerFormat = analyseIntegerPicture(integerPattern);
          if (def.width && def.width.min !== undefined) {
            if (def.integerFormat.mandatoryDigits < def.width.min) {
              def.integerFormat.mandatoryDigits = def.width.min;
            }
          }
          if (def.component === 'Y') {
            def.n = -1;
            if (def.width && def.width.max !== undefined) {
              def.n = def.width.max;
              def.integerFormat.mandatoryDigits = def.n;
            } else {
              var w = def.integerFormat.mandatoryDigits + def.integerFormat.optionalDigits;
              if (w >= 2) {
                def.n = w;
              }
            }
          }
        }
        if (def.component === 'Z' || def.component === 'z') {
          def.integerFormat = analyseIntegerPicture(def.presentation1);
        }
        spec.push(def);
        start = pos + 1;
      }
      pos++;
    }
    addLiteral(start, pos);
    return format;
  }
  var days = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var millisInADay = 1000 * 60 * 60 * 24;
  var startOfFirstWeek = function(ym) {
    var jan1 = Date.UTC(ym.year, ym.month);
    var dayOfJan1 = (new Date(jan1)).getDay();
    if (dayOfJan1 === 0) {
      dayOfJan1 = 7;
    }
    return dayOfJan1 > 4 ? jan1 + (8 - dayOfJan1) * millisInADay : jan1 - (dayOfJan1 - 1) * millisInADay;
  };
  var yearMonth = function(year, month) {
    return {
      year: year,
      month: month,
      nextMonth: function() {
        return (month === 11) ? yearMonth(year + 1, 0) : yearMonth(year, month + 1);
      },
      previousMonth: function() {
        return (month === 0) ? yearMonth(year - 1, 11) : yearMonth(year, month - 1);
      },
      nextYear: function() {
        return yearMonth(year + 1, month);
      },
      previousYear: function() {
        return yearMonth(year - 1, month);
      }
    };
  };
  var deltaWeeks = function(start, end) {
    return (end - start) / (millisInADay * 7) + 1;
  };
  var getDateTimeFragment = function(date, component) {
    var componentValue;
    switch (component) {
      case 'Y':
        componentValue = date.getUTCFullYear();
        break;
      case 'M':
        componentValue = date.getUTCMonth() + 1;
        break;
      case 'D':
        componentValue = date.getUTCDate();
        break;
      case 'd':
        {
          var today = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
          var firstJan = Date.UTC(date.getUTCFullYear(), 0);
          componentValue = (today - firstJan) / millisInADay + 1;
          break;
        }
      case 'F':
        componentValue = date.getUTCDay();
        if (componentValue === 0) {
          componentValue = 7;
        }
        break;
      case 'W':
        {
          var thisYear = yearMonth(date.getUTCFullYear(), 0);
          var startOfWeek1 = startOfFirstWeek(thisYear);
          var today$__3 = Date.UTC(thisYear.year, date.getUTCMonth(), date.getUTCDate());
          var week = deltaWeeks(startOfWeek1, today$__3);
          if (week > 52) {
            var startOfFollowingYear = startOfFirstWeek(thisYear.nextYear());
            if (today$__3 >= startOfFollowingYear) {
              week = 1;
            }
          } else if (week < 1) {
            var startOfPreviousYear = startOfFirstWeek(thisYear.previousYear());
            week = deltaWeeks(startOfPreviousYear, today$__3);
          }
          componentValue = Math.floor(week);
          break;
        }
      case 'w':
        {
          var thisMonth = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
          var startOfWeek1$__4 = startOfFirstWeek(thisMonth);
          var today$__5 = Date.UTC(thisMonth.year, thisMonth.month, date.getUTCDate());
          var week$__6 = deltaWeeks(startOfWeek1$__4, today$__5);
          if (week$__6 > 4) {
            var startOfFollowingMonth = startOfFirstWeek(thisMonth.nextMonth());
            if (today$__5 >= startOfFollowingMonth) {
              week$__6 = 1;
            }
          } else if (week$__6 < 1) {
            var startOfPreviousMonth = startOfFirstWeek(thisMonth.previousMonth());
            week$__6 = deltaWeeks(startOfPreviousMonth, today$__5);
          }
          componentValue = Math.floor(week$__6);
          break;
        }
      case 'X':
        {
          var thisYear$__7 = yearMonth(date.getUTCFullYear(), 0);
          var startOfISOYear = startOfFirstWeek(thisYear$__7);
          var endOfISOYear = startOfFirstWeek(thisYear$__7.nextYear());
          var now = date.getTime();
          if (now < startOfISOYear) {
            componentValue = thisYear$__7.year - 1;
          } else if (now >= endOfISOYear) {
            componentValue = thisYear$__7.year + 1;
          } else {
            componentValue = thisYear$__7.year;
          }
          break;
        }
      case 'x':
        {
          var thisMonth$__8 = yearMonth(date.getUTCFullYear(), date.getUTCMonth());
          var startOfISOMonth = startOfFirstWeek(thisMonth$__8);
          var nextMonth = thisMonth$__8.nextMonth();
          var endOfISOMonth = startOfFirstWeek(nextMonth);
          var now$__9 = date.getTime();
          if (now$__9 < startOfISOMonth) {
            componentValue = thisMonth$__8.previousMonth().month + 1;
          } else if (now$__9 >= endOfISOMonth) {
            componentValue = nextMonth.month + 1;
          } else {
            componentValue = thisMonth$__8.month + 1;
          }
          break;
        }
      case 'H':
        componentValue = date.getUTCHours();
        break;
      case 'h':
        componentValue = date.getUTCHours();
        componentValue = componentValue % 12;
        if (componentValue === 0) {
          componentValue = 12;
        }
        break;
      case 'P':
        componentValue = date.getUTCHours() >= 12 ? 'pm' : 'am';
        break;
      case 'm':
        componentValue = date.getUTCMinutes();
        break;
      case 's':
        componentValue = date.getUTCSeconds();
        break;
      case 'f':
        componentValue = date.getUTCMilliseconds();
        break;
      case 'Z':
      case 'z':
        break;
      case 'C':
        componentValue = 'ISO';
        break;
      case 'E':
        componentValue = 'ISO';
        break;
    }
    return componentValue;
  };
  var iso8601Spec = analyseDateTimePicture('[Y0001]-[M01]-[D01]T[H01]:[m01]:[s01].[f001][Z01:01t]');
  function formatDateTime(millis, picture, timezone) {
    var offsetHours = 0;
    var offsetMinutes = 0;
    if (typeof timezone !== 'undefined') {
      var offset = parseInt(timezone);
      offsetHours = Math.floor(offset / 100);
      offsetMinutes = offset % 100;
    }
    var formatComponent = function(date, markerSpec) {
      var componentValue = getDateTimeFragment(date, markerSpec.component);
      if ('YMDdFWwXxHhms'.indexOf(markerSpec.component) !== -1) {
        if (markerSpec.component === 'Y') {
          if (markerSpec.n !== -1) {
            componentValue = componentValue % Math.pow(10, markerSpec.n);
          }
        }
        if (markerSpec.names) {
          if (markerSpec.component === 'M' || markerSpec.component === 'x') {
            componentValue = months[componentValue - 1];
          } else if (markerSpec.component === 'F') {
            componentValue = days[componentValue];
          } else {
            throw {
              code: 'D3133',
              value: markerSpec.component
            };
          }
          if (markerSpec.names === tcase.UPPER) {
            componentValue = componentValue.toUpperCase();
          } else if (markerSpec.names === tcase.LOWER) {
            componentValue = componentValue.toLowerCase();
          }
          if (markerSpec.width && componentValue.length > markerSpec.width.max) {
            componentValue = componentValue.substring(0, markerSpec.width.max);
          }
        } else {
          componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
        }
      } else if (markerSpec.component === 'f') {
        componentValue = _formatInteger(componentValue, markerSpec.integerFormat);
      } else if (markerSpec.component === 'Z' || markerSpec.component === 'z') {
        var offset = offsetHours * 100 + offsetMinutes;
        if (markerSpec.integerFormat.regular) {
          componentValue = _formatInteger(offset, markerSpec.integerFormat);
        } else {
          var numDigits = markerSpec.integerFormat.mandatoryDigits;
          if (numDigits === 1 || numDigits === 2) {
            componentValue = _formatInteger(offsetHours, markerSpec.integerFormat);
            if (offsetMinutes !== 0) {
              componentValue += ':' + formatInteger(offsetMinutes, '00');
            }
          } else if (numDigits === 3 || numDigits === 4) {
            componentValue = _formatInteger(offset, markerSpec.integerFormat);
          } else {
            throw {
              code: 'D3134',
              value: numDigits
            };
          }
        }
        if (offset >= 0) {
          componentValue = '+' + componentValue;
        }
        if (markerSpec.component === 'z') {
          componentValue = 'GMT' + componentValue;
        }
        if (offset === 0 && markerSpec.presentation2 === 't') {
          componentValue = 'Z';
        }
      }
      return componentValue;
    };
    var formatSpec;
    if (typeof picture === 'undefined') {
      formatSpec = iso8601Spec;
    } else {
      formatSpec = analyseDateTimePicture(picture);
    }
    var offsetMillis = (60 * offsetHours + offsetMinutes) * 60 * 1000;
    var dateTime = new Date(millis + offsetMillis);
    var result = '';
    formatSpec.parts.forEach(function(part) {
      if (part.type === 'literal') {
        result += part.value;
      } else {
        result += formatComponent(dateTime, part);
      }
    });
    return result;
  }
  function generateRegex(formatSpec) {
    var matcher = {};
    if (formatSpec.type === 'datetime') {
      matcher.type = 'datetime';
      matcher.parts = formatSpec.parts.map(function(part) {
        var res = {};
        if (part.type === 'literal') {
          res.regex = part.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        } else if (part.integerFormat) {
          res = generateRegex(part.integerFormat);
        } else {
          res.regex = '[a-zA-Z]+';
          var lookup = {};
          if (part.component === 'M' || part.component === 'x') {
            months.forEach(function(name, index) {
              if (part.width && part.width.max) {
                lookup[name.substring(0, part.width.max)] = index + 1;
              } else {
                lookup[name] = index + 1;
              }
            });
          } else if (part.component === 'F') {
            days.forEach(function(name, index) {
              if (index > 0) {
                if (part.width && part.width.max) {
                  lookup[name.substring(0, part.width.max)] = index;
                } else {
                  lookup[name] = index;
                }
              }
            });
          } else if (part.component === 'P') {
            lookup = {
              'am': 0,
              'AM': 0,
              'pm': 1,
              'PM': 1
            };
          } else {
            throw {
              code: 'D3133',
              value: part.component
            };
          }
          res.parse = function(value) {
            return lookup[value];
          };
        }
        res.component = part.component;
        return res;
      });
    } else {
      matcher.type = 'integer';
      var isUpper = formatSpec.case === tcase.UPPER;
      switch (formatSpec.primary) {
        case formats.LETTERS:
          matcher.regex = isUpper ? '[A-Z]+' : '[a-z]+';
          matcher.parse = function(value) {
            return lettersToDecimal(value, isUpper ? 'A' : 'a');
          };
          break;
        case formats.ROMAN:
          matcher.regex = isUpper ? '[MDCLXVI]+' : '[mdclxvi]+';
          matcher.parse = function(value) {
            return romanToDecimal(isUpper ? value : value.toUpperCase());
          };
          break;
        case formats.WORDS:
          matcher.regex = '(?:' + Object.keys(wordValues).concat('and', '[\\-, ]').join('|') + ')+';
          matcher.parse = function(value) {
            return wordsToNumber(value.toLowerCase());
          };
          break;
        case formats.DECIMAL:
          matcher.regex = '[0-9]+';
          if (formatSpec.ordinal) {
            matcher.regex += '(?:th|st|nd|rd)';
          }
          matcher.parse = function(value) {
            var digits = value;
            if (formatSpec.ordinal) {
              digits = value.substring(0, value.length - 2);
            }
            if (formatSpec.regular) {
              digits = digits.split(',').join('');
            } else {
              formatSpec.groupingSeparators.forEach(function(sep) {
                digits = digits.split(sep.character).join('');
              });
            }
            if (formatSpec.zeroCode !== 0x30) {
              digits = digits.split('').map(function(char) {
                return String.fromCodePoint(char.codePointAt(0) - formatSpec.zeroCode + 0x30);
              }).join('');
            }
            return parseInt(digits);
          };
      }
    }
    return matcher;
  }
  function parseInteger(value, picture) {
    if (typeof value === 'undefined') {
      return undefined;
    }
    var formatSpec = analyseIntegerPicture(picture);
    var matchSpec = generateRegex(formatSpec);
    var result = matchSpec.parse(value);
    return result;
  }
  function parseDateTime(timestamp, picture) {
    var formatSpec = analyseDateTimePicture(picture);
    var matchSpec = generateRegex(formatSpec);
    var fullRegex = '^' + matchSpec.parts.map(function(part) {
      return '(' + part.regex + ')';
    }).join('') + '$';
    var matcher = new RegExp(fullRegex, 'i');
    var info = matcher.exec(timestamp);
    if (info !== null) {
      var dmA = 161;
      var dmB = 130;
      var dmC = 84;
      var dmD = 72;
      var tmA = 23;
      var tmB = 47;
      var components = {};
      for (var i = 1; i < info.length; i++) {
        var mpart = matchSpec.parts[i - 1];
        if (mpart.parse) {
          components[mpart.component] = mpart.parse(info[i]);
        }
      }
      if (Object.getOwnPropertyNames(components).length === 0) {
        return undefined;
      }
      var mask = 0;
      var shift = function(bit) {
        mask <<= 1;
        mask += bit ? 1 : 0;
      };
      var isType = function(type) {
        return !(~type & mask) && !!(type & mask);
      };
      'YXMxWwdD'.split('').forEach(function(part) {
        return shift(components[part]);
      });
      var dateA = isType(dmA);
      var dateB = !dateA && isType(dmB);
      var dateC = isType(dmC);
      var dateD = !dateC && isType(dmD);
      mask = 0;
      'PHhmsf'.split('').forEach(function(part) {
        return shift(components[part]);
      });
      var timeA = isType(tmA);
      var timeB = !timeA && isType(tmB);
      var dateComps = dateB ? 'YD' : dateC ? 'XxwF' : dateD ? 'XWF' : 'YMD';
      var timeComps = timeB ? 'Phmsf' : 'Hmsf';
      var comps = dateComps + timeComps;
      var now = this.environment.timestamp;
      var startSpecified = false;
      var endSpecified = false;
      comps.split('').forEach(function(part) {
        if (typeof components[part] === 'undefined') {
          if (startSpecified) {
            components[part] = ('MDd'.indexOf(part) !== -1) ? 1 : 0;
            endSpecified = true;
          } else {
            components[part] = getDateTimeFragment(now, part);
          }
        } else {
          startSpecified = true;
          if (endSpecified) {
            throw {code: 'D3136'};
          }
        }
      });
      if (components.M > 0) {
        components.M -= 1;
      } else {
        components.M = 0;
      }
      if (dateB) {
        var firstJan = Date.UTC(components.Y, 0);
        var offsetMillis = (components.d - 1) * 1000 * 60 * 60 * 24;
        var derivedDate = new Date(firstJan + offsetMillis);
        components.M = derivedDate.getMonth();
        components.D = derivedDate.getDate();
      }
      if (dateC) {
        throw {code: 'D3136'};
      }
      if (dateD) {
        throw {code: 'D3136'};
      }
      if (timeB) {
        components.H = components.h === 12 ? 0 : components.h;
        if (components.P === 1) {
          components.H += 12;
        }
      }
      var millis = Date.UTC(components.Y, components.M, components.D, components.H, components.m, components.s, components.f);
      return millis;
    }
  }
  var iso8601regex = new RegExp('^\\d{4}(-[01]\\d)*(-[0-3]\\d)*(T[0-2]\\d:[0-5]\\d:[0-5]\\d)*(\\.\\d+)?([+-][0-2]\\d:?[0-5]\\d|Z)?$');
  function toMillis(timestamp, picture) {
    if (typeof timestamp === 'undefined') {
      return undefined;
    }
    if (typeof picture === 'undefined') {
      if (!iso8601regex.test(timestamp)) {
        throw {
          stack: (new Error()).stack,
          code: "D3110",
          value: timestamp
        };
      }
      return Date.parse(timestamp);
    } else {
      return parseDateTime.call(this, timestamp, picture);
    }
  }
  function fromMillis(millis, picture, timezone) {
    if (typeof millis === 'undefined') {
      return undefined;
    }
    return formatDateTime.call(this, millis, picture, timezone);
  }
  return {
    formatInteger: formatInteger,
    parseInteger: parseInteger,
    fromMillis: fromMillis,
    toMillis: toMillis
  };
})();
module.exports = dateTime;
