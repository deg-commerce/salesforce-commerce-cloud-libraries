'use strict';

var isWeekend = require('./isWeekend');
var toDate = require('./toDate');
var toInteger = require('./_lib/toInteger/index');

/**
 * @name addBusinessDays
 * @category Day Helpers
 * @summary Add the specified number of business days (mon - fri) to the given date.
 *
 * @description
 * Add the specified number of business days (mon - fri) to the given date, ignoring weekends.
 *
 * @param {Date|number} dirtyDate - the date to be changed
 * @param {number} dirtyAmount - the amount of business days to be added
 * @returns {Date} the new date with the business days added
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Add 10 business days to 1 September 2014:
 * var result = addBusinessDays(new Date(2014, 8, 1), 10)
 * //=> Mon Sep 15 2014 00:00:00 (skipped weekend days)
 */
module.exports = function addBusinessDays(dirtyDate, dirtyAmount) {
    if (arguments.length < 2) {
        throw new TypeError(
            '2 arguments required, but only ' + arguments.length + ' present'
        );
    }

    var date = toDate(dirtyDate);
    var amount = toInteger(dirtyAmount);

    if (isNaN(amount)) return new Date(NaN);

    var hours = date.getHours();
    var numWeekDays = 0;
    while (numWeekDays < amount) {
        date.setDate(date.getDate() + 1);
        date.setHours(hours);
        if (!isWeekend(date)) numWeekDays++;
    }

    return date;
};
