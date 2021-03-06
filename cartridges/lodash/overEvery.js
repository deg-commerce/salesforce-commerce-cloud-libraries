'use strict';

var arrayEvery = require('./internal/arrayEvery');
var createOver = require('./internal/createOver');

/**
 * Creates a function that checks if **all** of the `predicates` return
 * truthy when invoked with the arguments it receives.
 *
 * @static
 * @since 4.0.0
 * @category Util
 * @param {...(Function|Function[])} [predicates=[_.identity]]
 *  The predicates to check.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var func = overEvery([Boolean, isFinite]);
 *
 * func('1'); => true
 *
 * func(null); => false
 *
 * func(NaN); => false
 */
var overEvery = createOver(arrayEvery);

module.exports = overEvery;
