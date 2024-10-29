System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var abort = require('./abort.js'),
            async = require('./async.js'); // API


        module.exports = terminator;
        /**
         * Terminates jobs in the attached state context
         *
         * @this  AsyncKitState#
         * @param {function} callback - final callback to invoke after termination
         */

        function terminator(callback) {
          if (!Object.keys(this.jobs).length) {
            return;
          } // fast forward iteration index


          this.index = this.size; // abort jobs

          abort(this); // send back results we have so far

          async(callback)(null, this.results);
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './abort.js': _req,
        './async.js': _req0
      }));
    }
  };
});
//# sourceMappingURL=0d3788ea0619932c7b77ad7794561f5d66f368a4.js.map