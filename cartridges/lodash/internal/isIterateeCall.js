'use strict';

var isArrayLike = require('../isArrayLike');
var isIndex = require('./isIndex');
var isObject = require('../isObject');
var eq = require('../eq');

/**
 * Checks if the given arguments are= require(an iteratee call.);
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are= require(an iteratee call,);
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
    if (!isObject(object)) {
        return false;
    }
    var type = typeof index;
    if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
    ) {
        return eq(object[index], value);
    }
    return false;
}

module.exports = isIterateeCall;
