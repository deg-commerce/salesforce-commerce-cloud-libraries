'use strict';

var baseFindKey = require('./internal/baseFindKey');
var baseForOwnRight = require('./internal/baseForOwnRight');
var baseIteratee = require('./internal/baseIteratee');

/**
 * This method is like `findKey` except that it iterates over elements of
 * a collection in the opposite order.
 *
 * @static
 * @since 2.0.0
 * @category Object
 * @param {Object} object The object to inspect.
 * @param {Function} [predicate=identity] The function invoked per iteration.
 * @returns {string|undefined} Returns the key of the matched element,
 *  else `undefined`.
 * @example
 *
 * var users = {
 *   'barney':  { 'age': 36, 'active': true },
 *   'fred':    { 'age': 40, 'active': false },
 *   'pebbles': { 'age': 1,  'active': true }
 * };
 *
 * findLastKey(users, function(o) { return o.age < 40; }); => returns 'pebbles' assuming `findKey` returns 'barney'
 *
 * * The `_.matches` iteratee shorthand. *
 * findLastKey(users, { 'age': 36, 'active': true }); => 'barney'
 *
 * * The `_.matchesProperty` iteratee shorthand. *
 * findLastKey(users, ['active', false]); => 'fred'
 *
 * * The `_.property` iteratee shorthand. *
 * findLastKey(users, 'active'); => 'pebbles'
 */
function findLastKey(object, predicate) {
    return baseFindKey(object, baseIteratee(predicate, 3), baseForOwnRight);
}

module.exports = findLastKey;
