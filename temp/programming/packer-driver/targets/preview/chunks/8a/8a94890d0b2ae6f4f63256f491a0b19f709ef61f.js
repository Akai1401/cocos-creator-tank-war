System.register([], function (_export, _context) {
  "use strict";

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    var timestamp = 0;
    var threshold = 1000 / freq;
    var lastArgs;
    var timer;

    var invoke = function invoke(args, now) {
      if (now === void 0) {
        now = Date.now();
      }

      timestamp = now;
      lastArgs = null;

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      fn.apply(null, args);
    };

    var throttled = function throttled() {
      var now = Date.now();
      var passed = now - timestamp;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (passed >= threshold) {
        invoke(args, now);
      } else {
        lastArgs = args;

        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            invoke(lastArgs);
          }, threshold - passed);
        }
      }
    };

    var flush = () => lastArgs && invoke(lastArgs);

    return [throttled, flush];
  }

  return {
    setters: [],
    execute: function () {
      _export("default", throttle);
    }
  };
});
//# sourceMappingURL=8a94890d0b2ae6f4f63256f491a0b19f709ef61f.js.map