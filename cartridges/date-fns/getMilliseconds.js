'use strict';

var toDate = require('./toDate');

/**
 * @name getMilliseconds
 * @category Millisecond Helpers
 * @summary Get the milliseconds of the given date.
 *
 * @description
 * Get the milliseconds of the given date.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} dirtyDate - the given date
 * @returns {number} the milliseconds
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Get the milliseconds of 29 February 2012 11:45:05.123:
 * var result = getMilliseconds(new Date(2012, 1, 29, 11, 45, 5, 123))
 * //=> 123
 */
module.exports = function getMilliseconds(dirtyDate) {
    if (arguments.length < 1) {
        throw new TypeError(
            '1 argument required, but only ' + arguments.length + ' present'
        );
    }

    var date = toDate(dirtyDate);
    var milliseconds = date.getMilliseconds();
    return milliseconds;
};
