'use strict';

var basePick = require('./internal/basePick');
var flatRest = require('./internal/flatRest');

/**
 * Creates an object composed of the picked `object` properties.
 *
 * @static
 * @since 0.1.0
 * @category Object
 * @param {Object} object The source object.
 * @param {...(string|string[])} [paths] The property paths to pick.
 * @returns {Object} Returns the new object.
 * @example
 *
 * var object = { 'a': 1, 'b': '2', 'c': 3 };
 *
 * pick(object, ['a', 'c']); => { 'a': 1, 'c': 3 }
 */
var pick = flatRest(function (object, paths) {
    return object == null ? {} : basePick(object, paths);
});

module.exports = pick;
