'use strict';

var toFinite = require('./toFinite');

/**
 * Converts `value` to an integer.
 *
 * **Note:** This method is loosely based on
 * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
 *
 * @static
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted integer.
 * @example
 *
 * toInteger(3.2); => 3
 *
 * toInteger(Number.MIN_VALUE); => 0
 *
 * toInteger(Infinity); => 1.7976931348623157e+308
 *
 * toInteger('3.2'); => 3
 */
function toInteger(value) {
    var result = toFinite(value);
    var remainder = result % 1;

    return result === result ? (remainder ? result - remainder : result) : 0;
}

module.exports = toInteger;
