'use strict';

var flatten = require('../flatten');
var overRest = require('./overRest');
var setToString = require('./setToString');

/**
 * A specialized version of `baseRest` which flattens the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @returns {Function} Returns the new function.
 */
function flatRest(func) {
    return setToString(overRest(func, undefined, flatten), func + '');
}

module.exports = flatRest;
