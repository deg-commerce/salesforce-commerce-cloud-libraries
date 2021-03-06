'use strict';

var arrayMap = require('./internal/arrayMap');
var createOver = require('./internal/createOver');

/**
 * Creates a function that invokes `iteratees` with the arguments it receives
 * and returns their results.
 *
 * @static
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [iteratees=[_.identity]]
 *  The iteratees to invoke.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = over([Math.max, Math.min]);
 *
 * func(1, 2, 3, 4); => [4, 1]
 */
var over = createOver(arrayMap);

module.exports = over;
