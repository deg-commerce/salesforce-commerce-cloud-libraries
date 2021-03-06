'use strict';

var ary = require('./ary');

/**
 * Creates a function that accepts up to one argument, ignoring any
 * additional arguments.
 *
 * @static
 * @since 4.0.0
 * @category Function
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 * @example
 *
 * map(['6', '8', '10'], unary(parseInt)); => [6, 8, 10]
 */
function unary(func) {
    return ary(func, 1);
}

module.exports = unary;
