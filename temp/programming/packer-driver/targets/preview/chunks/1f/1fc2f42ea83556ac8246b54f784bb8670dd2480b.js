'use strict';
/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */

System.register([], function (_export, _context) {
  "use strict";

  function speedometer(samplesCount, min) {
    samplesCount = samplesCount || 10;
    var bytes = new Array(samplesCount);
    var timestamps = new Array(samplesCount);
    var head = 0;
    var tail = 0;
    var firstSampleTS;
    min = min !== undefined ? min : 1000;
    return function push(chunkLength) {
      var now = Date.now();
      var startedAt = timestamps[tail];

      if (!firstSampleTS) {
        firstSampleTS = now;
      }

      bytes[head] = chunkLength;
      timestamps[head] = now;
      var i = tail;
      var bytesCount = 0;

      while (i !== head) {
        bytesCount += bytes[i++];
        i = i % samplesCount;
      }

      head = (head + 1) % samplesCount;

      if (head === tail) {
        tail = (tail + 1) % samplesCount;
      }

      if (now - firstSampleTS < min) {
        return;
      }

      var passed = startedAt && now - startedAt;
      return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
    };
  }

  return {
    setters: [],
    execute: function () {
      _export("default", speedometer);
    }
  };
});
//# sourceMappingURL=1fc2f42ea83556ac8246b54f784bb8670dd2480b.js.map