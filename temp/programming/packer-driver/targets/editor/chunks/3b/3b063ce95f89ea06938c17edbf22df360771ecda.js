System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var defer = require('./defer.js'); // API


        module.exports = async;
        /**
         * Runs provided callback asynchronously
         * even if callback itself is not
         *
         * @param   {function} callback - callback to invoke
         * @returns {function} - augmented callback
         */

        function async(callback) {
          var isAsync = false; // check if async happened

          defer(function () {
            isAsync = true;
          });
          return function async_callback(err, result) {
            if (isAsync) {
              callback(err, result);
            } else {
              defer(function nextTick_callback() {
                callback(err, result);
              });
            }
          };
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './defer.js': _req
      }));
    }
  };
});
//# sourceMappingURL=3b063ce95f89ea06938c17edbf22df360771ecda.js.map