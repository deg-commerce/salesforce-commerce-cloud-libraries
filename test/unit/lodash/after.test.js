var assert = require('assert');
var times = require('.././../../cartridges/lodash/times');
var after = require('.././../../cartridges/lodash/after');
describe('after', function () {
    function afterExecutor(n, timesCount) {
        var count = 0;
        times(timesCount, after(n, function () { count++; }));
        return count;
    }

    it('should create a function that invokes `func` after `n` calls', function () {
        assert.strictEqual(afterExecutor(5, 5), 1, 'after(n) should invoke `func` after being called `n` times');
        assert.strictEqual(afterExecutor(5, 4), 0, 'after(n) should not invoke `func` before being called `n` times');
        assert.strictEqual(afterExecutor(0, 0), 0, 'after(0) should not invoke `func` immediately');
        assert.strictEqual(afterExecutor(0, 1), 1, 'after(0) should invoke `func` when called once');
    });

    it('should coerce `n` values of `NaN` to `0`', function () {
        assert.strictEqual(afterExecutor(NaN, 1), 1);
    });

    it('should use `this` binding of function', function () {
        var afterResult = after(1, function () { return ++this.count; });
        var object = { 'after': afterResult, 'count': 0 };

        object.after();
        assert.strictEqual(object.after(), 2);
        assert.strictEqual(object.count, 2);
    });
});
