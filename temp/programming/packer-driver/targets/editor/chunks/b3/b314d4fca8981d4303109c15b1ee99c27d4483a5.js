System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var CanceledError, AxiosError, utils, composeSignals;
  return {
    setters: [function (_unresolved_) {
      CanceledError = _unresolved_.default;
    }, function (_unresolved_2) {
      AxiosError = _unresolved_2.default;
    }, function (_unresolved_3) {
      utils = _unresolved_3.default;
    }],
    execute: function () {
      composeSignals = (signals, timeout) => {
        const {
          length
        } = signals = signals ? signals.filter(Boolean) : [];

        if (timeout || length) {
          let controller = new AbortController();
          let aborted;

          const onabort = function (reason) {
            if (!aborted) {
              aborted = true;
              unsubscribe();
              const err = reason instanceof Error ? reason : this.reason;
              controller.abort(err instanceof AxiosError ? err : new CanceledError(err instanceof Error ? err.message : err));
            }
          };

          let timer = timeout && setTimeout(() => {
            timer = null;
            onabort(new AxiosError(`timeout ${timeout} of ms exceeded`, AxiosError.ETIMEDOUT));
          }, timeout);

          const unsubscribe = () => {
            if (signals) {
              timer && clearTimeout(timer);
              timer = null;
              signals.forEach(signal => {
                signal.unsubscribe ? signal.unsubscribe(onabort) : signal.removeEventListener('abort', onabort);
              });
              signals = null;
            }
          };

          signals.forEach(signal => signal.addEventListener('abort', onabort));
          const {
            signal
          } = controller;

          signal.unsubscribe = () => utils.asap(unsubscribe);

          return signal;
        }
      };

      _export("default", composeSignals);
    }
  };
});
//# sourceMappingURL=b314d4fca8981d4303109c15b1ee99c27d4483a5.js.map