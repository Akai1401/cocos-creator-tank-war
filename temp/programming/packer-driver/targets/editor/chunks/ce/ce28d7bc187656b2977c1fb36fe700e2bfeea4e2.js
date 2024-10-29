System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        // API
        module.exports = abort;
        /**
         * Aborts leftover active jobs
         *
         * @param {object} state - current state object
         */

        function abort(state) {
          Object.keys(state.jobs).forEach(clean.bind(state)); // reset leftover jobs

          state.jobs = {};
        }
        /**
         * Cleans up leftover job by invoking abort function for the provided job id
         *
         * @this  state
         * @param {string|number} key - job id to abort
         */


        function clean(key) {
          if (typeof this.jobs[key] == 'function') {
            this.jobs[key]();
          }
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=ce28d7bc187656b2977c1fb36fe700e2bfeea4e2.js.map