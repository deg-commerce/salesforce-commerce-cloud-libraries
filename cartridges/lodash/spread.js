'use strict';

var apply = require('./internal/apply');
var arrayPush = require('./internal/arrayPush');
var baseRest = require('./internal/baseRest');
var castSlice = require('./internal/castSlice');
var toInteger = require('./toInteger');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * create function and an array of arguments much like
 * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
 *
 * **Note:** This method is based on the
 * [spread operator](https://mdn.io/spread_operator).
 *
 * @static
 * @since 3.2.0
 * @category Function
 * @param {Function} func The function to spread arguments over.
 * @param {number} [start=0] The start position of the spread.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = spread(function(who, what) {
 *   return who + ' says ' + what;
 * });
 *
 * say(['fred', 'hello']); => 'fred says hello'
 *
 */
function spread(func, start) {
    if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
    }
    start = start == null ? 0 : nativeMax(toInteger(start), 0);
    return baseRest(function (args) {
        var array = args[start];
        var otherArgs = castSlice(args, 0, start);

        if (array) {
            arrayPush(otherArgs, array);
        }
        return apply(func, this, otherArgs);
    });
}

module.exports = spread;
