var assert = require('assert');
var union = require('../../../cartridges/lodash/union');
var unionBy = require('../../../cartridges/lodash/unionBy');
var unionWith = require('../../../cartridges/lodash/unionWith');
var each = require('../../../cartridges/lodash/each');
var args = require('../helpers/args');

describe('union methods', function () {
    each(['union', 'unionBy', 'unionWith'], function (methodName) {
        var func = (function () {
            switch (methodName) {
                case 'union': return union;
                case 'unionBy': return unionBy;
                case 'unionWith': return unionWith;

                default: return null;
            }
        }());

        it('`_.' + methodName + '` should return the union of two arrays', function () {
            var actual = func([2], [1, 2]);
            assert.deepStrictEqual(actual, [2, 1]);
        });

        it('`_.' + methodName + '` should return the union of multiple arrays', function () {
            var actual = func([2], [1, 2], [2, 3]);
            assert.deepStrictEqual(actual, [2, 1, 3]);
        });

        it('`_.' + methodName + '` should not flatten nested arrays', function () {
            var actual = func([1, 3, 2], [1, [5]], [2, [4]]);
            assert.deepStrictEqual(actual, [1, 3, 2, [5], [4]]);
        });

        it('`_.' + methodName + '` should ignore values that are not arrays or `arguments` objects', function () {
            var array = [0];
            assert.deepStrictEqual(func(array, 3, { '0': 1 }, null), array);
            assert.deepStrictEqual(func(null, array, null, [2, 1]), [0, 2, 1]);
            assert.deepStrictEqual(func(array, null, args, null), [0, 1, 2, 3]);
        });
    });
});
