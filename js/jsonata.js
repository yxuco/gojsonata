"use strict";
var datetime = require('./datetime');
var fn = require('./functions');
var utils = require('./utils');
var parser = require('./parser');
var parseSignature = require('./signature');
var jsonata = (function() {
  'use strict';
  var $__3 = $traceurRuntime.initGeneratorFunction(evaluate),
      $__55 = $traceurRuntime.initGeneratorFunction(evaluatePath),
      $__66 = $traceurRuntime.initGeneratorFunction(evaluateStep),
      $__69 = $traceurRuntime.initGeneratorFunction(applyPredicates),
      $__74 = $traceurRuntime.initGeneratorFunction(evaluateFilter),
      $__77 = $traceurRuntime.initGeneratorFunction(evaluateBinary),
      $__82 = $traceurRuntime.initGeneratorFunction(evaluateUnary),
      $__94 = $traceurRuntime.initGeneratorFunction(evaluateGroupExpression),
      $__103 = $traceurRuntime.initGeneratorFunction(evaluateBindExpression),
      $__106 = $traceurRuntime.initGeneratorFunction(evaluateCondition),
      $__119 = $traceurRuntime.initGeneratorFunction(evaluateBlock),
      $__126 = $traceurRuntime.initGeneratorFunction(evaluateSortExpression),
      $__127 = $traceurRuntime.initGeneratorFunction(evaluateApplyExpression),
      $__171 = $traceurRuntime.initGeneratorFunction(evaluateFunction),
      $__172 = $traceurRuntime.initGeneratorFunction(apply),
      $__173 = $traceurRuntime.initGeneratorFunction(applyInner),
      $__219 = $traceurRuntime.initGeneratorFunction(evaluatePartialApplication),
      $__233 = $traceurRuntime.initGeneratorFunction(applyProcedure),
      $__245 = $traceurRuntime.initGeneratorFunction(applyNativeFunction),
      $__249 = $traceurRuntime.initGeneratorFunction(functionEval);
  var isNumeric = utils.isNumeric;
  var isArrayOfStrings = utils.isArrayOfStrings;
  var isArrayOfNumbers = utils.isArrayOfNumbers;
  var createSequence = utils.createSequence;
  var isSequence = utils.isSequence;
  var isFunction = utils.isFunction;
  var isLambda = utils.isLambda;
  var isIterable = utils.isIterable;
  var getFunctionArity = utils.getFunctionArity;
  var staticFrame = createFrame(null);
  function evaluate(expr, input, environment) {
    var result,
        entryCallback,
        exitCallback,
        $__4,
        $__5,
        $__6,
        $__7,
        $__8,
        $__9,
        $__10,
        $__11,
        $__12,
        $__13,
        $__14,
        $__15,
        $__16,
        $__17,
        $__18,
        $__19,
        $__20,
        $__21,
        $__22,
        $__23,
        $__24,
        $__25,
        $__26,
        $__27,
        $__28,
        $__29,
        $__30,
        $__31,
        $__32,
        $__33,
        $__34,
        $__35,
        $__36,
        $__37,
        $__38,
        $__39,
        $__40,
        $__41,
        $__42,
        $__43,
        $__44,
        $__45,
        $__46,
        $__47,
        $__48,
        $__49,
        $__50,
        $__51,
        $__52,
        $__53,
        $__54;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            entryCallback = environment.lookup('__evaluate_entry');
            if (entryCallback) {
              entryCallback(expr, input, environment);
            }
            $ctx.state = 289;
            break;
          case 289:
            switch (expr.type) {
              default:
                $ctx.state = 234;
                break;
              case 'path':
                $ctx.state = 15;
                break;
              case 'binary':
                $ctx.state = 35;
                break;
              case 'unary':
                $ctx.state = 55;
                break;
              case 'name':
                $ctx.state = 63;
                break;
              case 'string':
                $ctx.state = 67;
                break;
              case 'number':
                $ctx.state = 67;
                break;
              case 'value':
                $ctx.state = 67;
                break;
              case 'wildcard':
                $ctx.state = 71;
                break;
              case 'descendant':
                $ctx.state = 75;
                break;
              case 'condition':
                $ctx.state = 91;
                break;
              case 'block':
                $ctx.state = 111;
                break;
              case 'bind':
                $ctx.state = 131;
                break;
              case 'regex':
                $ctx.state = 139;
                break;
              case 'function':
                $ctx.state = 155;
                break;
              case 'variable':
                $ctx.state = 163;
                break;
              case 'lambda':
                $ctx.state = 167;
                break;
              case 'partial':
                $ctx.state = 183;
                break;
              case 'apply':
                $ctx.state = 203;
                break;
              case 'sort':
                $ctx.state = 223;
                break;
              case 'transform':
                $ctx.state = 231;
                break;
            }
            break;
          case 14:
            result = $__5;
            $ctx.state = 234;
            break;
          case 10:
            $__5 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 2:
            $ctx.state = 12;
            return $__7.value;
          case 3:
            $ctx.sent = $__7.value;
            $ctx.state = 10;
            break;
          case 9:
            $ctx.state = ($__7.done) ? 3 : 2;
            break;
          case 12:
            $__7 = $__6[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 16:
            $__6 = $ctx.wrapYieldStar($__4[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 15:
            $__4 = evaluatePath(expr, input, environment);
            $ctx.state = 16;
            break;
          case 34:
            result = $__9;
            $ctx.state = 234;
            break;
          case 30:
            $__9 = $ctx.sentIgnoreThrow;
            $ctx.state = 34;
            break;
          case 22:
            $ctx.state = 32;
            return $__11.value;
          case 23:
            $ctx.sent = $__11.value;
            $ctx.state = 30;
            break;
          case 29:
            $ctx.state = ($__11.done) ? 23 : 22;
            break;
          case 32:
            $__11 = $__10[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 29;
            break;
          case 36:
            $__10 = $ctx.wrapYieldStar($__8[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 32;
            break;
          case 35:
            $__8 = evaluateBinary(expr, input, environment);
            $ctx.state = 36;
            break;
          case 54:
            result = $__13;
            $ctx.state = 234;
            break;
          case 50:
            $__13 = $ctx.sentIgnoreThrow;
            $ctx.state = 54;
            break;
          case 42:
            $ctx.state = 52;
            return $__15.value;
          case 43:
            $ctx.sent = $__15.value;
            $ctx.state = 50;
            break;
          case 49:
            $ctx.state = ($__15.done) ? 43 : 42;
            break;
          case 52:
            $__15 = $__14[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 49;
            break;
          case 56:
            $__14 = $ctx.wrapYieldStar($__12[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 52;
            break;
          case 55:
            $__12 = evaluateUnary(expr, input, environment);
            $ctx.state = 56;
            break;
          case 63:
            result = evaluateName(expr, input, environment);
            $ctx.state = 234;
            break;
          case 67:
            result = evaluateLiteral(expr, input, environment);
            $ctx.state = 234;
            break;
          case 71:
            result = evaluateWildcard(expr, input, environment);
            $ctx.state = 234;
            break;
          case 75:
            result = evaluateDescendants(expr, input, environment);
            $ctx.state = 234;
            break;
          case 90:
            result = $__17;
            $ctx.state = 234;
            break;
          case 86:
            $__17 = $ctx.sentIgnoreThrow;
            $ctx.state = 90;
            break;
          case 78:
            $ctx.state = 88;
            return $__19.value;
          case 79:
            $ctx.sent = $__19.value;
            $ctx.state = 86;
            break;
          case 85:
            $ctx.state = ($__19.done) ? 79 : 78;
            break;
          case 88:
            $__19 = $__18[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 85;
            break;
          case 92:
            $__18 = $ctx.wrapYieldStar($__16[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 88;
            break;
          case 91:
            $__16 = evaluateCondition(expr, input, environment);
            $ctx.state = 92;
            break;
          case 110:
            result = $__21;
            $ctx.state = 234;
            break;
          case 106:
            $__21 = $ctx.sentIgnoreThrow;
            $ctx.state = 110;
            break;
          case 98:
            $ctx.state = 108;
            return $__23.value;
          case 99:
            $ctx.sent = $__23.value;
            $ctx.state = 106;
            break;
          case 105:
            $ctx.state = ($__23.done) ? 99 : 98;
            break;
          case 108:
            $__23 = $__22[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 105;
            break;
          case 112:
            $__22 = $ctx.wrapYieldStar($__20[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 108;
            break;
          case 111:
            $__20 = evaluateBlock(expr, input, environment);
            $ctx.state = 112;
            break;
          case 130:
            result = $__25;
            $ctx.state = 234;
            break;
          case 126:
            $__25 = $ctx.sentIgnoreThrow;
            $ctx.state = 130;
            break;
          case 118:
            $ctx.state = 128;
            return $__27.value;
          case 119:
            $ctx.sent = $__27.value;
            $ctx.state = 126;
            break;
          case 125:
            $ctx.state = ($__27.done) ? 119 : 118;
            break;
          case 128:
            $__27 = $__26[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 125;
            break;
          case 132:
            $__26 = $ctx.wrapYieldStar($__24[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 128;
            break;
          case 131:
            $__24 = evaluateBindExpression(expr, input, environment);
            $ctx.state = 132;
            break;
          case 139:
            result = evaluateRegex(expr, input, environment);
            $ctx.state = 234;
            break;
          case 154:
            result = $__29;
            $ctx.state = 234;
            break;
          case 150:
            $__29 = $ctx.sentIgnoreThrow;
            $ctx.state = 154;
            break;
          case 142:
            $ctx.state = 152;
            return $__31.value;
          case 143:
            $ctx.sent = $__31.value;
            $ctx.state = 150;
            break;
          case 149:
            $ctx.state = ($__31.done) ? 143 : 142;
            break;
          case 152:
            $__31 = $__30[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 149;
            break;
          case 156:
            $__30 = $ctx.wrapYieldStar($__28[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 152;
            break;
          case 155:
            $__28 = evaluateFunction(expr, input, environment);
            $ctx.state = 156;
            break;
          case 163:
            result = evaluateVariable(expr, input, environment);
            $ctx.state = 234;
            break;
          case 167:
            result = evaluateLambda(expr, input, environment);
            $ctx.state = 234;
            break;
          case 182:
            result = $__33;
            $ctx.state = 234;
            break;
          case 178:
            $__33 = $ctx.sentIgnoreThrow;
            $ctx.state = 182;
            break;
          case 170:
            $ctx.state = 180;
            return $__35.value;
          case 171:
            $ctx.sent = $__35.value;
            $ctx.state = 178;
            break;
          case 177:
            $ctx.state = ($__35.done) ? 171 : 170;
            break;
          case 180:
            $__35 = $__34[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 177;
            break;
          case 184:
            $__34 = $ctx.wrapYieldStar($__32[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 180;
            break;
          case 183:
            $__32 = evaluatePartialApplication(expr, input, environment);
            $ctx.state = 184;
            break;
          case 202:
            result = $__37;
            $ctx.state = 234;
            break;
          case 198:
            $__37 = $ctx.sentIgnoreThrow;
            $ctx.state = 202;
            break;
          case 190:
            $ctx.state = 200;
            return $__39.value;
          case 191:
            $ctx.sent = $__39.value;
            $ctx.state = 198;
            break;
          case 197:
            $ctx.state = ($__39.done) ? 191 : 190;
            break;
          case 200:
            $__39 = $__38[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 197;
            break;
          case 204:
            $__38 = $ctx.wrapYieldStar($__36[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 200;
            break;
          case 203:
            $__36 = evaluateApplyExpression(expr, input, environment);
            $ctx.state = 204;
            break;
          case 222:
            result = $__41;
            $ctx.state = 234;
            break;
          case 218:
            $__41 = $ctx.sentIgnoreThrow;
            $ctx.state = 222;
            break;
          case 210:
            $ctx.state = 220;
            return $__43.value;
          case 211:
            $ctx.sent = $__43.value;
            $ctx.state = 218;
            break;
          case 217:
            $ctx.state = ($__43.done) ? 211 : 210;
            break;
          case 220:
            $__43 = $__42[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 217;
            break;
          case 224:
            $__42 = $ctx.wrapYieldStar($__40[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 220;
            break;
          case 223:
            $__40 = evaluateSortExpression(expr, input, environment);
            $ctx.state = 224;
            break;
          case 231:
            result = evaluateTransformExpression(expr, input, environment);
            $ctx.state = 234;
            break;
          case 234:
            if (environment.async && (typeof result === 'undefined' || result === null || typeof result.then !== 'function')) {
              result = Promise.resolve(result);
            }
            $ctx.state = 291;
            break;
          case 291:
            $ctx.state = (environment.async && typeof result.then === 'function' && expr.nextFunction && typeof result[expr.nextFunction] === 'function') ? 246 : 239;
            break;
          case 239:
            $ctx.state = 240;
            return result;
          case 240:
            $__44 = $ctx.sent;
            $ctx.state = 242;
            break;
          case 242:
            result = $__44;
            $ctx.state = 246;
            break;
          case 246:
            $ctx.state = (expr.hasOwnProperty('predicate')) ? 262 : 265;
            break;
          case 262:
            $__45 = expr.predicate;
            $__46 = applyPredicates($__45, result, environment);
            $ctx.state = 263;
            break;
          case 263:
            $__48 = $ctx.wrapYieldStar($__46[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 259;
            break;
          case 259:
            $__49 = $__48[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 256;
            break;
          case 256:
            $ctx.state = ($__49.done) ? 250 : 249;
            break;
          case 250:
            $ctx.sent = $__49.value;
            $ctx.state = 257;
            break;
          case 249:
            $ctx.state = 259;
            return $__49.value;
          case 257:
            $__47 = $ctx.sentIgnoreThrow;
            $ctx.state = 261;
            break;
          case 261:
            result = $__47;
            $ctx.state = 265;
            break;
          case 265:
            $ctx.state = (expr.hasOwnProperty('group')) ? 281 : 284;
            break;
          case 281:
            $__50 = expr.group;
            $__51 = evaluateGroupExpression($__50, result, environment);
            $ctx.state = 282;
            break;
          case 282:
            $__53 = $ctx.wrapYieldStar($__51[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 278;
            break;
          case 278:
            $__54 = $__53[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 275;
            break;
          case 275:
            $ctx.state = ($__54.done) ? 269 : 268;
            break;
          case 269:
            $ctx.sent = $__54.value;
            $ctx.state = 276;
            break;
          case 268:
            $ctx.state = 278;
            return $__54.value;
          case 276:
            $__52 = $ctx.sentIgnoreThrow;
            $ctx.state = 280;
            break;
          case 280:
            result = $__52;
            $ctx.state = 284;
            break;
          case 284:
            exitCallback = environment.lookup('__evaluate_exit');
            if (exitCallback) {
              exitCallback(expr, input, environment, result);
            }
            if (result && isSequence(result)) {
              if (expr.keepArray) {
                result.keepSingleton = true;
              }
              if (result.length === 0) {
                result = undefined;
              } else if (result.length === 1) {
                result = result.keepSingleton ? result : result[0];
              }
            }
            $ctx.state = 293;
            break;
          case 293:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__3, this);
  }
  function evaluatePath(expr, input, environment) {
    var inputSequence,
        resultSequence,
        ii,
        step,
        $__56,
        $__57,
        $__58,
        $__59,
        $__60,
        $__61,
        $__62,
        $__63,
        $__64,
        $__65;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            if (expr.steps[0].type === 'variable') {
              inputSequence = createSequence(input);
            } else if (Array.isArray(input)) {
              inputSequence = input;
            } else {
              inputSequence = createSequence(input);
            }
            $ctx.state = 53;
            break;
          case 53:
            ii = 0;
            $ctx.state = 49;
            break;
          case 49:
            $ctx.state = (ii < expr.steps.length) ? 43 : 47;
            break;
          case 46:
            ii++;
            $ctx.state = 49;
            break;
          case 43:
            step = expr.steps[ii];
            $ctx.state = 44;
            break;
          case 44:
            $ctx.state = (ii === 0 && step.consarray) ? 15 : 35;
            break;
          case 15:
            $__56 = evaluate(step, inputSequence, environment);
            $ctx.state = 16;
            break;
          case 16:
            $__58 = $ctx.wrapYieldStar($__56[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__59 = $__58[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__59.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__59.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__59.value;
          case 10:
            $__57 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            resultSequence = $__57;
            $ctx.state = 18;
            break;
          case 18:
            if (!Array.isArray(resultSequence)) {
              resultSequence = createSequence(resultSequence);
            }
            $ctx.state = 20;
            break;
          case 35:
            $__60 = expr.steps;
            $__61 = $__60.length;
            $__62 = evaluateStep(step, inputSequence, environment, ii === $__61 - 1);
            $ctx.state = 36;
            break;
          case 36:
            $__64 = $ctx.wrapYieldStar($__62[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 32;
            break;
          case 32:
            $__65 = $__64[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 29;
            break;
          case 29:
            $ctx.state = ($__65.done) ? 23 : 22;
            break;
          case 23:
            $ctx.sent = $__65.value;
            $ctx.state = 30;
            break;
          case 22:
            $ctx.state = 32;
            return $__65.value;
          case 30:
            $__63 = $ctx.sentIgnoreThrow;
            $ctx.state = 34;
            break;
          case 34:
            resultSequence = $__63;
            $ctx.state = 20;
            break;
          case 20:
            $ctx.state = (typeof resultSequence === 'undefined' || resultSequence.length === 0) ? 47 : 41;
            break;
          case 41:
            inputSequence = resultSequence;
            $ctx.state = 46;
            break;
          case 47:
            if (expr.keepSingletonArray) {
              resultSequence.keepSingleton = true;
            }
            $ctx.state = 55;
            break;
          case 55:
            $ctx.returnValue = resultSequence;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__55, this);
  }
  function evaluateStep(expr, input, environment, lastStep) {
    var result,
        ii,
        res,
        resultSequence,
        $__67,
        $__68;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            result = createSequence();
            $ctx.state = 23;
            break;
          case 23:
            ii = 0;
            $ctx.state = 19;
            break;
          case 19:
            $ctx.state = (ii < input.length) ? 11 : 17;
            break;
          case 16:
            ii++;
            $ctx.state = 19;
            break;
          case 11:
            $__67 = $ctx.wrapYieldStar(evaluate(expr, input[ii], environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__68 = $__67[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__68.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__68.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__68.value;
          case 10:
            res = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            if (typeof res !== 'undefined') {
              result.push(res);
            }
            $ctx.state = 16;
            break;
          case 17:
            resultSequence = createSequence();
            if (lastStep && result.length === 1 && Array.isArray(result[0]) && !isSequence(result[0])) {
              resultSequence = result[0];
            } else {
              result.forEach(function(res) {
                if (!Array.isArray(res) || res.cons || res.keepSingleton) {
                  resultSequence.push(res);
                } else {
                  Array.prototype.push.apply(resultSequence, res);
                }
              });
            }
            $ctx.state = 25;
            break;
          case 25:
            $ctx.returnValue = resultSequence;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__66, this);
  }
  function applyPredicates(predicates, input, environment) {
    var inputSequence,
        results,
        ii,
        predicate,
        index,
        $__70,
        $__71,
        $__72,
        $__73;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            inputSequence = input;
            results = createSequence();
            $ctx.state = 32;
            break;
          case 32:
            ii = 0;
            $ctx.state = 28;
            break;
          case 28:
            $ctx.state = (ii < predicates.length) ? 22 : 26;
            break;
          case 25:
            ii++;
            $ctx.state = 28;
            break;
          case 22:
            predicate = predicates[ii];
            if (!Array.isArray(inputSequence)) {
              inputSequence = createSequence(inputSequence);
            }
            results = createSequence();
            $ctx.state = 23;
            break;
          case 23:
            $ctx.state = (predicate.type === 'number') ? 19 : 15;
            break;
          case 19:
            index = Math.floor(predicate.value);
            if (index < 0) {
              index = inputSequence.length + index;
            }
            results = inputSequence[index];
            $ctx.state = 20;
            break;
          case 15:
            $__70 = evaluateFilter(predicate, inputSequence, environment);
            $ctx.state = 16;
            break;
          case 16:
            $__72 = $ctx.wrapYieldStar($__70[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__73 = $__72[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__73.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__73.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__73.value;
          case 10:
            $__71 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            results = $__71;
            $ctx.state = 20;
            break;
          case 20:
            inputSequence = results;
            $ctx.state = 25;
            break;
          case 26:
            $ctx.returnValue = results;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__69, this);
  }
  function evaluateFilter(predicate, input, environment) {
    var results,
        index,
        item,
        res,
        $__75,
        $__76;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            results = createSequence();
            $ctx.state = 25;
            break;
          case 25:
            index = 0;
            $ctx.state = 21;
            break;
          case 21:
            $ctx.state = (index < input.length) ? 15 : 19;
            break;
          case 18:
            index++;
            $ctx.state = 21;
            break;
          case 15:
            item = input[index];
            $ctx.state = 16;
            break;
          case 16:
            $__75 = $ctx.wrapYieldStar(evaluate(predicate, item, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__76 = $__75[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__76.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__76.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__76.value;
          case 10:
            res = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            if (isNumeric(res)) {
              res = [res];
            }
            if (isArrayOfNumbers(res)) {
              res.forEach(function(ires) {
                var ii = Math.floor(ires);
                if (ii < 0) {
                  ii = input.length + ii;
                }
                if (ii === index) {
                  results.push(item);
                }
              });
            } else if (fn.boolean(res)) {
              results.push(item);
            }
            $ctx.state = 18;
            break;
          case 19:
            $ctx.returnValue = results;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__74, this);
  }
  function evaluateBinary(expr, input, environment) {
    var result,
        lhs,
        rhs,
        op,
        $__78,
        $__79,
        $__80,
        $__81,
        err;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__78 = $ctx.wrapYieldStar(evaluate(expr.lhs, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__79 = $__78[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__79.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__79.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__79.value;
          case 10:
            lhs = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            $__80 = $ctx.wrapYieldStar(evaluate(expr.rhs, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 26;
            break;
          case 26:
            $__81 = $__80[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 23;
            break;
          case 23:
            $ctx.state = ($__81.done) ? 17 : 16;
            break;
          case 17:
            $ctx.sent = $__81.value;
            $ctx.state = 24;
            break;
          case 16:
            $ctx.state = 26;
            return $__81.value;
          case 24:
            rhs = $ctx.sentIgnoreThrow;
            $ctx.state = 28;
            break;
          case 28:
            op = expr.value;
            $ctx.state = 89;
            break;
          case 89:
            $ctx.pushTry(77, null);
            $ctx.state = 80;
            break;
          case 80:
            switch (op) {
              default:
                $ctx.state = 58;
                break;
              case '+':
                $ctx.state = 31;
                break;
              case '-':
                $ctx.state = 31;
                break;
              case '*':
                $ctx.state = 31;
                break;
              case '/':
                $ctx.state = 31;
                break;
              case '%':
                $ctx.state = 31;
                break;
              case '=':
                $ctx.state = 35;
                break;
              case '!=':
                $ctx.state = 35;
                break;
              case '<':
                $ctx.state = 39;
                break;
              case '<=':
                $ctx.state = 39;
                break;
              case '>':
                $ctx.state = 39;
                break;
              case '>=':
                $ctx.state = 39;
                break;
              case '&':
                $ctx.state = 43;
                break;
              case 'and':
                $ctx.state = 47;
                break;
              case 'or':
                $ctx.state = 47;
                break;
              case '..':
                $ctx.state = 51;
                break;
              case 'in':
                $ctx.state = 55;
                break;
            }
            break;
          case 31:
            result = evaluateNumericExpression(lhs, rhs, op);
            $ctx.state = 58;
            break;
          case 35:
            result = evaluateEqualityExpression(lhs, rhs, op);
            $ctx.state = 58;
            break;
          case 39:
            result = evaluateComparisonExpression(lhs, rhs, op);
            $ctx.state = 58;
            break;
          case 43:
            result = evaluateStringConcat(lhs, rhs);
            $ctx.state = 58;
            break;
          case 47:
            result = evaluateBooleanExpression(lhs, rhs, op);
            $ctx.state = 58;
            break;
          case 51:
            result = evaluateRangeExpression(lhs, rhs);
            $ctx.state = 58;
            break;
          case 55:
            result = evaluateIncludesExpression(lhs, rhs);
            $ctx.state = 58;
            break;
          case 58:
            $ctx.popTry();
            $ctx.state = 82;
            break;
          case 77:
            $ctx.popTry();
            $ctx.maybeUncatchable();
            err = $ctx.storedException;
            $ctx.state = 83;
            break;
          case 83:
            err.position = expr.position;
            err.token = op;
            throw err;
            $ctx.state = 82;
            break;
          case 82:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__77, this);
  }
  function evaluateUnary(expr, input, environment) {
    var result,
        ii,
        item,
        value,
        $__83,
        $__84,
        $__85,
        $__86,
        $__87,
        $__88,
        $__89,
        $__90,
        $__91,
        $__92,
        $__93;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            switch (expr.value) {
              default:
                $ctx.state = 71;
                break;
              case '-':
                $ctx.state = 15;
                break;
              case '[':
                $ctx.state = 46;
                break;
              case '{':
                $ctx.state = 64;
                break;
            }
            break;
          case 18:
            if (typeof result === 'undefined') {
              result = undefined;
            } else if (isNumeric(result)) {
              result = -result;
            } else {
              throw {
                code: "D1002",
                stack: (new Error()).stack,
                position: expr.position,
                token: expr.value,
                value: result
              };
            }
            $ctx.state = 71;
            break;
          case 14:
            result = $__85;
            $ctx.state = 18;
            break;
          case 10:
            $__85 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 2:
            $ctx.state = 12;
            return $__87.value;
          case 3:
            $ctx.sent = $__87.value;
            $ctx.state = 10;
            break;
          case 9:
            $ctx.state = ($__87.done) ? 3 : 2;
            break;
          case 12:
            $__87 = $__86[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 16:
            $__86 = $ctx.wrapYieldStar($__84[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 15:
            $__83 = expr.expression;
            $__84 = evaluate($__83, input, environment);
            $ctx.state = 16;
            break;
          case 41:
            if (expr.consarray) {
              Object.defineProperty(result, 'cons', {
                enumerable: false,
                configurable: false,
                value: true
              });
            }
            $ctx.state = 71;
            break;
          case 36:
            if (typeof value !== 'undefined') {
              if (item.value === '[') {
                result.push(value);
              } else {
                result = fn.append(result, value);
              }
            }
            $ctx.state = 40;
            break;
          case 32:
            value = $ctx.sentIgnoreThrow;
            $ctx.state = 36;
            break;
          case 24:
            $ctx.state = 34;
            return $__89.value;
          case 25:
            $ctx.sent = $__89.value;
            $ctx.state = 32;
            break;
          case 31:
            $ctx.state = ($__89.done) ? 25 : 24;
            break;
          case 34:
            $__89 = $__88[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 31;
            break;
          case 38:
            $__88 = $ctx.wrapYieldStar(evaluate(item, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 34;
            break;
          case 37:
            item = expr.expressions[ii];
            $ctx.state = 38;
            break;
          case 40:
            ii++;
            $ctx.state = 43;
            break;
          case 43:
            $ctx.state = (ii < expr.expressions.length) ? 37 : 41;
            break;
          case 47:
            ii = 0;
            $ctx.state = 43;
            break;
          case 46:
            result = [];
            $ctx.state = 47;
            break;
          case 63:
            result = $__91;
            $ctx.state = 71;
            break;
          case 59:
            $__91 = $ctx.sentIgnoreThrow;
            $ctx.state = 63;
            break;
          case 51:
            $ctx.state = 61;
            return $__93.value;
          case 52:
            $ctx.sent = $__93.value;
            $ctx.state = 59;
            break;
          case 58:
            $ctx.state = ($__93.done) ? 52 : 51;
            break;
          case 61:
            $__93 = $__92[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 58;
            break;
          case 65:
            $__92 = $ctx.wrapYieldStar($__90[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 61;
            break;
          case 64:
            $__90 = evaluateGroupExpression(expr, input, environment);
            $ctx.state = 65;
            break;
          case 71:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__82, this);
  }
  function evaluateName(expr, input, environment) {
    return fn.lookup(input, expr.value);
  }
  function evaluateLiteral(expr) {
    return expr.value;
  }
  function evaluateWildcard(expr, input) {
    var results = createSequence();
    if (input !== null && (typeof input === 'undefined' ? 'undefined' : $traceurRuntime.typeof(input)) === 'object') {
      Object.keys(input).forEach(function(key) {
        var value = input[key];
        if (Array.isArray(value)) {
          value = flatten(value);
          results = fn.append(results, value);
        } else {
          results.push(value);
        }
      });
    }
    return results;
  }
  function flatten(arg, flattened) {
    if (typeof flattened === 'undefined') {
      flattened = [];
    }
    if (Array.isArray(arg)) {
      arg.forEach(function(item) {
        flatten(item, flattened);
      });
    } else {
      flattened.push(arg);
    }
    return flattened;
  }
  function evaluateDescendants(expr, input) {
    var result;
    var resultSequence = createSequence();
    if (typeof input !== 'undefined') {
      recurseDescendants(input, resultSequence);
      if (resultSequence.length === 1) {
        result = resultSequence[0];
      } else {
        result = resultSequence;
      }
    }
    return result;
  }
  function recurseDescendants(input, results) {
    if (!Array.isArray(input)) {
      results.push(input);
    }
    if (Array.isArray(input)) {
      input.forEach(function(member) {
        recurseDescendants(member, results);
      });
    } else if (input !== null && (typeof input === 'undefined' ? 'undefined' : $traceurRuntime.typeof(input)) === 'object') {
      Object.keys(input).forEach(function(key) {
        recurseDescendants(input[key], results);
      });
    }
  }
  function evaluateNumericExpression(lhs, rhs, op) {
    var result;
    if (typeof lhs !== 'undefined' && !isNumeric(lhs)) {
      throw {
        code: "T2001",
        stack: (new Error()).stack,
        value: lhs
      };
    }
    if (typeof rhs !== 'undefined' && !isNumeric(rhs)) {
      throw {
        code: "T2002",
        stack: (new Error()).stack,
        value: rhs
      };
    }
    if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
      return result;
    }
    switch (op) {
      case '+':
        result = lhs + rhs;
        break;
      case '-':
        result = lhs - rhs;
        break;
      case '*':
        result = lhs * rhs;
        break;
      case '/':
        result = lhs / rhs;
        break;
      case '%':
        result = lhs % rhs;
        break;
    }
    return result;
  }
  function evaluateEqualityExpression(lhs, rhs, op) {
    var result;
    var ltype = (typeof lhs === 'undefined' ? 'undefined' : $traceurRuntime.typeof(lhs));
    var rtype = (typeof rhs === 'undefined' ? 'undefined' : $traceurRuntime.typeof(rhs));
    if (ltype === 'undefined' || rtype === 'undefined') {
      return false;
    }
    switch (op) {
      case '=':
        result = lhs === rhs;
        break;
      case '!=':
        result = (lhs !== rhs);
        break;
    }
    return result;
  }
  function evaluateComparisonExpression(lhs, rhs, op) {
    var result;
    var ltype = (typeof lhs === 'undefined' ? 'undefined' : $traceurRuntime.typeof(lhs));
    var rtype = (typeof rhs === 'undefined' ? 'undefined' : $traceurRuntime.typeof(rhs));
    var lcomparable = (ltype === 'undefined' || ltype === 'string' || ltype === 'number');
    var rcomparable = (rtype === 'undefined' || rtype === 'string' || rtype === 'number');
    if (!lcomparable || !rcomparable) {
      throw {
        code: "T2010",
        stack: (new Error()).stack,
        value: !(ltype === 'string' || ltype === 'number') ? lhs : rhs
      };
    }
    if (ltype === 'undefined' || rtype === 'undefined') {
      return undefined;
    }
    if (ltype !== rtype) {
      throw {
        code: "T2009",
        stack: (new Error()).stack,
        value: lhs,
        value2: rhs
      };
    }
    switch (op) {
      case '<':
        result = lhs < rhs;
        break;
      case '<=':
        result = lhs <= rhs;
        break;
      case '>':
        result = lhs > rhs;
        break;
      case '>=':
        result = lhs >= rhs;
        break;
    }
    return result;
  }
  function evaluateIncludesExpression(lhs, rhs) {
    var result = false;
    if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
      return false;
    }
    if (!Array.isArray(rhs)) {
      rhs = [rhs];
    }
    for (var i = 0; i < rhs.length; i++) {
      if (rhs[i] === lhs) {
        result = true;
        break;
      }
    }
    return result;
  }
  function evaluateBooleanExpression(lhs, rhs, op) {
    var result;
    var lBool = fn.boolean(lhs);
    var rBool = fn.boolean(rhs);
    if (typeof lBool === 'undefined') {
      lBool = false;
    }
    if (typeof rBool === 'undefined') {
      rBool = false;
    }
    switch (op) {
      case 'and':
        result = lBool && rBool;
        break;
      case 'or':
        result = lBool || rBool;
        break;
    }
    return result;
  }
  function evaluateStringConcat(lhs, rhs) {
    var result;
    var lstr = '';
    var rstr = '';
    if (typeof lhs !== 'undefined') {
      lstr = fn.string(lhs);
    }
    if (typeof rhs !== 'undefined') {
      rstr = fn.string(rhs);
    }
    result = lstr.concat(rstr);
    return result;
  }
  function evaluateGroupExpression(expr, input, environment) {
    var result,
        groups,
        itemIndex,
        item,
        pairIndex,
        pair,
        key,
        entry,
        $__95,
        $__96,
        $__97,
        $__98,
        value,
        $__99,
        $__100,
        $__101,
        $__102;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            result = {};
            groups = {};
            if (!Array.isArray(input)) {
              input = createSequence(input);
            }
            $ctx.state = 58;
            break;
          case 58:
            itemIndex = 0;
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = (itemIndex < input.length) ? 22 : 24;
            break;
          case 19:
            itemIndex++;
            $ctx.state = 26;
            break;
          case 22:
            item = input[itemIndex];
            $ctx.state = 23;
            break;
          case 23:
            pairIndex = 0;
            $ctx.state = 21;
            break;
          case 21:
            $ctx.state = (pairIndex < expr.lhs.length) ? 15 : 19;
            break;
          case 18:
            pairIndex++;
            $ctx.state = 21;
            break;
          case 15:
            pair = expr.lhs[pairIndex];
            $ctx.state = 16;
            break;
          case 16:
            $__99 = $ctx.wrapYieldStar(evaluate(pair[0], item, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__100 = $__99[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__100.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__100.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__100.value;
          case 10:
            key = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            if (typeof key !== 'string') {
              throw {
                code: "T1003",
                stack: (new Error()).stack,
                position: expr.position,
                value: key
              };
            }
            entry = {
              data: item,
              exprIndex: pairIndex
            };
            if (groups.hasOwnProperty(key)) {
              if (groups[key].exprIndex !== pairIndex) {
                throw {
                  code: "D1009",
                  stack: (new Error()).stack,
                  position: expr.position,
                  value: key
                };
              }
              groups[key].data = fn.append(groups[key].data, item);
            } else {
              groups[key] = entry;
            }
            $ctx.state = 18;
            break;
          case 24:
            $__95 = [];
            $__96 = groups;
            for ($__97 in $__96)
              $__95.push($__97);
            $ctx.state = 54;
            break;
          case 54:
            $__98 = 0;
            $ctx.state = 52;
            break;
          case 52:
            $ctx.state = ($__98 < $__95.length) ? 44 : 50;
            break;
          case 49:
            $__98++;
            $ctx.state = 52;
            break;
          case 44:
            key = $__95[$__98];
            $ctx.state = 45;
            break;
          case 45:
            $ctx.state = (!(key in $__96)) ? 49 : 42;
            break;
          case 42:
            entry = groups[key];
            $ctx.state = 47;
            break;
          case 47:
            $__101 = $ctx.wrapYieldStar(evaluate(expr.lhs[entry.exprIndex][1], entry.data, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 38;
            break;
          case 38:
            $__102 = $__101[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 35;
            break;
          case 35:
            $ctx.state = ($__102.done) ? 29 : 28;
            break;
          case 29:
            $ctx.sent = $__102.value;
            $ctx.state = 36;
            break;
          case 28:
            $ctx.state = 38;
            return $__102.value;
          case 36:
            value = $ctx.sentIgnoreThrow;
            $ctx.state = 40;
            break;
          case 40:
            if (typeof value !== 'undefined') {
              result[key] = value;
            }
            $ctx.state = 49;
            break;
          case 50:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__94, this);
  }
  function evaluateRangeExpression(lhs, rhs) {
    var result;
    if (typeof lhs !== 'undefined' && !Number.isInteger(lhs)) {
      throw {
        code: "T2003",
        stack: (new Error()).stack,
        value: lhs
      };
    }
    if (typeof rhs !== 'undefined' && !Number.isInteger(rhs)) {
      throw {
        code: "T2004",
        stack: (new Error()).stack,
        value: rhs
      };
    }
    if (typeof lhs === 'undefined' || typeof rhs === 'undefined') {
      return result;
    }
    if (lhs > rhs) {
      return result;
    }
    result = new Array(rhs - lhs + 1);
    for (var item = lhs,
        index = 0; item <= rhs; item++, index++) {
      result[index] = item;
    }
    result.sequence = true;
    return result;
  }
  function evaluateBindExpression(expr, input, environment) {
    var value,
        $__104,
        $__105;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__104 = $ctx.wrapYieldStar(evaluate(expr.rhs, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__105 = $__104[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__105.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__105.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__105.value;
          case 10:
            value = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            environment.bind(expr.lhs.value, value);
            $ctx.state = 18;
            break;
          case 18:
            $ctx.returnValue = value;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__103, this);
  }
  function evaluateCondition(expr, input, environment) {
    var result,
        condition,
        $__107,
        $__108,
        $__109,
        $__110,
        $__111,
        $__112,
        $__113,
        $__114,
        $__115,
        $__116,
        $__117,
        $__118;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__107 = $ctx.wrapYieldStar(evaluate(expr.condition, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__108 = $__107[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__108.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__108.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__108.value;
          case 10:
            condition = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            $ctx.state = (fn.boolean(condition)) ? 29 : 51;
            break;
          case 29:
            $__109 = expr.then;
            $__110 = evaluate($__109, input, environment);
            $ctx.state = 30;
            break;
          case 30:
            $__112 = $ctx.wrapYieldStar($__110[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 26;
            break;
          case 26:
            $__113 = $__112[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 23;
            break;
          case 23:
            $ctx.state = ($__113.done) ? 17 : 16;
            break;
          case 17:
            $ctx.sent = $__113.value;
            $ctx.state = 24;
            break;
          case 16:
            $ctx.state = 26;
            return $__113.value;
          case 24:
            $__111 = $ctx.sentIgnoreThrow;
            $ctx.state = 28;
            break;
          case 28:
            result = $__111;
            $ctx.state = 32;
            break;
          case 51:
            $ctx.state = (typeof expr.else !== 'undefined') ? 47 : 32;
            break;
          case 47:
            $__114 = expr.else;
            $__115 = evaluate($__114, input, environment);
            $ctx.state = 48;
            break;
          case 48:
            $__117 = $ctx.wrapYieldStar($__115[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 44;
            break;
          case 44:
            $__118 = $__117[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 41;
            break;
          case 41:
            $ctx.state = ($__118.done) ? 35 : 34;
            break;
          case 35:
            $ctx.sent = $__118.value;
            $ctx.state = 42;
            break;
          case 34:
            $ctx.state = 44;
            return $__118.value;
          case 42:
            $__116 = $ctx.sentIgnoreThrow;
            $ctx.state = 46;
            break;
          case 46:
            result = $__116;
            $ctx.state = 32;
            break;
          case 32:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__106, this);
  }
  function evaluateBlock(expr, input, environment) {
    var result,
        frame,
        ii,
        $__120,
        $__121,
        $__122,
        $__123,
        $__124,
        $__125;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            frame = createFrame(environment);
            $ctx.state = 25;
            break;
          case 25:
            ii = 0;
            $ctx.state = 21;
            break;
          case 21:
            $ctx.state = (ii < expr.expressions.length) ? 15 : 19;
            break;
          case 18:
            ii++;
            $ctx.state = 21;
            break;
          case 15:
            $__120 = expr.expressions;
            $__121 = $__120[ii];
            $__122 = evaluate($__121, input, frame);
            $ctx.state = 16;
            break;
          case 16:
            $__124 = $ctx.wrapYieldStar($__122[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__125 = $__124[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__125.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__125.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__125.value;
          case 10:
            $__123 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__123;
            $ctx.state = 18;
            break;
          case 19:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__119, this);
  }
  function evaluateRegex(expr) {
    var re = new RegExp(expr.value);
    var closure = function(str) {
      var result;
      var match = re.exec(str);
      if (match !== null) {
        result = {
          match: match[0],
          start: match.index,
          end: match.index + match[0].length,
          groups: []
        };
        if (match.length > 1) {
          for (var i = 1; i < match.length; i++) {
            result.groups.push(match[i]);
          }
        }
        result.next = function() {
          if (re.lastIndex >= str.length) {
            return undefined;
          } else {
            var next = closure(str);
            if (next && next.match === '') {
              throw {
                code: "D1004",
                stack: (new Error()).stack,
                position: expr.position,
                value: expr.value.source
              };
            }
            return next;
          }
        };
      }
      return result;
    };
    return closure;
  }
  function evaluateVariable(expr, input, environment) {
    var result;
    if (expr.value === '') {
      result = input;
    } else {
      result = environment.lookup(expr.value);
    }
    return result;
  }
  function evaluateSortExpression(expr, input, environment) {
    var result,
        lhs,
        comparator,
        focus,
        $__132,
        $__133,
        $__134,
        $__135,
        $__136,
        $__137,
        $__138,
        $__139;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__132 = $ctx.wrapYieldStar(evaluate(expr.lhs, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__133 = $__132[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__133.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__133.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__133.value;
          case 10:
            lhs = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            comparator = $traceurRuntime.initGeneratorFunction(function $__127(a, b) {
              var comp,
                  index,
                  term,
                  aa,
                  bb,
                  atype,
                  btype,
                  $__128,
                  $__129,
                  $__130,
                  $__131;
              return $traceurRuntime.createGeneratorInstance(function($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      comp = 0;
                      $ctx.state = 58;
                      break;
                    case 58:
                      index = 0;
                      $ctx.state = 54;
                      break;
                    case 54:
                      $ctx.state = (comp === 0 && index < expr.rhs.length) ? 44 : 52;
                      break;
                    case 51:
                      index++;
                      $ctx.state = 54;
                      break;
                    case 44:
                      term = expr.rhs[index];
                      $ctx.state = 45;
                      break;
                    case 45:
                      $__128 = $ctx.wrapYieldStar(evaluate(term.expression, a, environment)[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 12;
                      break;
                    case 12:
                      $__129 = $__128[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = ($__129.done) ? 3 : 2;
                      break;
                    case 3:
                      $ctx.sent = $__129.value;
                      $ctx.state = 10;
                      break;
                    case 2:
                      $ctx.state = 12;
                      return $__129.value;
                    case 10:
                      aa = $ctx.sentIgnoreThrow;
                      $ctx.state = 14;
                      break;
                    case 14:
                      $__130 = $ctx.wrapYieldStar(evaluate(term.expression, b, environment)[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 26;
                      break;
                    case 26:
                      $__131 = $__130[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 23;
                      break;
                    case 23:
                      $ctx.state = ($__131.done) ? 17 : 16;
                      break;
                    case 17:
                      $ctx.sent = $__131.value;
                      $ctx.state = 24;
                      break;
                    case 16:
                      $ctx.state = 26;
                      return $__131.value;
                    case 24:
                      bb = $ctx.sentIgnoreThrow;
                      $ctx.state = 28;
                      break;
                    case 28:
                      atype = (typeof aa === 'undefined' ? 'undefined' : $traceurRuntime.typeof(aa));
                      btype = (typeof bb === 'undefined' ? 'undefined' : $traceurRuntime.typeof(bb));
                      $ctx.state = 47;
                      break;
                    case 47:
                      $ctx.state = (atype === 'undefined') ? 31 : 30;
                      break;
                    case 31:
                      comp = (btype === 'undefined') ? 0 : 1;
                      $ctx.state = 51;
                      break;
                    case 30:
                      $ctx.state = (btype === 'undefined') ? 36 : 35;
                      break;
                    case 36:
                      comp = -1;
                      $ctx.state = 51;
                      break;
                    case 35:
                      if (!(atype === 'string' || atype === 'number') || !(btype === 'string' || btype === 'number')) {
                        throw {
                          code: "T2008",
                          stack: (new Error()).stack,
                          position: expr.position,
                          value: !(atype === 'string' || atype === 'number') ? aa : bb
                        };
                      }
                      if (atype !== btype) {
                        throw {
                          code: "T2007",
                          stack: (new Error()).stack,
                          position: expr.position,
                          value: aa,
                          value2: bb
                        };
                      }
                      $ctx.state = 49;
                      break;
                    case 49:
                      $ctx.state = (aa === bb) ? 51 : 41;
                      break;
                    case 41:
                      if (aa < bb) {
                        comp = -1;
                      } else {
                        comp = 1;
                      }
                      $ctx.state = 40;
                      break;
                    case 40:
                      if (term.descending === true) {
                        comp = -comp;
                      }
                      $ctx.state = 51;
                      break;
                    case 52:
                      $ctx.returnValue = comp === 1;
                      $ctx.state = -2;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__127, this);
            });
            focus = {
              environment: environment,
              input: input
            };
            $ctx.state = 36;
            break;
          case 36:
            $__134 = fn.sort;
            $__135 = $__134.apply;
            $__136 = $__135.call($__134, focus, [lhs, comparator]);
            $ctx.state = 30;
            break;
          case 30:
            $__138 = $ctx.wrapYieldStar($__136[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 26;
            break;
          case 26:
            $__139 = $__138[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 23;
            break;
          case 23:
            $ctx.state = ($__139.done) ? 17 : 16;
            break;
          case 17:
            $ctx.sent = $__139.value;
            $ctx.state = 24;
            break;
          case 16:
            $ctx.state = 26;
            return $__139.value;
          case 24:
            $__137 = $ctx.sentIgnoreThrow;
            $ctx.state = 28;
            break;
          case 28:
            result = $__137;
            $ctx.state = 32;
            break;
          case 32:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__126, this);
  }
  function evaluateTransformExpression(expr, input, environment) {
    var transformer = $traceurRuntime.initGeneratorFunction(function $__127(obj) {
      var cloneFunction,
          result,
          matches,
          ii,
          match,
          update,
          updateType,
          $__140,
          $__141,
          $__142,
          $__143,
          prop,
          deletions,
          val,
          jj,
          $__144,
          $__145,
          $__146,
          $__147,
          $__148,
          $__149,
          $__150,
          $__151;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $ctx.state = (typeof obj === 'undefined') ? 1 : 2;
              break;
            case 1:
              $ctx.state = -2;
              break;
            case 2:
              cloneFunction = environment.lookup('clone');
              if (!isFunction(cloneFunction)) {
                throw {
                  code: "T2013",
                  stack: (new Error()).stack,
                  position: expr.position
                };
              }
              $ctx.state = 91;
              break;
            case 91:
              $__144 = $ctx.wrapYieldStar(apply(cloneFunction, [obj], null, environment)[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 15;
              break;
            case 15:
              $__145 = $__144[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = ($__145.done) ? 6 : 5;
              break;
            case 6:
              $ctx.sent = $__145.value;
              $ctx.state = 13;
              break;
            case 5:
              $ctx.state = 15;
              return $__145.value;
            case 13:
              result = $ctx.sentIgnoreThrow;
              $ctx.state = 17;
              break;
            case 17:
              $__146 = $ctx.wrapYieldStar(evaluate(expr.pattern, result, environment)[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 29;
              break;
            case 29:
              $__147 = $__146[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 26;
              break;
            case 26:
              $ctx.state = ($__147.done) ? 20 : 19;
              break;
            case 20:
              $ctx.sent = $__147.value;
              $ctx.state = 27;
              break;
            case 19:
              $ctx.state = 29;
              return $__147.value;
            case 27:
              matches = $ctx.sentIgnoreThrow;
              $ctx.state = 31;
              break;
            case 31:
              $ctx.state = (typeof matches !== 'undefined') ? 85 : 82;
              break;
            case 85:
              if (!Array.isArray(matches)) {
                matches = [matches];
              }
              $ctx.state = 86;
              break;
            case 86:
              ii = 0;
              $ctx.state = 84;
              break;
            case 84:
              $ctx.state = (ii < matches.length) ? 78 : 82;
              break;
            case 76:
              ii++;
              $ctx.state = 84;
              break;
            case 78:
              match = matches[ii];
              $ctx.state = 79;
              break;
            case 79:
              $__148 = $ctx.wrapYieldStar(evaluate(expr.update, match, environment)[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 43;
              break;
            case 43:
              $__149 = $__148[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 40;
              break;
            case 40:
              $ctx.state = ($__149.done) ? 34 : 33;
              break;
            case 34:
              $ctx.sent = $__149.value;
              $ctx.state = 41;
              break;
            case 33:
              $ctx.state = 43;
              return $__149.value;
            case 41:
              update = $ctx.sentIgnoreThrow;
              $ctx.state = 45;
              break;
            case 45:
              updateType = (typeof update === 'undefined' ? 'undefined' : $traceurRuntime.typeof(update));
              $ctx.state = 81;
              break;
            case 81:
              $ctx.state = (updateType !== 'undefined') ? 58 : 53;
              break;
            case 58:
              if (updateType !== 'object' || update === null || Array.isArray(update)) {
                throw {
                  code: "T2011",
                  stack: (new Error()).stack,
                  position: expr.update.position,
                  value: update
                };
              }
              $ctx.state = 59;
              break;
            case 59:
              $__140 = [];
              $__141 = update;
              for ($__142 in $__141)
                $__140.push($__142);
              $ctx.state = 57;
              break;
            case 57:
              $__143 = 0;
              $ctx.state = 55;
              break;
            case 55:
              $ctx.state = ($__143 < $__140.length) ? 49 : 53;
              break;
            case 52:
              $__143++;
              $ctx.state = 55;
              break;
            case 49:
              prop = $__140[$__143];
              $ctx.state = 50;
              break;
            case 50:
              $ctx.state = (!(prop in $__141)) ? 52 : 47;
              break;
            case 47:
              match[prop] = update[prop];
              $ctx.state = 52;
              break;
            case 53:
              $ctx.state = (typeof expr.delete !== 'undefined') ? 71 : 76;
              break;
            case 71:
              $__150 = $ctx.wrapYieldStar(evaluate(expr.delete, match, environment)[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 72;
              break;
            case 72:
              $__151 = $__150[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 69;
              break;
            case 69:
              $ctx.state = ($__151.done) ? 63 : 62;
              break;
            case 63:
              $ctx.sent = $__151.value;
              $ctx.state = 70;
              break;
            case 62:
              $ctx.state = 72;
              return $__151.value;
            case 70:
              deletions = $ctx.sentIgnoreThrow;
              $ctx.state = 74;
              break;
            case 74:
              if (typeof deletions !== 'undefined') {
                val = deletions;
                if (!Array.isArray(deletions)) {
                  deletions = [deletions];
                }
                if (!isArrayOfStrings(deletions)) {
                  throw {
                    code: "T2012",
                    stack: (new Error()).stack,
                    position: expr.delete.position,
                    value: val
                  };
                }
                for (jj = 0; jj < deletions.length; jj++) {
                  delete match[deletions[jj]];
                }
              }
              $ctx.state = 76;
              break;
            case 82:
              $ctx.returnValue = result;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__127, this);
    });
    return defineFunction(transformer, '<(oa):o>');
  }
  var chainAST = parser('function($f, $g) { function($x){ $g($f($x)) } }');
  function evaluateApplyExpression(expr, input, environment) {
    var result,
        lhs,
        func,
        chain,
        $__152,
        $__153,
        $__154,
        $__155,
        $__156,
        $__157,
        $__158,
        $__159,
        $__160,
        $__161,
        $__162,
        $__163,
        $__164,
        $__165,
        $__166,
        $__167,
        $__168,
        $__169,
        $__170;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (expr.rhs.type === 'function') ? 19 : 33;
            break;
          case 19:
            expr.rhs.arguments.unshift(expr.lhs);
            $ctx.state = 20;
            break;
          case 20:
            $__152 = expr.rhs;
            $__153 = evaluateFunction($__152, input, environment);
            $ctx.state = 16;
            break;
          case 16:
            $__155 = $ctx.wrapYieldStar($__153[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__156 = $__155[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__156.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__156.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__156.value;
          case 10:
            $__154 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__154;
            $ctx.state = 18;
            break;
          case 18:
            expr.rhs.arguments.shift();
            $ctx.state = 22;
            break;
          case 33:
            $__157 = $ctx.wrapYieldStar(evaluate(expr.lhs, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 34;
            break;
          case 34:
            $__158 = $__157[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 31;
            break;
          case 31:
            $ctx.state = ($__158.done) ? 25 : 24;
            break;
          case 25:
            $ctx.sent = $__158.value;
            $ctx.state = 32;
            break;
          case 24:
            $ctx.state = 34;
            return $__158.value;
          case 32:
            lhs = $ctx.sentIgnoreThrow;
            $ctx.state = 36;
            break;
          case 36:
            $__159 = $ctx.wrapYieldStar(evaluate(expr.rhs, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 48;
            break;
          case 48:
            $__160 = $__159[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 45;
            break;
          case 45:
            $ctx.state = ($__160.done) ? 39 : 38;
            break;
          case 39:
            $ctx.sent = $__160.value;
            $ctx.state = 46;
            break;
          case 38:
            $ctx.state = 48;
            return $__160.value;
          case 46:
            func = $ctx.sentIgnoreThrow;
            $ctx.state = 50;
            break;
          case 50:
            if (!isFunction(func)) {
              throw {
                code: "T2006",
                stack: (new Error()).stack,
                position: expr.position,
                value: func
              };
            }
            $ctx.state = 103;
            break;
          case 103:
            $ctx.state = (isFunction(lhs)) ? 61 : 97;
            break;
          case 61:
            $__161 = $ctx.wrapYieldStar(evaluate(chainAST, null, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 62;
            break;
          case 62:
            $__162 = $__161[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 59;
            break;
          case 59:
            $ctx.state = ($__162.done) ? 53 : 52;
            break;
          case 53:
            $ctx.sent = $__162.value;
            $ctx.state = 60;
            break;
          case 52:
            $ctx.state = 62;
            return $__162.value;
          case 60:
            chain = $ctx.sentIgnoreThrow;
            $ctx.state = 64;
            break;
          case 64:
            $__163 = apply(chain, [lhs, func], null, environment);
            $ctx.state = 80;
            break;
          case 80:
            $__165 = $ctx.wrapYieldStar($__163[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 76;
            break;
          case 76:
            $__166 = $__165[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 73;
            break;
          case 73:
            $ctx.state = ($__166.done) ? 67 : 66;
            break;
          case 67:
            $ctx.sent = $__166.value;
            $ctx.state = 74;
            break;
          case 66:
            $ctx.state = 76;
            return $__166.value;
          case 74:
            $__164 = $ctx.sentIgnoreThrow;
            $ctx.state = 78;
            break;
          case 78:
            result = $__164;
            $ctx.state = 22;
            break;
          case 97:
            $__167 = apply(func, [lhs], null, environment);
            $ctx.state = 98;
            break;
          case 98:
            $__169 = $ctx.wrapYieldStar($__167[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 94;
            break;
          case 94:
            $__170 = $__169[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 91;
            break;
          case 91:
            $ctx.state = ($__170.done) ? 85 : 84;
            break;
          case 85:
            $ctx.sent = $__170.value;
            $ctx.state = 92;
            break;
          case 84:
            $ctx.state = 94;
            return $__170.value;
          case 92:
            $__168 = $ctx.sentIgnoreThrow;
            $ctx.state = 96;
            break;
          case 96:
            result = $__168;
            $ctx.state = 22;
            break;
          case 22:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__127, this);
  }
  function evaluateFunction(expr, input, environment) {
    var result,
        proc,
        evaluatedArgs,
        $__2,
        jj,
        $__180,
        $__181,
        $__182,
        $__183,
        $__184,
        $__185,
        $__186,
        $__187,
        err;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__180 = $ctx.wrapYieldStar(evaluate(expr.procedure, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__181 = $__180[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__181.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__181.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__181.value;
          case 10:
            proc = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            if (typeof proc === 'undefined' && expr.procedure.type === 'path' && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1005",
                stack: (new Error()).stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            evaluatedArgs = [];
            $__2 = $traceurRuntime.initGeneratorFunction(function $__172() {
              var arg,
                  closure,
                  $__178,
                  $__179;
              return $traceurRuntime.createGeneratorInstance(function($ctx) {
                while (true)
                  switch ($ctx.state) {
                    case 0:
                      $__178 = $ctx.wrapYieldStar(evaluate(expr.arguments[jj], input, environment)[Symbol.iterator]());
                      $ctx.sent = void 0;
                      $ctx.action = 'next';
                      $ctx.state = 12;
                      break;
                    case 12:
                      $__179 = $__178[$ctx.action]($ctx.sentIgnoreThrow);
                      $ctx.state = 9;
                      break;
                    case 9:
                      $ctx.state = ($__179.done) ? 3 : 2;
                      break;
                    case 3:
                      $ctx.sent = $__179.value;
                      $ctx.state = 10;
                      break;
                    case 2:
                      $ctx.state = 12;
                      return $__179.value;
                    case 10:
                      arg = $ctx.sentIgnoreThrow;
                      $ctx.state = 14;
                      break;
                    case 14:
                      if (isFunction(arg)) {
                        closure = $traceurRuntime.initGeneratorFunction(function $__173() {
                          var params,
                              $__1,
                              $__174,
                              $__175,
                              $__176,
                              $__177;
                          var $arguments = arguments;
                          return $traceurRuntime.createGeneratorInstance(function($ctx) {
                            while (true)
                              switch ($ctx.state) {
                                case 0:
                                  for (params = [], $__1 = 0; $__1 < $arguments.length; $__1++)
                                    params[$__1] = $arguments[$__1];
                                  $ctx.state = 20;
                                  break;
                                case 20:
                                  $__174 = apply(arg, params, null, environment);
                                  $ctx.state = 16;
                                  break;
                                case 16:
                                  $__176 = $ctx.wrapYieldStar($__174[Symbol.iterator]());
                                  $ctx.sent = void 0;
                                  $ctx.action = 'next';
                                  $ctx.state = 12;
                                  break;
                                case 12:
                                  $__177 = $__176[$ctx.action]($ctx.sentIgnoreThrow);
                                  $ctx.state = 9;
                                  break;
                                case 9:
                                  $ctx.state = ($__177.done) ? 3 : 2;
                                  break;
                                case 3:
                                  $ctx.sent = $__177.value;
                                  $ctx.state = 10;
                                  break;
                                case 2:
                                  $ctx.state = 12;
                                  return $__177.value;
                                case 10:
                                  $__175 = $ctx.sentIgnoreThrow;
                                  $ctx.state = 14;
                                  break;
                                case 14:
                                  $ctx.returnValue = $__175;
                                  $ctx.state = -2;
                                  break;
                                default:
                                  return $ctx.end();
                              }
                          }, $__173, this);
                        });
                        closure.arity = getFunctionArity(arg);
                        evaluatedArgs.push(closure);
                      } else {
                        evaluatedArgs.push(arg);
                      }
                      $ctx.state = -2;
                      break;
                    default:
                      return $ctx.end();
                  }
              }, $__172, this);
            });
            $ctx.state = 60;
            break;
          case 60:
            jj = 0;
            $ctx.state = 29;
            break;
          case 29:
            $ctx.state = (jj < expr.arguments.length) ? 25 : 27;
            break;
          case 24:
            jj++;
            $ctx.state = 29;
            break;
          case 25:
            $__182 = $ctx.wrapYieldStar($__2()[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 26;
            break;
          case 26:
            $__183 = $__182[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 23;
            break;
          case 23:
            $ctx.state = ($__183.done) ? 17 : 16;
            break;
          case 17:
            $ctx.sent = $__183.value;
            $ctx.state = 24;
            break;
          case 16:
            $ctx.state = 26;
            return $__183.value;
          case 27:
            $ctx.pushTry(48, null);
            $ctx.state = 51;
            break;
          case 51:
            $__184 = apply(proc, evaluatedArgs, input, environment);
            $ctx.state = 45;
            break;
          case 45:
            $__186 = $ctx.wrapYieldStar($__184[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 41;
            break;
          case 41:
            $__187 = $__186[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 38;
            break;
          case 38:
            $ctx.state = ($__187.done) ? 32 : 31;
            break;
          case 32:
            $ctx.sent = $__187.value;
            $ctx.state = 39;
            break;
          case 31:
            $ctx.state = 41;
            return $__187.value;
          case 39:
            $__185 = $ctx.sentIgnoreThrow;
            $ctx.state = 43;
            break;
          case 43:
            result = $__185;
            $ctx.state = 47;
            break;
          case 47:
            $ctx.popTry();
            $ctx.state = 53;
            break;
          case 48:
            $ctx.popTry();
            $ctx.maybeUncatchable();
            err = $ctx.storedException;
            $ctx.state = 54;
            break;
          case 54:
            err.position = expr.position;
            err.token = expr.procedure.type === 'path' ? expr.procedure.steps[0].value : expr.procedure.value;
            throw err;
            $ctx.state = 53;
            break;
          case 53:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__171, this);
  }
  function apply(proc, args, input, environment) {
    var result,
        next,
        evaluatedArgs,
        ii,
        $__188,
        $__189,
        $__190,
        $__191,
        $__192,
        $__193,
        $__194,
        $__195,
        $__196,
        $__197,
        $__198,
        $__199,
        $__200,
        $__201,
        $__202,
        $__203,
        $__204,
        $__205,
        $__206,
        $__207,
        $__208;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $__188 = applyInner(proc, args, input, environment);
            $ctx.state = 16;
            break;
          case 16:
            $__190 = $ctx.wrapYieldStar($__188[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__191 = $__190[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__191.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__191.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__191.value;
          case 10:
            $__189 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__189;
            $ctx.state = 18;
            break;
          case 18:
            $ctx.state = (isLambda(result) && result.thunk === true) ? 29 : 74;
            break;
          case 29:
            $__192 = $ctx.wrapYieldStar(evaluate(result.body.procedure, result.input, result.environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 30;
            break;
          case 30:
            $__193 = $__192[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 27;
            break;
          case 27:
            $ctx.state = ($__193.done) ? 21 : 20;
            break;
          case 21:
            $ctx.sent = $__193.value;
            $ctx.state = 28;
            break;
          case 20:
            $ctx.state = 30;
            return $__193.value;
          case 28:
            next = $ctx.sentIgnoreThrow;
            $ctx.state = 32;
            break;
          case 32:
            evaluatedArgs = [];
            $ctx.state = 73;
            break;
          case 73:
            ii = 0;
            $ctx.state = 53;
            break;
          case 53:
            $ctx.state = (ii < result.body.arguments.length) ? 47 : 51;
            break;
          case 50:
            ii++;
            $ctx.state = 53;
            break;
          case 47:
            $__194 = evaluatedArgs.push;
            $__195 = result.body;
            $__196 = $__195.arguments;
            $__197 = $__196[ii];
            $__198 = result.input;
            $__199 = result.environment;
            $__200 = evaluate($__197, $__198, $__199);
            $ctx.state = 48;
            break;
          case 48:
            $__203 = $ctx.wrapYieldStar($__200[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 44;
            break;
          case 44:
            $__204 = $__203[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 41;
            break;
          case 41:
            $ctx.state = ($__204.done) ? 35 : 34;
            break;
          case 35:
            $ctx.sent = $__204.value;
            $ctx.state = 42;
            break;
          case 34:
            $ctx.state = 44;
            return $__204.value;
          case 42:
            $__201 = $ctx.sentIgnoreThrow;
            $ctx.state = 46;
            break;
          case 46:
            $__202 = $__194.call(evaluatedArgs, $__201);
            $ctx.state = 50;
            break;
          case 51:
            $__205 = applyInner(next, evaluatedArgs, input, environment);
            $ctx.state = 69;
            break;
          case 69:
            $__207 = $ctx.wrapYieldStar($__205[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 65;
            break;
          case 65:
            $__208 = $__207[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 62;
            break;
          case 62:
            $ctx.state = ($__208.done) ? 56 : 55;
            break;
          case 56:
            $ctx.sent = $__208.value;
            $ctx.state = 63;
            break;
          case 55:
            $ctx.state = 65;
            return $__208.value;
          case 63:
            $__206 = $ctx.sentIgnoreThrow;
            $ctx.state = 67;
            break;
          case 67:
            result = $__206;
            $ctx.state = 18;
            break;
          case 74:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__172, this);
  }
  function applyInner(proc, args, input, environment) {
    var result,
        validatedArgs,
        focus,
        $__209,
        $__210,
        $__211,
        $__212,
        $__213,
        $__214,
        $__215,
        $__216,
        $__217,
        $__218;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            validatedArgs = args;
            if (proc) {
              validatedArgs = validateArguments(proc.signature, args, input);
            }
            $ctx.state = 65;
            break;
          case 65:
            $ctx.state = (isLambda(proc)) ? 15 : 60;
            break;
          case 15:
            $__209 = applyProcedure(proc, validatedArgs);
            $ctx.state = 16;
            break;
          case 16:
            $__211 = $ctx.wrapYieldStar($__209[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__212 = $__211[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__212.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__212.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__212.value;
          case 10:
            $__210 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__210;
            $ctx.state = 18;
            break;
          case 60:
            $ctx.state = (proc && proc._jsonata_function === true) ? 36 : 59;
            break;
          case 36:
            focus = {
              environment: environment,
              input: input
            };
            result = proc.implementation.apply(focus, validatedArgs);
            $ctx.state = 37;
            break;
          case 37:
            $ctx.state = (isIterable(result)) ? 29 : 18;
            break;
          case 29:
            $__214 = $ctx.wrapYieldStar(result[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 30;
            break;
          case 30:
            $__215 = $__214[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 27;
            break;
          case 27:
            $ctx.state = ($__215.done) ? 21 : 20;
            break;
          case 21:
            $ctx.sent = $__215.value;
            $ctx.state = 28;
            break;
          case 20:
            $ctx.state = 30;
            return $__215.value;
          case 28:
            $__213 = $ctx.sentIgnoreThrow;
            $ctx.state = 32;
            break;
          case 32:
            result = $__213;
            $ctx.state = 18;
            break;
          case 59:
            $ctx.state = (typeof proc === 'function') ? 55 : 57;
            break;
          case 55:
            result = proc.apply(input, validatedArgs);
            $ctx.state = 56;
            break;
          case 56:
            $ctx.state = (isIterable(result)) ? 48 : 18;
            break;
          case 48:
            $__217 = $ctx.wrapYieldStar(result[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 49;
            break;
          case 49:
            $__218 = $__217[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 46;
            break;
          case 46:
            $ctx.state = ($__218.done) ? 40 : 39;
            break;
          case 40:
            $ctx.sent = $__218.value;
            $ctx.state = 47;
            break;
          case 39:
            $ctx.state = 49;
            return $__218.value;
          case 47:
            $__216 = $ctx.sentIgnoreThrow;
            $ctx.state = 51;
            break;
          case 51:
            result = $__216;
            $ctx.state = 18;
            break;
          case 57:
            throw {
              code: "T1006",
              stack: (new Error()).stack
            };
            $ctx.state = 18;
            break;
          case 18:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__173, this);
  }
  function evaluateLambda(expr, input, environment) {
    var procedure = {
      _jsonata_lambda: true,
      input: input,
      environment: environment,
      arguments: expr.arguments,
      signature: expr.signature,
      body: expr.body
    };
    if (expr.thunk === true) {
      procedure.thunk = true;
    }
    procedure.apply = $traceurRuntime.initGeneratorFunction(function $__219(self, args) {
      var $__220,
          $__221,
          $__222,
          $__223,
          $__224;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__220 = self.environment;
              $__221 = apply(procedure, args, input, $__220);
              $ctx.state = 16;
              break;
            case 16:
              $__223 = $ctx.wrapYieldStar($__221[Symbol.iterator]());
              $ctx.sent = void 0;
              $ctx.action = 'next';
              $ctx.state = 12;
              break;
            case 12:
              $__224 = $__223[$ctx.action]($ctx.sentIgnoreThrow);
              $ctx.state = 9;
              break;
            case 9:
              $ctx.state = ($__224.done) ? 3 : 2;
              break;
            case 3:
              $ctx.sent = $__224.value;
              $ctx.state = 10;
              break;
            case 2:
              $ctx.state = 12;
              return $__224.value;
            case 10:
              $__222 = $ctx.sentIgnoreThrow;
              $ctx.state = 14;
              break;
            case 14:
              $ctx.returnValue = $__222;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__219, this);
    });
    return procedure;
  }
  function evaluatePartialApplication(expr, input, environment) {
    var result,
        evaluatedArgs,
        ii,
        arg,
        proc,
        $__225,
        $__226,
        $__227,
        $__228,
        $__229,
        $__230,
        $__231,
        $__232;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            evaluatedArgs = [];
            $ctx.state = 44;
            break;
          case 44:
            ii = 0;
            $ctx.state = 26;
            break;
          case 26:
            $ctx.state = (ii < expr.arguments.length) ? 22 : 24;
            break;
          case 20:
            ii++;
            $ctx.state = 26;
            break;
          case 22:
            arg = expr.arguments[ii];
            $ctx.state = 23;
            break;
          case 23:
            $ctx.state = (arg.type === 'operator' && arg.value === '?') ? 19 : 15;
            break;
          case 19:
            evaluatedArgs.push(arg);
            $ctx.state = 20;
            break;
          case 15:
            $__225 = evaluatedArgs.push;
            $__226 = evaluate(arg, input, environment);
            $ctx.state = 16;
            break;
          case 16:
            $__229 = $ctx.wrapYieldStar($__226[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__230 = $__229[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__230.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__230.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__230.value;
          case 10:
            $__227 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            $__228 = $__225.call(evaluatedArgs, $__227);
            $ctx.state = 20;
            break;
          case 24:
            $__231 = $ctx.wrapYieldStar(evaluate(expr.procedure, input, environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 38;
            break;
          case 38:
            $__232 = $__231[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 35;
            break;
          case 35:
            $ctx.state = ($__232.done) ? 29 : 28;
            break;
          case 29:
            $ctx.sent = $__232.value;
            $ctx.state = 36;
            break;
          case 28:
            $ctx.state = 38;
            return $__232.value;
          case 36:
            proc = $ctx.sentIgnoreThrow;
            $ctx.state = 40;
            break;
          case 40:
            if (typeof proc === 'undefined' && expr.procedure.type === 'path' && environment.lookup(expr.procedure.steps[0].value)) {
              throw {
                code: "T1007",
                stack: (new Error()).stack,
                position: expr.position,
                token: expr.procedure.steps[0].value
              };
            }
            if (isLambda(proc)) {
              result = partialApplyProcedure(proc, evaluatedArgs);
            } else if (proc && proc._jsonata_function === true) {
              result = partialApplyNativeFunction(proc.implementation, evaluatedArgs);
            } else if (typeof proc === 'function') {
              result = partialApplyNativeFunction(proc, evaluatedArgs);
            } else {
              throw {
                code: "T1008",
                stack: (new Error()).stack,
                position: expr.position,
                token: expr.procedure.type === 'path' ? expr.procedure.steps[0].value : expr.procedure.value
              };
            }
            $ctx.state = 46;
            break;
          case 46:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__219, this);
  }
  function validateArguments(signature, args, context) {
    if (typeof signature === 'undefined') {
      return args;
    }
    var validatedArgs = signature.validate(args, context);
    return validatedArgs;
  }
  function applyProcedure(proc, args) {
    var result,
        env,
        $__234,
        $__235,
        $__236,
        $__237,
        $__238,
        $__239,
        $__240,
        $__241,
        $__242,
        $__243,
        $__244;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            env = createFrame(proc.environment);
            proc.arguments.forEach(function(param, index) {
              env.bind(param.value, args[index]);
            });
            $ctx.state = 41;
            break;
          case 41:
            $ctx.state = (typeof proc.body === 'function') ? 15 : 33;
            break;
          case 15:
            $__234 = proc.body;
            $__235 = applyNativeFunction($__234, env);
            $ctx.state = 16;
            break;
          case 16:
            $__237 = $ctx.wrapYieldStar($__235[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__238 = $__237[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__238.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__238.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__238.value;
          case 10:
            $__236 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__236;
            $ctx.state = 18;
            break;
          case 33:
            $__239 = proc.body;
            $__240 = proc.input;
            $__241 = evaluate($__239, $__240, env);
            $ctx.state = 34;
            break;
          case 34:
            $__243 = $ctx.wrapYieldStar($__241[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 30;
            break;
          case 30:
            $__244 = $__243[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 27;
            break;
          case 27:
            $ctx.state = ($__244.done) ? 21 : 20;
            break;
          case 21:
            $ctx.sent = $__244.value;
            $ctx.state = 28;
            break;
          case 20:
            $ctx.state = 30;
            return $__244.value;
          case 28:
            $__242 = $ctx.sentIgnoreThrow;
            $ctx.state = 32;
            break;
          case 32:
            result = $__242;
            $ctx.state = 18;
            break;
          case 18:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__233, this);
  }
  function partialApplyProcedure(proc, args) {
    var env = createFrame(proc.environment);
    var unboundArgs = [];
    proc.arguments.forEach(function(param, index) {
      var arg = args[index];
      if (arg && arg.type === 'operator' && arg.value === '?') {
        unboundArgs.push(param);
      } else {
        env.bind(param.value, arg);
      }
    });
    var procedure = {
      _jsonata_lambda: true,
      input: proc.input,
      environment: env,
      arguments: unboundArgs,
      body: proc.body
    };
    return procedure;
  }
  function partialApplyNativeFunction(native, args) {
    var sigArgs = getNativeFunctionArguments(native);
    sigArgs = sigArgs.map(function(sigArg) {
      return '$' + sigArg.trim();
    });
    var body = 'function(' + sigArgs.join(', ') + '){ _ }';
    var bodyAST = parser(body);
    bodyAST.body = native;
    var partial = partialApplyProcedure(bodyAST, args);
    return partial;
  }
  function applyNativeFunction(proc, env) {
    var sigArgs,
        args,
        focus,
        result,
        $__246,
        $__247,
        $__248;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            sigArgs = getNativeFunctionArguments(proc);
            args = sigArgs.map(function(sigArg) {
              return env.lookup(sigArg.trim());
            });
            focus = {environment: env};
            result = proc.apply(focus, args);
            $ctx.state = 21;
            break;
          case 21:
            $ctx.state = (isIterable(result)) ? 11 : 16;
            break;
          case 11:
            $__247 = $ctx.wrapYieldStar(result[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 12;
            break;
          case 12:
            $__248 = $__247[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 9;
            break;
          case 9:
            $ctx.state = ($__248.done) ? 3 : 2;
            break;
          case 3:
            $ctx.sent = $__248.value;
            $ctx.state = 10;
            break;
          case 2:
            $ctx.state = 12;
            return $__248.value;
          case 10:
            $__246 = $ctx.sentIgnoreThrow;
            $ctx.state = 14;
            break;
          case 14:
            result = $__246;
            $ctx.state = 16;
            break;
          case 16:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__245, this);
  }
  function getNativeFunctionArguments(func) {
    var signature = func.toString();
    var sigParens = /\(([^)]*)\)/.exec(signature)[1];
    var sigArgs = sigParens.split(',');
    return sigArgs;
  }
  function defineFunction(func, signature) {
    var definition = {
      _jsonata_function: true,
      implementation: func
    };
    if (typeof signature !== 'undefined') {
      definition.signature = parseSignature(signature);
    }
    return definition;
  }
  function functionEval(expr, focus) {
    var input,
        ast,
        result,
        $__250,
        $__251,
        err;
    return $traceurRuntime.createGeneratorInstance(function($ctx) {
      while (true)
        switch ($ctx.state) {
          case 0:
            $ctx.state = (typeof expr === 'undefined') ? 1 : 2;
            break;
          case 1:
            $ctx.state = -2;
            break;
          case 2:
            input = this.input;
            if (typeof focus !== 'undefined') {
              input = focus;
            }
            try {
              ast = parser(expr, false);
            } catch (err) {
              populateMessage(err);
              throw {
                stack: (new Error()).stack,
                code: "D3120",
                value: err.message,
                error: err
              };
            }
            $ctx.state = 30;
            break;
          case 30:
            $ctx.pushTry(18, null);
            $ctx.state = 21;
            break;
          case 21:
            $__250 = $ctx.wrapYieldStar(evaluate(ast, input, this.environment)[Symbol.iterator]());
            $ctx.sent = void 0;
            $ctx.action = 'next';
            $ctx.state = 15;
            break;
          case 15:
            $__251 = $__250[$ctx.action]($ctx.sentIgnoreThrow);
            $ctx.state = 12;
            break;
          case 12:
            $ctx.state = ($__251.done) ? 6 : 5;
            break;
          case 6:
            $ctx.sent = $__251.value;
            $ctx.state = 13;
            break;
          case 5:
            $ctx.state = 15;
            return $__251.value;
          case 13:
            result = $ctx.sentIgnoreThrow;
            $ctx.state = 17;
            break;
          case 17:
            $ctx.popTry();
            $ctx.state = 23;
            break;
          case 18:
            $ctx.popTry();
            $ctx.maybeUncatchable();
            err = $ctx.storedException;
            $ctx.state = 24;
            break;
          case 24:
            populateMessage(err);
            throw {
              stack: (new Error()).stack,
              code: "D3121",
              value: err.message,
              error: err
            };
            $ctx.state = 23;
            break;
          case 23:
            $ctx.returnValue = result;
            $ctx.state = -2;
            break;
          default:
            return $ctx.end();
        }
    }, $__249, this);
  }
  function functionClone(arg) {
    if (typeof arg === 'undefined') {
      return undefined;
    }
    return JSON.parse(fn.string(arg));
  }
  function createFrame(enclosingEnvironment) {
    var bindings = {};
    return {
      bind: function(name, value) {
        bindings[name] = value;
      },
      lookup: function(name) {
        var value;
        if (bindings.hasOwnProperty(name)) {
          value = bindings[name];
        } else if (enclosingEnvironment) {
          value = enclosingEnvironment.lookup(name);
        }
        return value;
      },
      timestamp: enclosingEnvironment ? enclosingEnvironment.timestamp : null,
      async: enclosingEnvironment ? enclosingEnvironment.async : false
    };
  }
  staticFrame.bind('sum', defineFunction(fn.sum, '<a<n>:n>'));
  staticFrame.bind('count', defineFunction(fn.count, '<a:n>'));
  staticFrame.bind('max', defineFunction(fn.max, '<a<n>:n>'));
  staticFrame.bind('min', defineFunction(fn.min, '<a<n>:n>'));
  staticFrame.bind('average', defineFunction(fn.average, '<a<n>:n>'));
  staticFrame.bind('string', defineFunction(fn.string, '<x-:s>'));
  staticFrame.bind('substring', defineFunction(fn.substring, '<s-nn?:s>'));
  staticFrame.bind('substringBefore', defineFunction(fn.substringBefore, '<s-s:s>'));
  staticFrame.bind('substringAfter', defineFunction(fn.substringAfter, '<s-s:s>'));
  staticFrame.bind('lowercase', defineFunction(fn.lowercase, '<s-:s>'));
  staticFrame.bind('uppercase', defineFunction(fn.uppercase, '<s-:s>'));
  staticFrame.bind('length', defineFunction(fn.length, '<s-:n>'));
  staticFrame.bind('trim', defineFunction(fn.trim, '<s-:s>'));
  staticFrame.bind('pad', defineFunction(fn.pad, '<s-ns?:s>'));
  staticFrame.bind('match', defineFunction(fn.match, '<s-f<s:o>n?:a<o>>'));
  staticFrame.bind('contains', defineFunction(fn.contains, '<s-(sf):b>'));
  staticFrame.bind('replace', defineFunction(fn.replace, '<s-(sf)(sf)n?:s>'));
  staticFrame.bind('split', defineFunction(fn.split, '<s-(sf)n?:a<s>>'));
  staticFrame.bind('join', defineFunction(fn.join, '<a<s>s?:s>'));
  staticFrame.bind('formatNumber', defineFunction(fn.formatNumber, '<n-so?:s>'));
  staticFrame.bind('formatBase', defineFunction(fn.formatBase, '<n-n?:s>'));
  staticFrame.bind('formatInteger', defineFunction(datetime.formatInteger, '<n-s:s>'));
  staticFrame.bind('parseInteger', defineFunction(datetime.parseInteger, '<s-s:n>'));
  staticFrame.bind('number', defineFunction(fn.number, '<(nsb)-:n>'));
  staticFrame.bind('floor', defineFunction(fn.floor, '<n-:n>'));
  staticFrame.bind('ceil', defineFunction(fn.ceil, '<n-:n>'));
  staticFrame.bind('round', defineFunction(fn.round, '<n-n?:n>'));
  staticFrame.bind('abs', defineFunction(fn.abs, '<n-:n>'));
  staticFrame.bind('sqrt', defineFunction(fn.sqrt, '<n-:n>'));
  staticFrame.bind('power', defineFunction(fn.power, '<n-n:n>'));
  staticFrame.bind('random', defineFunction(fn.random, '<:n>'));
  staticFrame.bind('boolean', defineFunction(fn.boolean, '<x-:b>'));
  staticFrame.bind('not', defineFunction(fn.not, '<x-:b>'));
  staticFrame.bind('map', defineFunction(fn.map, '<af>'));
  staticFrame.bind('zip', defineFunction(fn.zip, '<a+>'));
  staticFrame.bind('filter', defineFunction(fn.filter, '<af>'));
  staticFrame.bind('reduce', defineFunction(fn.foldLeft, '<afj?:j>'));
  staticFrame.bind('sift', defineFunction(fn.sift, '<o-f?:o>'));
  staticFrame.bind('keys', defineFunction(fn.keys, '<x-:a<s>>'));
  staticFrame.bind('lookup', defineFunction(fn.lookup, '<x-s:x>'));
  staticFrame.bind('append', defineFunction(fn.append, '<xx:a>'));
  staticFrame.bind('exists', defineFunction(fn.exists, '<x:b>'));
  staticFrame.bind('spread', defineFunction(fn.spread, '<x-:a<o>>'));
  staticFrame.bind('merge', defineFunction(fn.merge, '<a<o>:o>'));
  staticFrame.bind('reverse', defineFunction(fn.reverse, '<a:a>'));
  staticFrame.bind('each', defineFunction(fn.each, '<o-f:a>'));
  staticFrame.bind('sort', defineFunction(fn.sort, '<af?:a>'));
  staticFrame.bind('shuffle', defineFunction(fn.shuffle, '<a:a>'));
  staticFrame.bind('base64encode', defineFunction(fn.base64encode, '<s-:s>'));
  staticFrame.bind('base64decode', defineFunction(fn.base64decode, '<s-:s>'));
  staticFrame.bind('eval', defineFunction(functionEval, '<sx?:x>'));
  staticFrame.bind('toMillis', defineFunction(datetime.toMillis, '<s-s?:n>'));
  staticFrame.bind('fromMillis', defineFunction(datetime.fromMillis, '<n-s?s?:s>'));
  staticFrame.bind('clone', defineFunction(functionClone, '<(oa)-:o>'));
  var errorCodes = {
    "S0101": "String literal must be terminated by a matching quote",
    "S0102": "Number out of range: {{token}}",
    "S0103": "Unsupported escape sequence: \\{{token}}",
    "S0104": "The escape sequence \\u must be followed by 4 hex digits",
    "S0105": "Quoted property name must be terminated with a backquote (`)",
    "S0106": "Comment has no closing tag",
    "S0201": "Syntax error: {{token}}",
    "S0202": "Expected {{value}}, got {{token}}",
    "S0203": "Expected {{value}} before end of expression",
    "S0204": "Unknown operator: {{token}}",
    "S0205": "Unexpected token: {{token}}",
    "S0206": "Unknown expression type: {{token}}",
    "S0207": "Unexpected end of expression",
    "S0208": "Parameter {{value}} of function definition must be a variable name (start with $)",
    "S0209": "A predicate cannot follow a grouping expression in a step",
    "S0210": "Each step can only have one grouping expression",
    "S0211": "The symbol {{token}} cannot be used as a unary operator",
    "S0212": "The left side of := must be a variable name (start with $)",
    "S0213": "The literal value {{value}} cannot be used as a step within a path expression",
    "S0301": "Empty regular expressions are not allowed",
    "S0302": "No terminating / in regular expression",
    "S0402": "Choice groups containing parameterized types are not supported",
    "S0401": "Type parameters can only be applied to functions and arrays",
    "S0500": "Attempted to evaluate an expression containing syntax error(s)",
    "T0410": "Argument {{index}} of function {{token}} does not match function signature",
    "T0411": "Context value is not a compatible type with argument {{index}} of function {{token}}",
    "T0412": "Argument {{index}} of function {{token}} must be an array of {{type}}",
    "D1001": "Number out of range: {{value}}",
    "D1002": "Cannot negate a non-numeric value: {{value}}",
    "T1003": "Key in object structure must evaluate to a string; got: {{value}}",
    "D1004": "Regular expression matches zero length string",
    "T1005": "Attempted to invoke a non-function. Did you mean ${{{token}}}?",
    "T1006": "Attempted to invoke a non-function",
    "T1007": "Attempted to partially apply a non-function. Did you mean ${{{token}}}?",
    "T1008": "Attempted to partially apply a non-function",
    "D1009": "Multiple key definitions evaluate to same key: {{value}}",
    "T1010": "The matcher function argument passed to function {{token}} does not return the correct object structure",
    "T2001": "The left side of the {{token}} operator must evaluate to a number",
    "T2002": "The right side of the {{token}} operator must evaluate to a number",
    "T2003": "The left side of the range operator (..) must evaluate to an integer",
    "T2004": "The right side of the range operator (..) must evaluate to an integer",
    "D2005": "The left side of := must be a variable name (start with $)",
    "T2006": "The right side of the function application operator ~> must be a function",
    "T2007": "Type mismatch when comparing values {{value}} and {{value2}} in order-by clause",
    "T2008": "The expressions within an order-by clause must evaluate to numeric or string values",
    "T2009": "The values {{value}} and {{value2}} either side of operator {{token}} must be of the same data type",
    "T2010": "The expressions either side of operator {{token}} must evaluate to numeric or string values",
    "T2011": "The insert/update clause of the transform expression must evaluate to an object: {{value}}",
    "T2012": "The delete clause of the transform expression must evaluate to a string or array of strings: {{value}}",
    "T2013": "The transform expression clones the input object using the $clone() function.  This has been overridden in the current scope by a non-function.",
    "D3001": "Attempting to invoke string function on Infinity or NaN",
    "D3010": "Second argument of replace function cannot be an empty string",
    "D3011": "Fourth argument of replace function must evaluate to a positive number",
    "D3012": "Attempted to replace a matched string with a non-string value",
    "D3020": "Third argument of split function must evaluate to a positive number",
    "D3030": "Unable to cast value to a number: {{value}}",
    "D3040": "Third argument of match function must evaluate to a positive number",
    "D3050": "First argument of reduce function must be a function with two arguments",
    "D3060": "The sqrt function cannot be applied to a negative number: {{value}}",
    "D3061": "The power function has resulted in a value that cannot be represented as a JSON number: base={{value}}, exponent={{exp}}",
    "D3070": "The single argument form of the sort function can only be applied to an array of strings or an array of numbers.  Use the second argument to specify a comparison function",
    "D3080": "The picture string must only contain a maximum of two sub-pictures",
    "D3081": "The sub-picture must not contain more than one instance of the 'decimal-separator' character",
    "D3082": "The sub-picture must not contain more than one instance of the 'percent' character",
    "D3083": "The sub-picture must not contain more than one instance of the 'per-mille' character",
    "D3084": "The sub-picture must not contain both a 'percent' and a 'per-mille' character",
    "D3085": "The mantissa part of a sub-picture must contain at least one character that is either an 'optional digit character' or a member of the 'decimal digit family'",
    "D3086": "The sub-picture must not contain a passive character that is preceded by an active character and that is followed by another active character",
    "D3087": "The sub-picture must not contain a 'grouping-separator' character that appears adjacent to a 'decimal-separator' character",
    "D3088": "The sub-picture must not contain a 'grouping-separator' at the end of the integer part",
    "D3089": "The sub-picture must not contain two adjacent instances of the 'grouping-separator' character",
    "D3090": "The integer part of the sub-picture must not contain a member of the 'decimal digit family' that is followed by an instance of the 'optional digit character'",
    "D3091": "The fractional part of the sub-picture must not contain an instance of the 'optional digit character' that is followed by a member of the 'decimal digit family'",
    "D3092": "A sub-picture that contains a 'percent' or 'per-mille' character must not contain a character treated as an 'exponent-separator'",
    "D3093": "The exponent part of the sub-picture must comprise only of one or more characters that are members of the 'decimal digit family'",
    "D3100": "The radix of the formatBase function must be between 2 and 36.  It was given {{value}}",
    "D3110": "The argument of the toMillis function must be an ISO 8601 formatted timestamp. Given {{value}}",
    "D3120": "Syntax error in expression passed to function eval: {{value}}",
    "D3121": "Dynamic error evaluating the expression passed to function eval: {{value}}",
    "D3130": "Formatting an integer as a sequence starting with {{value}} is not supported by this implementation",
    "D3131": "In a decimal digit pattern, all digits must be from the same decimal group",
    "D3132": "Unknown component specifier {{value}} in date/time picture string",
    "D3133": "The 'name' modifier can only be applied to months and days in the date/time picture string, not {{value}}",
    "D3134": "The timezone integer format specifier cannot have more than four digits",
    "D3135": "No matching closing bracket ']' in date/time picture string",
    "D3136": "The date/time picture string is missing specifiers required to parse the timestamp"
  };
  function populateMessage(err) {
    var template = errorCodes[err.code];
    if (typeof template !== 'undefined') {
      var message = template.replace(/\{\{\{([^}]+)}}}/g, function() {
        return err[arguments[1]];
      });
      message = message.replace(/\{\{([^}]+)}}/g, function() {
        return JSON.stringify(err[arguments[1]]);
      });
      err.message = message;
    }
  }
  function jsonata(expr, options) {
    var ast;
    var errors;
    try {
      ast = parser(expr, options && options.recover);
      errors = ast.errors;
      delete ast.errors;
    } catch (err) {
      populateMessage(err);
      throw err;
    }
    var environment = createFrame(staticFrame);
    var timestamp = new Date();
    environment.bind('now', defineFunction(function(picture, timezone) {
      return datetime.fromMillis(timestamp.getTime(), picture, timezone);
    }, '<s?s?:s>'));
    environment.bind('millis', defineFunction(function() {
      return timestamp.getTime();
    }, '<:n>'));
    return {
      evaluate: function(input, bindings, callback) {
        if (typeof errors !== 'undefined') {
          var err = {
            code: 'S0500',
            position: 0
          };
          populateMessage(err);
          throw err;
        }
        if (typeof bindings !== 'undefined') {
          var exec_env;
          exec_env = createFrame(environment);
          for (var v in bindings) {
            exec_env.bind(v, bindings[v]);
          }
        } else {
          exec_env = environment;
        }
        exec_env.bind('$', input);
        timestamp = new Date();
        exec_env.timestamp = timestamp;
        var result,
            it;
        if (typeof callback === 'function') {
          exec_env.async = true;
          var catchHandler = function(err) {
            populateMessage(err);
            callback(err, null);
          };
          var thenHandler = function(response) {
            result = it.next(response);
            if (result.done) {
              callback(null, result.value);
            } else {
              result.value.then(thenHandler).catch(catchHandler);
            }
          };
          it = evaluate(ast, input, exec_env);
          result = it.next();
          result.value.then(thenHandler).catch(catchHandler);
        } else {
          try {
            it = evaluate(ast, input, exec_env);
            result = it.next();
            while (!result.done) {
              result = it.next(result.value);
            }
            return result.value;
          } catch (err) {
            populateMessage(err);
            throw err;
          }
        }
      },
      assign: function(name, value) {
        environment.bind(name, value);
      },
      registerFunction: function(name, implementation, signature) {
        var func = defineFunction(implementation, signature);
        environment.bind(name, func);
      },
      ast: function() {
        return ast;
      },
      errors: function() {
        return errors;
      }
    };
  }
  jsonata.parser = parser;
  return jsonata;
})();
module.exports = jsonata;
