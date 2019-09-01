var assert = require('assert');
var has = require('../../../cartridges/lodash/has');
var map = require('../../../cartridges/lodash/map');
var each = require('../../../cartridges/lodash/each');
var isEqual = require('../../../cartridges/lodash/isEqual');
var reduce = require('../../../cartridges/lodash/reduce');
var constant = require('../../../cartridges/lodash/constant');
var cloneDeep = require('../../../cartridges/lodash/cloneDeep');
var assign = require('../../../cartridges/lodash/assign');
var assignIn = require('../../../cartridges/lodash/assignIn');
var assignInWith = require('../../../cartridges/lodash/assignInWith');
var assignWith = require('../../../cartridges/lodash/assignWith');
var mergeWith = require('../../../cartridges/lodash/mergeWith');
var defaults = require('../../../cartridges/lodash/defaults');
var defaultsDeep = require('../../../cartridges/lodash/defaultsDeep');
var merge = require('../../../cartridges/lodash/merge');
var _ = require('../../../cartridges/lodash/wrapperLodash');
var { stubTrue } = require('../helpers/stubs');
var primitives = require('../helpers/primitives');
var defineProperty = Object.defineProperty;
var slice = Array.prototype.slice;

describe('object assignments', function () {
    each(['assign', 'assignIn', 'defaults', 'defaultsDeep', 'merge'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'assign': return assign;
                case 'assignIn': return assignIn;
                case 'defaults': return defaults;
                case 'defaultsDeep': return defaultsDeep;
                case 'merge': return merge;

                default: return null;
            }
        }());
        var isAssign = methodName === 'assign';
        var isDefaults = /^defaults/.test(methodName);

        it('`_.' + methodName + '` should coerce primitives to objects', function () {
            var expected = map(primitives, function (value) {
                var object = Object(value);
                object.a = 1;
                return object;
            });

            var actual = map(primitives, function (value) {
                return func(value, { 'a': 1 });
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should assign own ' + (isAssign ? '' : 'and inherited ') + 'string keyed source properties', function () {
            function Foo() {
                this.a = 1;
            }
            Foo.prototype.b = 2;

            var expected = isAssign ? { 'a': 1 } : { 'a': 1, 'b': 2 };
            assert.deepStrictEqual(func({}, new Foo()), expected);
        });

        it('`_.' + methodName + '` should not skip a trailing function source', function () {
            function fn() {}
            fn.b = 2;

            assert.deepStrictEqual(func({}, { 'a': 1 }, fn), { 'a': 1, 'b': 2 });
        });

        it('`_.' + methodName + '` should not error on nullish sources', function () {
            try {
                assert.deepStrictEqual(func({ 'a': 1 }, undefined, { 'b': 2 }, null), { 'a': 1, 'b': 2 });
            } catch (e) {
                assert.ok(false, e.message);
            }
        });

        it('`_.' + methodName + '` should create an object when `object` is nullish', function () {
            var source = { 'a': 1 };
            var values = [null, undefined];
            var expected = map(values, stubTrue);

            var actual = map(values, function (value) {
                var object = func(value, source);
                return object !== source && isEqual(object, source);
            });

            assert.deepStrictEqual(actual, expected);

            actual = map(values, function (value) {
                return isEqual(func(value), {});
            });

            assert.deepStrictEqual(actual, expected);
        });

        it('`_.' + methodName + '` should work as an iteratee for methods like `_.reduce`', function () {
            var array = [{ 'a': 1 }, { 'b': 2 }, { 'c': 3 }];
            var expected = { 'a': isDefaults ? 0 : 1, 'b': 2, 'c': 3 };

            function fn() {}
            fn.a = array[0];
            fn.b = array[1];
            fn.c = array[2];

            assert.deepStrictEqual(reduce(array, func, { 'a': 0 }), expected);
            assert.deepStrictEqual(reduce(fn, func, { 'a': 0 }), expected);
        });

        it('`_.' + methodName + '` should not return the existing wrapped value when chaining', function () {
            var wrapped = _({ 'a': 1 });
            var actual = wrapped[methodName]({ 'b': 2 });

            assert.notStrictEqual(actual, wrapped);
        });
    });

    each(['assign', 'assignIn', 'merge'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'assign': return assign;
                case 'assignIn': return assignIn;
                case 'merge': return merge;

                default: return null;
            }
        }());

        it('`_.' + methodName + '` should not treat `object` as `source`', function () {
            function Foo() {}
            Foo.prototype.a = 1;

            var actual = func(new Foo(), { 'b': 2 });
            assert.ok(!has(actual, 'a'));
        });
    });

    each(['assign', 'assignIn', 'assignInWith', 'assignWith', 'defaults', 'defaultsDeep', 'merge', 'mergeWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'assign': return assign;
                case 'assignIn': return assignIn;
                case 'assignInWith': return assignInWith;
                case 'assignWith': return assignWith;
                case 'mergeWith': return mergeWith;
                case 'defaults': return defaults;
                case 'defaultsDeep': return defaultsDeep;
                case 'merge': return merge;

                default: return null;
            }
        }());

        it('`_.' + methodName + '` should not assign values that are the same as their destinations', function () {
            each(['a', ['a'], { 'a': 1 }, NaN], function (value) {
                var object = {};
                var pass = true;

                defineProperty(object, 'a', {
                    'configurable': true,
                    'enumerable': true,
                    'get': constant(value),
                    'set': function () { pass = false; }
                });

                func(object, { 'a': value });
                assert.ok(pass);
            });
        });
    });

    each(['assignWith', 'assignInWith', 'mergeWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'assignWith': return assignWith;
                case 'mergeWith': return mergeWith;
                case 'assignInWith': return assignInWith;


                default: return null;
            }
        }());
        var isMergeWith = methodName === 'mergeWith';

        it('`_.' + methodName + '` should provide correct `customizer` arguments', function () {
            var args;
            var object = { 'a': 1 };
            var source = { 'a': 2 };
            var expected = map([1, 2, 'a', object, source], cloneDeep);

            func(object, source, function () {
                args || (args = map(slice.call(arguments, 0, 5), cloneDeep));
            });

            assert.deepStrictEqual(args, expected, 'primitive values');

            var argsList = [];
            var objectValue = [1, 2];
            var sourceValue = { 'b': 2 };

            object = { 'a': objectValue };
            source = { 'a': sourceValue };
            expected = [map([objectValue, sourceValue, 'a', object, source], cloneDeep)];

            if (isMergeWith) {
                expected.push(map([undefined, 2, 'b', objectValue, sourceValue], cloneDeep));
            }
            func(object, source, function () {
                argsList.push(map(slice.call(arguments, 0, 5), cloneDeep));
            });

            assert.deepStrictEqual(argsList, expected, 'object values');

            args = undefined;
            object = { 'a': 1 };
            source = { 'b': 2 };
            expected = map([undefined, 2, 'b', object, source], cloneDeep);

            func(object, source, function () {
                args || (args = map(slice.call(arguments, 0, 5), cloneDeep));
            });

            assert.deepStrictEqual(args, expected, 'undefined properties');
        });

        it('`_.' + methodName + '` should not treat the second argument as a `customizer` callback', function () {
            function callback() {}
            callback.b = 2;

            var actual = func({ 'a': 1 }, callback);
            assert.deepStrictEqual(actual, { 'a': 1, 'b': 2 });

            actual = func({ 'a': 1 }, callback, { 'c': 3 });
            assert.deepStrictEqual(actual, { 'a': 1, 'b': 2, 'c': 3 });
        });
    });
});
