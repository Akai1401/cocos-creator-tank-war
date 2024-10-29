System.register([], function (_export, _context) {
  "use strict";

  /**
   * Throttle decorator
   * @param {Function} fn
   * @param {Number} freq
   * @return {Function}
   */
  function throttle(fn, freq) {
    let timestamp = 0;
    let threshold = 1000 / freq;
    let lastArgs;
    let timer;

    const invoke = (args, now = Date.now()) => {
      timestamp = now;
      lastArgs = null;

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }

      fn.apply(null, args);
    };

    const throttled = (...args) => {
      const now = Date.now();
      const passed = now - timestamp;

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

    const flush = () => lastArgs && invoke(lastArgs);

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