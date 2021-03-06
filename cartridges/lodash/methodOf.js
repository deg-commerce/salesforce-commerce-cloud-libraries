'use strict';

var baseInvoke = require('./internal/baseInvoke');
var baseRest = require('./internal/baseRest');

/**
 * The opposite of `_.method`; this method creates a function that invokes
 * the method at a given path of `object`. Any additional arguments are
 * provided to the invoked method.
 *
 * @static
 * @since 3.7.0
 * @category Util
 * @param {Object} object The object to query.
 * @param {...*} [args] The arguments to invoke the method with.
 * @returns {Function} Returns the new invoker function.
 * @example
 *
 * var array = times(3, constant);
 * var object = { 'a': array, 'b': array, 'c': array };
 *
 * map(['a[2]', 'c[0]'], methodOf(object)); => [2, 0]
 *
 * map([['a', '2'], ['c', '0']], methodOf(object)); => [2, 0]
 */
var methodOf = baseRest(function (object, args) {
    return function (path) {
        return baseInvoke(object, path, args);
    };
});

module.exports = methodOf;
