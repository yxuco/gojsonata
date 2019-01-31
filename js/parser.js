"use strict";
var parseSignature = require('./signature');
var parser = (function() {
  'use strict';
  var operators = {
    '.': 75,
    '[': 80,
    ']': 0,
    '{': 70,
    '}': 0,
    '(': 80,
    ')': 0,
    ',': 0,
    '@': 75,
    '#': 70,
    ';': 80,
    ':': 80,
    '?': 20,
    '+': 50,
    '-': 50,
    '*': 60,
    '/': 60,
    '%': 60,
    '|': 20,
    '=': 40,
    '<': 40,
    '>': 40,
    '^': 40,
    '**': 60,
    '..': 20,
    ':=': 10,
    '!=': 40,
    '<=': 40,
    '>=': 40,
    '~>': 40,
    'and': 30,
    'or': 25,
    'in': 40,
    '&': 50,
    '!': 0,
    '~': 0
  };
  var escapes = {
    '"': '"',
    '\\': '\\',
    '/': '/',
    'b': '\b',
    'f': '\f',
    'n': '\n',
    'r': '\r',
    't': '\t'
  };
  var tokenizer = function(path) {
    var position = 0;
    var length = path.length;
    var create = function(type, value) {
      var obj = {
        type: type,
        value: value,
        position: position
      };
      return obj;
    };
    var scanRegex = function() {
      var start = position;
      var depth = 0;
      var pattern;
      var flags;
      while (position < length) {
        var currentChar = path.charAt(position);
        if (currentChar === '/' && path.charAt(position - 1) !== '\\' && depth === 0) {
          pattern = path.substring(start, position);
          if (pattern === '') {
            throw {
              code: "S0301",
              stack: (new Error()).stack,
              position: position
            };
          }
          position++;
          currentChar = path.charAt(position);
          start = position;
          while (currentChar === 'i' || currentChar === 'm') {
            position++;
            currentChar = path.charAt(position);
          }
          flags = path.substring(start, position) + 'g';
          return new RegExp(pattern, flags);
        }
        if ((currentChar === '(' || currentChar === '[' || currentChar === '{') && path.charAt(position - 1) !== '\\') {
          depth++;
        }
        if ((currentChar === ')' || currentChar === ']' || currentChar === '}') && path.charAt(position - 1) !== '\\') {
          depth--;
        }
        position++;
      }
      throw {
        code: "S0302",
        stack: (new Error()).stack,
        position: position
      };
    };
    var next = function(prefix) {
      if (position >= length)
        return null;
      var currentChar = path.charAt(position);
      while (position < length && ' \t\n\r\v'.indexOf(currentChar) > -1) {
        position++;
        currentChar = path.charAt(position);
      }
      if (currentChar === '/' && path.charAt(position + 1) === '*') {
        var commentStart = position;
        position += 2;
        currentChar = path.charAt(position);
        while (!(currentChar === '*' && path.charAt(position + 1) === '/')) {
          currentChar = path.charAt(++position);
          if (position >= length) {
            throw {
              code: "S0106",
              stack: (new Error()).stack,
              position: commentStart
            };
          }
        }
        position += 2;
        currentChar = path.charAt(position);
        return next(prefix);
      }
      if (prefix !== true && currentChar === '/') {
        position++;
        return create('regex', scanRegex());
      }
      if (currentChar === '.' && path.charAt(position + 1) === '.') {
        position += 2;
        return create('operator', '..');
      }
      if (currentChar === ':' && path.charAt(position + 1) === '=') {
        position += 2;
        return create('operator', ':=');
      }
      if (currentChar === '!' && path.charAt(position + 1) === '=') {
        position += 2;
        return create('operator', '!=');
      }
      if (currentChar === '>' && path.charAt(position + 1) === '=') {
        position += 2;
        return create('operator', '>=');
      }
      if (currentChar === '<' && path.charAt(position + 1) === '=') {
        position += 2;
        return create('operator', '<=');
      }
      if (currentChar === '*' && path.charAt(position + 1) === '*') {
        position += 2;
        return create('operator', '**');
      }
      if (currentChar === '~' && path.charAt(position + 1) === '>') {
        position += 2;
        return create('operator', '~>');
      }
      if (operators.hasOwnProperty(currentChar)) {
        position++;
        return create('operator', currentChar);
      }
      if (currentChar === '"' || currentChar === "'") {
        var quoteType = currentChar;
        position++;
        var qstr = "";
        while (position < length) {
          currentChar = path.charAt(position);
          if (currentChar === '\\') {
            position++;
            currentChar = path.charAt(position);
            if (escapes.hasOwnProperty(currentChar)) {
              qstr += escapes[currentChar];
            } else if (currentChar === 'u') {
              var octets = path.substr(position + 1, 4);
              if (/^[0-9a-fA-F]+$/.test(octets)) {
                var codepoint = parseInt(octets, 16);
                qstr += String.fromCharCode(codepoint);
                position += 4;
              } else {
                throw {
                  code: "S0104",
                  stack: (new Error()).stack,
                  position: position
                };
              }
            } else {
              throw {
                code: "S0103",
                stack: (new Error()).stack,
                position: position,
                token: currentChar
              };
            }
          } else if (currentChar === quoteType) {
            position++;
            return create('string', qstr);
          } else {
            qstr += currentChar;
          }
          position++;
        }
        throw {
          code: "S0101",
          stack: (new Error()).stack,
          position: position
        };
      }
      var numregex = /^-?(0|([1-9][0-9]*))(\.[0-9]+)?([Ee][-+]?[0-9]+)?/;
      var match = numregex.exec(path.substring(position));
      if (match !== null) {
        var num = parseFloat(match[0]);
        if (!isNaN(num) && isFinite(num)) {
          position += match[0].length;
          return create('number', num);
        } else {
          throw {
            code: "S0102",
            stack: (new Error()).stack,
            position: position,
            token: match[0]
          };
        }
      }
      var name;
      if (currentChar === '`') {
        position++;
        var end = path.indexOf('`', position);
        if (end !== -1) {
          name = path.substring(position, end);
          position = end + 1;
          return create('name', name);
        }
        position = length;
        throw {
          code: "S0105",
          stack: (new Error()).stack,
          position: position
        };
      }
      var i = position;
      var ch;
      for (; ; ) {
        ch = path.charAt(i);
        if (i === length || ' \t\n\r\v'.indexOf(ch) > -1 || operators.hasOwnProperty(ch)) {
          if (path.charAt(position) === '$') {
            name = path.substring(position + 1, i);
            position = i;
            return create('variable', name);
          } else {
            name = path.substring(position, i);
            position = i;
            switch (name) {
              case 'or':
              case 'in':
              case 'and':
                return create('operator', name);
              case 'true':
                return create('value', true);
              case 'false':
                return create('value', false);
              case 'null':
                return create('value', null);
              default:
                if (position === length && name === '') {
                  return null;
                }
                return create('name', name);
            }
          }
        } else {
          i++;
        }
      }
    };
    return next;
  };
  var parser = function(source, recover) {
    var node;
    var lexer;
    var symbol_table = {};
    var errors = [];
    var remainingTokens = function() {
      var remaining = [];
      if (node.id !== '(end)') {
        remaining.push({
          type: node.type,
          value: node.value,
          position: node.position
        });
      }
      var nxt = lexer();
      while (nxt !== null) {
        remaining.push(nxt);
        nxt = lexer();
      }
      return remaining;
    };
    var base_symbol = {nud: function() {
        var err = {
          code: 'S0211',
          token: this.value,
          position: this.position
        };
        if (recover) {
          err.remaining = remainingTokens();
          err.type = 'error';
          errors.push(err);
          return err;
        } else {
          err.stack = (new Error()).stack;
          throw err;
        }
      }};
    var symbol = function(id, bp) {
      var s = symbol_table[id];
      bp = bp || 0;
      if (s) {
        if (bp >= s.lbp) {
          s.lbp = bp;
        }
      } else {
        s = Object.create(base_symbol);
        s.id = s.value = id;
        s.lbp = bp;
        symbol_table[id] = s;
      }
      return s;
    };
    var handleError = function(err) {
      if (recover) {
        err.remaining = remainingTokens();
        errors.push(err);
        var symbol = symbol_table["(error)"];
        node = Object.create(symbol);
        node.error = err;
        node.type = "(error)";
        return node;
      } else {
        err.stack = (new Error()).stack;
        throw err;
      }
    };
    var advance = function(id, infix) {
      if (id && node.id !== id) {
        var code;
        if (node.id === '(end)') {
          code = "S0203";
        } else {
          code = "S0202";
        }
        var err = {
          code: code,
          position: node.position,
          token: node.value,
          value: id
        };
        return handleError(err);
      }
      var next_token = lexer(infix);
      if (next_token === null) {
        node = symbol_table["(end)"];
        node.position = source.length;
        return node;
      }
      var value = next_token.value;
      var type = next_token.type;
      var symbol;
      switch (type) {
        case 'name':
        case 'variable':
          symbol = symbol_table["(name)"];
          break;
        case 'operator':
          symbol = symbol_table[value];
          if (!symbol) {
            return handleError({
              code: "S0204",
              stack: (new Error()).stack,
              position: next_token.position,
              token: value
            });
          }
          break;
        case 'string':
        case 'number':
        case 'value':
          symbol = symbol_table["(literal)"];
          break;
        case 'regex':
          type = "regex";
          symbol = symbol_table["(regex)"];
          break;
        default:
          return handleError({
            code: "S0205",
            stack: (new Error()).stack,
            position: next_token.position,
            token: value
          });
      }
      node = Object.create(symbol);
      node.value = value;
      node.type = type;
      node.position = next_token.position;
      return node;
    };
    var expression = function(rbp) {
      var left;
      var t = node;
      advance(null, true);
      left = t.nud();
      while (rbp < node.lbp) {
        t = node;
        advance();
        left = t.led(left);
      }
      return left;
    };
    var terminal = function(id) {
      var s = symbol(id, 0);
      s.nud = function() {
        return this;
      };
    };
    var infix = function(id, bp, led) {
      var bindingPower = bp || operators[id];
      var s = symbol(id, bindingPower);
      s.led = led || function(left) {
        this.lhs = left;
        this.rhs = expression(bindingPower);
        this.type = "binary";
        return this;
      };
      return s;
    };
    var infixr = function(id, bp, led) {
      var s = symbol(id, bp);
      s.led = led;
      return s;
    };
    var prefix = function(id, nud) {
      var s = symbol(id);
      s.nud = nud || function() {
        this.expression = expression(70);
        this.type = "unary";
        return this;
      };
      return s;
    };
    terminal("(end)");
    terminal("(name)");
    terminal("(literal)");
    terminal("(regex)");
    symbol(":");
    symbol(";");
    symbol(",");
    symbol(")");
    symbol("]");
    symbol("}");
    symbol("..");
    infix(".");
    infix("+");
    infix("-");
    infix("*");
    infix("/");
    infix("%");
    infix("=");
    infix("<");
    infix(">");
    infix("!=");
    infix("<=");
    infix(">=");
    infix("&");
    infix("and");
    infix("or");
    infix("in");
    terminal("and");
    terminal("or");
    terminal("in");
    prefix("-");
    infix("~>");
    infixr("(error)", 10, function(left) {
      this.lhs = left;
      this.error = node.error;
      this.remaining = remainingTokens();
      this.type = 'error';
      return this;
    });
    prefix('*', function() {
      this.type = "wildcard";
      return this;
    });
    prefix('**', function() {
      this.type = "descendant";
      return this;
    });
    infix("(", operators['('], function(left) {
      this.procedure = left;
      this.type = 'function';
      this.arguments = [];
      if (node.id !== ')') {
        for (; ; ) {
          if (node.type === 'operator' && node.id === '?') {
            this.type = 'partial';
            this.arguments.push(node);
            advance('?');
          } else {
            this.arguments.push(expression(0));
          }
          if (node.id !== ',')
            break;
          advance(',');
        }
      }
      advance(")", true);
      if (left.type === 'name' && (left.value === 'function' || left.value === '\u03BB')) {
        this.arguments.forEach(function(arg, index) {
          if (arg.type !== 'variable') {
            return handleError({
              code: "S0208",
              stack: (new Error()).stack,
              position: arg.position,
              token: arg.value,
              value: index + 1
            });
          }
        });
        this.type = 'lambda';
        if (node.id === '<') {
          var sigPos = node.position;
          var depth = 1;
          var sig = '<';
          while (depth > 0 && node.id !== '{' && node.id !== '(end)') {
            var tok = advance();
            if (tok.id === '>') {
              depth--;
            } else if (tok.id === '<') {
              depth++;
            }
            sig += tok.value;
          }
          advance('>');
          try {
            this.signature = parseSignature(sig);
          } catch (err) {
            err.position = sigPos + err.offset;
            return handleError(err);
          }
        }
        advance('{');
        this.body = expression(0);
        advance('}');
      }
      return this;
    });
    prefix("(", function() {
      var expressions = [];
      while (node.id !== ")") {
        expressions.push(expression(0));
        if (node.id !== ";") {
          break;
        }
        advance(";");
      }
      advance(")", true);
      this.type = 'block';
      this.expressions = expressions;
      return this;
    });
    prefix("[", function() {
      var a = [];
      if (node.id !== "]") {
        for (; ; ) {
          var item = expression(0);
          if (node.id === "..") {
            var range = {
              type: "binary",
              value: "..",
              position: node.position,
              lhs: item
            };
            advance("..");
            range.rhs = expression(0);
            item = range;
          }
          a.push(item);
          if (node.id !== ",") {
            break;
          }
          advance(",");
        }
      }
      advance("]", true);
      this.expressions = a;
      this.type = "unary";
      return this;
    });
    infix("[", operators['['], function(left) {
      if (node.id === "]") {
        var step = left;
        while (step && step.type === 'binary' && step.value === '[') {
          step = step.lhs;
        }
        step.keepArray = true;
        advance("]");
        return left;
      } else {
        this.lhs = left;
        this.rhs = expression(operators[']']);
        this.type = 'binary';
        advance("]", true);
        return this;
      }
    });
    infix("^", operators['^'], function(left) {
      advance("(");
      var terms = [];
      for (; ; ) {
        var term = {descending: false};
        if (node.id === "<") {
          advance("<");
        } else if (node.id === ">") {
          term.descending = true;
          advance(">");
        } else {}
        term.expression = expression(0);
        terms.push(term);
        if (node.id !== ",") {
          break;
        }
        advance(",");
      }
      advance(")");
      this.lhs = left;
      this.rhs = terms;
      this.type = 'binary';
      return this;
    });
    var objectParser = function(left) {
      var a = [];
      if (node.id !== "}") {
        for (; ; ) {
          var n = expression(0);
          advance(":");
          var v = expression(0);
          a.push([n, v]);
          if (node.id !== ",") {
            break;
          }
          advance(",");
        }
      }
      advance("}", true);
      if (typeof left === 'undefined') {
        this.lhs = a;
        this.type = "unary";
      } else {
        this.lhs = left;
        this.rhs = a;
        this.type = 'binary';
      }
      return this;
    };
    prefix("{", objectParser);
    infix("{", operators['{'], objectParser);
    infixr(":=", operators[':='], function(left) {
      if (left.type !== 'variable') {
        return handleError({
          code: "S0212",
          stack: (new Error()).stack,
          position: left.position,
          token: left.value
        });
      }
      this.lhs = left;
      this.rhs = expression(operators[':='] - 1);
      this.type = "binary";
      return this;
    });
    infix("?", operators['?'], function(left) {
      this.type = 'condition';
      this.condition = left;
      this.then = expression(0);
      if (node.id === ':') {
        advance(":");
        this.else = expression(0);
      }
      return this;
    });
    prefix("|", function() {
      this.type = 'transform';
      this.pattern = expression(0);
      advance('|');
      this.update = expression(0);
      if (node.id === ',') {
        advance(',');
        this.delete = expression(0);
      }
      advance('|');
      return this;
    });
    var tail_call_optimize = function(expr) {
      var result;
      if (expr.type === 'function' && !expr.predicate) {
        var thunk = {
          type: 'lambda',
          thunk: true,
          arguments: [],
          position: expr.position
        };
        thunk.body = expr;
        result = thunk;
      } else if (expr.type === 'condition') {
        expr.then = tail_call_optimize(expr.then);
        if (typeof expr.else !== 'undefined') {
          expr.else = tail_call_optimize(expr.else);
        }
        result = expr;
      } else if (expr.type === 'block') {
        var length = expr.expressions.length;
        if (length > 0) {
          expr.expressions[length - 1] = tail_call_optimize(expr.expressions[length - 1]);
        }
        result = expr;
      } else {
        result = expr;
      }
      return result;
    };
    var ast_optimize = function(expr) {
      var result;
      switch (expr.type) {
        case 'binary':
          switch (expr.value) {
            case '.':
              var lstep = ast_optimize(expr.lhs);
              result = {
                type: 'path',
                steps: []
              };
              if (lstep.type === 'path') {
                Array.prototype.push.apply(result.steps, lstep.steps);
              } else {
                result.steps = [lstep];
              }
              var rest = ast_optimize(expr.rhs);
              if (rest.type === 'function' && rest.procedure.type === 'path' && rest.procedure.steps.length === 1 && rest.procedure.steps[0].type === 'name' && result.steps[result.steps.length - 1].type === 'function') {
                result.steps[result.steps.length - 1].nextFunction = rest.procedure.steps[0].value;
              }
              if (rest.type !== 'path') {
                rest = {
                  type: 'path',
                  steps: [rest]
                };
              }
              Array.prototype.push.apply(result.steps, rest.steps);
              result.steps.filter(function(step) {
                if (step.type === 'number' || step.type === 'value') {
                  throw {
                    code: "S0213",
                    stack: (new Error()).stack,
                    position: step.position,
                    value: step.value
                  };
                }
                return step.type === 'string';
              }).forEach(function(lit) {
                lit.type = 'name';
              });
              if (result.steps.filter(function(step) {
                return step.keepArray === true;
              }).length > 0) {
                result.keepSingletonArray = true;
              }
              var firststep = result.steps[0];
              if (firststep.type === 'unary' && firststep.value === '[') {
                firststep.consarray = true;
              }
              var laststep = result.steps[result.steps.length - 1];
              if (laststep.type === 'unary' && laststep.value === '[') {
                laststep.consarray = true;
              }
              break;
            case '[':
              result = ast_optimize(expr.lhs);
              var step = result;
              if (result.type === 'path') {
                step = result.steps[result.steps.length - 1];
              }
              if (typeof step.group !== 'undefined') {
                throw {
                  code: "S0209",
                  stack: (new Error()).stack,
                  position: expr.position
                };
              }
              if (typeof step.predicate === 'undefined') {
                step.predicate = [];
              }
              step.predicate.push(ast_optimize(expr.rhs));
              break;
            case '{':
              result = ast_optimize(expr.lhs);
              if (typeof result.group !== 'undefined') {
                throw {
                  code: "S0210",
                  stack: (new Error()).stack,
                  position: expr.position
                };
              }
              result.group = {
                lhs: expr.rhs.map(function(pair) {
                  return [ast_optimize(pair[0]), ast_optimize(pair[1])];
                }),
                position: expr.position
              };
              break;
            case '^':
              result = {
                type: 'sort',
                value: expr.value,
                position: expr.position,
                consarray: true
              };
              result.lhs = ast_optimize(expr.lhs);
              result.rhs = expr.rhs.map(function(terms) {
                return {
                  descending: terms.descending,
                  expression: ast_optimize(terms.expression)
                };
              });
              break;
            case ':=':
              result = {
                type: 'bind',
                value: expr.value,
                position: expr.position
              };
              result.lhs = ast_optimize(expr.lhs);
              result.rhs = ast_optimize(expr.rhs);
              break;
            case '~>':
              result = {
                type: 'apply',
                value: expr.value,
                position: expr.position
              };
              result.lhs = ast_optimize(expr.lhs);
              result.rhs = ast_optimize(expr.rhs);
              break;
            default:
              result = {
                type: expr.type,
                value: expr.value,
                position: expr.position
              };
              result.lhs = ast_optimize(expr.lhs);
              result.rhs = ast_optimize(expr.rhs);
          }
          break;
        case 'unary':
          result = {
            type: expr.type,
            value: expr.value,
            position: expr.position
          };
          if (expr.value === '[') {
            result.expressions = expr.expressions.map(function(item) {
              return ast_optimize(item);
            });
          } else if (expr.value === '{') {
            result.lhs = expr.lhs.map(function(pair) {
              return [ast_optimize(pair[0]), ast_optimize(pair[1])];
            });
          } else {
            result.expression = ast_optimize(expr.expression);
            if (expr.value === '-' && result.expression.type === 'number') {
              result = result.expression;
              result.value = -result.value;
            }
          }
          break;
        case 'function':
        case 'partial':
          result = {
            type: expr.type,
            name: expr.name,
            value: expr.value,
            position: expr.position
          };
          result.arguments = expr.arguments.map(function(arg) {
            return ast_optimize(arg);
          });
          result.procedure = ast_optimize(expr.procedure);
          break;
        case 'lambda':
          result = {
            type: expr.type,
            arguments: expr.arguments,
            signature: expr.signature,
            position: expr.position
          };
          var body = ast_optimize(expr.body);
          result.body = tail_call_optimize(body);
          break;
        case 'condition':
          result = {
            type: expr.type,
            position: expr.position
          };
          result.condition = ast_optimize(expr.condition);
          result.then = ast_optimize(expr.then);
          if (typeof expr.else !== 'undefined') {
            result.else = ast_optimize(expr.else);
          }
          break;
        case 'transform':
          result = {
            type: expr.type,
            position: expr.position
          };
          result.pattern = ast_optimize(expr.pattern);
          result.update = ast_optimize(expr.update);
          if (typeof expr.delete !== 'undefined') {
            result.delete = ast_optimize(expr.delete);
          }
          break;
        case 'block':
          result = {
            type: expr.type,
            position: expr.position
          };
          result.expressions = expr.expressions.map(function(item) {
            var part = ast_optimize(item);
            if (part.consarray || (part.type === 'path' && part.steps[0].consarray)) {
              result.consarray = true;
            }
            return part;
          });
          break;
        case 'name':
          result = {
            type: 'path',
            steps: [expr]
          };
          if (expr.keepArray) {
            result.keepSingletonArray = true;
          }
          break;
        case 'string':
        case 'number':
        case 'value':
        case 'wildcard':
        case 'descendant':
        case 'variable':
        case 'regex':
          result = expr;
          break;
        case 'operator':
          if (expr.value === 'and' || expr.value === 'or' || expr.value === 'in') {
            expr.type = 'name';
            result = ast_optimize(expr);
          } else if (expr.value === '?') {
            result = expr;
          } else {
            throw {
              code: "S0201",
              stack: (new Error()).stack,
              position: expr.position,
              token: expr.value
            };
          }
          break;
        case 'error':
          result = expr;
          if (expr.lhs) {
            result = ast_optimize(expr.lhs);
          }
          break;
        default:
          var code = "S0206";
          if (expr.id === '(end)') {
            code = "S0207";
          }
          var err = {
            code: code,
            position: expr.position,
            token: expr.value
          };
          if (recover) {
            errors.push(err);
            return {
              type: 'error',
              error: err
            };
          } else {
            err.stack = (new Error()).stack;
            throw err;
          }
      }
      if (expr.keepArray) {
        result.keepArray = true;
      }
      return result;
    };
    lexer = tokenizer(source);
    advance();
    var expr = expression(0);
    if (node.id !== '(end)') {
      var err = {
        code: "S0201",
        position: node.position,
        token: node.value
      };
      handleError(err);
    }
    expr = ast_optimize(expr);
    if (errors.length > 0) {
      expr.errors = errors;
    }
    return expr;
  };
  return parser;
})();
module.exports = parser;
