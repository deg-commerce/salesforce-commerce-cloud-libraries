'use strict';

var arrayEach = require('./internal/arrayEach');
var arrayPush = require('./internal/arrayPush');
var baseFunctions = require('./internal/baseFunctions');
var copyArray = require('./internal/copyArray');
var isFunction = require('./isFunction');
var isObject = require('./isObject');
var keys = require('./keys');

/**
 * Adds all own enumerable string keyed function properties of a source
 * object to the destination object. If `object` is a function, then methods
 * are added to its prototype as well.
 *
 * **Note:** Use `runInContext` to create a pristine `lodash` function to
 * avoid conflicts caused by modifying the original.
 *
 * @static
 * @since 0.1.0
 * @category Util
 * @param {Function|Object} [object=lodash] The destination object.
 * @param {Object} source The object of functions to add.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
 * @returns {Function|Object} Returns `object`.
 * @example
 *
 * function vowels(string) {
 *   return filter(string, function(v) {
 *     return /[aeiou]/i.test(v);
 *   });
 * }
 *
 * mixin({ 'vowels': vowels });
 * vowels('fred'); => ['e']
 *
 * _('fred').vowels().value(); => ['e']
 *
 * mixin({ 'vowels': vowels }, { 'chain': false });
 * _('fred').vowels(); => ['e']
 */
function mixin(object, source, options) {
    var props = keys(source);
    var methodNames = baseFunctions(source, props);

    var chain = !(isObject(options) && 'chain' in options) || !!options.chain;
    var isFunc = isFunction(object);

    arrayEach(methodNames, function (methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
            object.prototype[methodName] = function () {
                var chainAll = this.__chain__;
                if (chain || chainAll) {
                    var result = object(this.__wrapped__);
                    var actions = result.__actions__ = copyArray(this.__actions__);

                    actions.push({ func: func, args: arguments, thisArg: object });
                    result.__chain__ = chainAll;
                    return result;
                }
                return func.apply(object, arrayPush([this.value()], arguments));
            };
        }
    });

    return object;
}

module.exports = mixin;
