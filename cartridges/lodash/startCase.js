'use strict';

var createCompounder = require('./internal/createCompounder');
var upperFirst = require('./upperFirst');

/**
 * Converts `string` to
 * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
 *
 * @static
 * @since 3.1.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the start cased string.
 * @example
 *
 * startCase('--foo-bar--'); => 'Foo Bar'
 *
 * startCase('fooBar'); => 'Foo Bar'
 *
 * startCase('__FOO_BAR__'); => 'FOO BAR'
 */
var startCase = createCompounder(function (result, word, index) {
    return result + (index ? ' ' : '') + upperFirst(word);
});

module.exports = startCase;
