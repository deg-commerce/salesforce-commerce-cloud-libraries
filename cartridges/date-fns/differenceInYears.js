'use strict';

var toDate = require('./toDate');
var differenceInCalendarYears = require('./differenceInCalendarYears');
var compareAsc = require('./compareAsc');

/**
 * @name differenceInYears
 * @category Year Helpers
 * @summary Get the number of full years between the given dates.
 *
 * @description
 * Get the number of full years between the given dates.
 *
 * ### v2.0.0 breaking changes:
 *
 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
 *
 * @param {Date|number} dirtyDateLeft - the later date
 * @param {Date|number} dirtyDateRight - the earlier date
 * @returns {number} the number of full years
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // How many full years are between 31 December 2013 and 11 February 2015?
 * var result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
 * //=> 1
 */
module.exports = function differenceInYears(dirtyDateLeft, dirtyDateRight) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var dateLeft = toDate(dirtyDateLeft);
    var dateRight = toDate(dirtyDateRight);

    var sign = compareAsc(dateLeft, dateRight);
    var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight));
    dateLeft.setFullYear(dateLeft.getFullYear() - sign * difference);

    // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
    // If so, result must be decreased by 1 in absolute value
    var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign;
    var result = sign * (difference - isLastYearNotFull);
    // Prevent negative zero
    return result === 0 ? 0 : result;
};
