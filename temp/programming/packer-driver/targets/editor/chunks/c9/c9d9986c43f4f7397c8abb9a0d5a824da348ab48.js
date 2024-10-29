'use strict';

System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5"], function (_export, _context) {
  "use strict";

  var transformData, isCancel, defaults, CanceledError, AxiosHeaders, adapters;

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   *
   * @param {Object} config The config that is to be used for the request
   *
   * @returns {void}
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }

    if (config.signal && config.signal.aborted) {
      throw new CanceledError(null, config);
    }
  }
  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   *
   * @returns {Promise} The Promise to be fulfilled
   */


  function dispatchRequest(config) {
    throwIfCancellationRequested(config);
    config.headers = AxiosHeaders.from(config.headers); // Transform request data

    config.data = transformData.call(config, config.transformRequest);

    if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
      config.headers.setContentType('application/x-www-form-urlencoded', false);
    }

    const adapter = adapters.getAdapter(config.adapter || defaults.adapter);
    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config); // Transform response data

      response.data = transformData.call(config, config.transformResponse, response);
      response.headers = AxiosHeaders.from(response.headers);
      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config); // Transform response data

        if (reason && reason.response) {
          reason.response.data = transformData.call(config, config.transformResponse, reason.response);
          reason.response.headers = AxiosHeaders.from(reason.response.headers);
        }
      }

      return Promise.reject(reason);
    });
  }

  _export("default", dispatchRequest);

  return {
    setters: [function (_unresolved_) {
      transformData = _unresolved_.default;
    }, function (_unresolved_2) {
      isCancel = _unresolved_2.default;
    }, function (_unresolved_3) {
      defaults = _unresolved_3.default;
    }, function (_unresolved_4) {
      CanceledError = _unresolved_4.default;
    }, function (_unresolved_5) {
      AxiosHeaders = _unresolved_5.default;
    }, function (_unresolved_6) {
      adapters = _unresolved_6.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=c9d9986c43f4f7397c8abb9a0d5a824da348ab48.js.map