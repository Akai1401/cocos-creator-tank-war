'use strict';

System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var AxiosError, utils;

  /**
   * A `CanceledError` is an object that is thrown when an operation is canceled.
   *
   * @param {string=} message The message.
   * @param {Object=} config The config.
   * @param {Object=} request The request.
   *
   * @returns {CanceledError} The created error.
   */
  function CanceledError(message, config, request) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
    this.name = 'CanceledError';
  }

  return {
    setters: [function (_unresolved_) {
      AxiosError = _unresolved_.default;
    }, function (_unresolved_2) {
      utils = _unresolved_2.default;
    }],
    execute: function () {
      utils.inherits(CanceledError, AxiosError, {
        __CANCEL__: true
      });

      _export("default", CanceledError);
    }
  };
});
//# sourceMappingURL=32d3ff7a9bc159d3cf5fd3069d007696b2f2460f.js.map