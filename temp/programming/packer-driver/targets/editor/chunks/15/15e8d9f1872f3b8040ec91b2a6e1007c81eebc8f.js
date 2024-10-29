'use strict';

System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12", "__unresolved_13", "__unresolved_14", "__unresolved_15", "__unresolved_16"], function (_export, _context) {
  "use strict";

  var utils, bind, Axios, mergeConfig, defaults, formDataToJSON, CanceledError, CancelToken, isCancel, VERSION, toFormData, AxiosError, spread, isAxiosError, AxiosHeaders, adapters, HttpStatusCode, axios;

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   *
   * @returns {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    const context = new Axios(defaultConfig);
    const instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

    utils.extend(instance, Axios.prototype, context, {
      allOwnKeys: true
    }); // Copy context to instance

    utils.extend(instance, context, null, {
      allOwnKeys: true
    }); // Factory for creating new instances

    instance.create = function create(instanceConfig) {
      return createInstance(mergeConfig(defaultConfig, instanceConfig));
    };

    return instance;
  } // Create the default instance to be exported


  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      bind = _unresolved_2.default;
    }, function (_unresolved_3) {
      Axios = _unresolved_3.default;
    }, function (_unresolved_4) {
      mergeConfig = _unresolved_4.default;
    }, function (_unresolved_5) {
      defaults = _unresolved_5.default;
    }, function (_unresolved_6) {
      formDataToJSON = _unresolved_6.default;
    }, function (_unresolved_7) {
      CanceledError = _unresolved_7.default;
    }, function (_unresolved_8) {
      CancelToken = _unresolved_8.default;
    }, function (_unresolved_9) {
      isCancel = _unresolved_9.default;
    }, function (_unresolved_10) {
      VERSION = _unresolved_10.VERSION;
    }, function (_unresolved_11) {
      toFormData = _unresolved_11.default;
    }, function (_unresolved_12) {
      AxiosError = _unresolved_12.default;
    }, function (_unresolved_13) {
      spread = _unresolved_13.default;
    }, function (_unresolved_14) {
      isAxiosError = _unresolved_14.default;
    }, function (_unresolved_15) {
      AxiosHeaders = _unresolved_15.default;
    }, function (_unresolved_16) {
      adapters = _unresolved_16.default;
    }, function (_unresolved_17) {
      HttpStatusCode = _unresolved_17.default;
    }],
    execute: function () {
      axios = createInstance(defaults); // Expose Axios class to allow class inheritance

      axios.Axios = Axios; // Expose Cancel & CancelToken

      axios.CanceledError = CanceledError;
      axios.CancelToken = CancelToken;
      axios.isCancel = isCancel;
      axios.VERSION = VERSION;
      axios.toFormData = toFormData; // Expose AxiosError class

      axios.AxiosError = AxiosError; // alias for CanceledError for backward compatibility

      axios.Cancel = axios.CanceledError; // Expose all/spread

      axios.all = function all(promises) {
        return Promise.all(promises);
      };

      axios.spread = spread; // Expose isAxiosError

      axios.isAxiosError = isAxiosError; // Expose mergeConfig

      axios.mergeConfig = mergeConfig;
      axios.AxiosHeaders = AxiosHeaders;

      axios.formToJSON = thing => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);

      axios.getAdapter = adapters.getAdapter;
      axios.HttpStatusCode = HttpStatusCode;
      axios.default = axios; // this module should only have a default export

      _export("default", axios);
    }
  };
});
//# sourceMappingURL=15e8d9f1872f3b8040ec91b2a6e1007c81eebc8f.js.map