System.register([], function (_export, _context) {
  "use strict";

  var hasBrowserEnv, _navigator, hasStandardBrowserEnv, hasStandardBrowserWebWorkerEnv, origin;

  return {
    setters: [],
    execute: function () {
      _export("hasBrowserEnv", hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined');

      _export("navigator", _navigator = typeof navigator === 'object' && navigator || undefined);
      /**
       * Determine if we're running in a standard browser environment
       *
       * This allows axios to run in a web worker, and react-native.
       * Both environments support XMLHttpRequest, but not fully standard globals.
       *
       * web workers:
       *  typeof window -> undefined
       *  typeof document -> undefined
       *
       * react-native:
       *  navigator.product -> 'ReactNative'
       * nativescript
       *  navigator.product -> 'NativeScript' or 'NS'
       *
       * @returns {boolean}
       */


      _export("hasStandardBrowserEnv", hasStandardBrowserEnv = hasBrowserEnv && (!_navigator || ['ReactNative', 'NativeScript', 'NS'].indexOf(_navigator.product) < 0));
      /**
       * Determine if we're running in a standard browser webWorker environment
       *
       * Although the `isStandardBrowserEnv` method indicates that
       * `allows axios to run in a web worker`, the WebWorker will still be
       * filtered out due to its judgment standard
       * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
       * This leads to a problem when axios post `FormData` in webWorker
       */


      _export("hasStandardBrowserWebWorkerEnv", hasStandardBrowserWebWorkerEnv = (() => {
        return typeof WorkerGlobalScope !== 'undefined' && // eslint-disable-next-line no-undef
        self instanceof WorkerGlobalScope && typeof self.importScripts === 'function';
      })());

      _export("origin", origin = hasBrowserEnv && window.location.href || 'http://localhost');
    }
  };
});
//# sourceMappingURL=c70a632ac331bf43f19b5eaa859cc71cff14179d.js.map