var assert = require('assert');
var pad = require('../../../cartridges/lodash/pad');
var map = require('../../../cartridges/lodash/map');
var constant = require('../../../cartridges/lodash/constant');
var { stubTrue } = require('../helpers/stubs');

describe('pad', function () {
    var string = 'abc';

    it('should pad a string to a given length', function () {
        var values = [, undefined];
        var expected = map(values, constant(' abc  '));

        var actual = map(values, function (value, index) {
            return index ? pad(string, 6, value) : pad(string, 6);
        });

        assert.deepStrictEqual(actual, expected);
    });

    it('should truncate pad characters to fit the pad length', function () {
        assert.strictEqual(pad(string, 8), '  abc   ');
        assert.strictEqual(pad(string, 8, '_-'), '_-abc_-_');
    });

    it('should coerce `string` to a string', function () {
        var values = [Object(string), { 'toString': constant(string) }];
        var expected = map(values, stubTrue);

        var actual = map(values, function (value) {
            return pad(value, 6) === ' abc  ';
        });

        assert.deepStrictEqual(actual, expected);
    });
});
