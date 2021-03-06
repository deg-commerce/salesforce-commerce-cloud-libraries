'use strict';

var baseIndexOf = require('./baseIndexOf');

/**
 * Used by `trim` and `trimStart` to get the index of the first string symbol
 * that is not found in the character symbols.
 *
 * @private
 * @param {Array} strSymbols The string symbols to inspect.
 * @param {Array} chrSymbols The character symbols to find.
 * @returns {number} Returns the index of the first unmatched string symbol.
 */
function charsStartIndex(strSymbols, chrSymbols) {
    let index = -1;
    var length = strSymbols.length;

    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
        // DO NOTHING
    }
    return index;
}

module.exports = charsStartIndex;
