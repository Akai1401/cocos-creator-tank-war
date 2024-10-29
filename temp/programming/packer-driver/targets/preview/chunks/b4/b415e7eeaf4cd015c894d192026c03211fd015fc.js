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
        var serialOrdered = require('./serialOrdered.js'); // Public API


        module.exports = serial;
        /**
         * Runs iterator over provided array elements in series
         *
         * @param   {array|object} list - array or object (named list) to iterate over
         * @param   {function} iterator - iterator to run
         * @param   {function} callback - invoked when all elements processed
         * @returns {function} - jobs terminator
         */

        function serial(list, iterator, callback) {
          return serialOrdered(list, iterator, null, callback);
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './serialOrdered.js': _req
      }));
    }
  };
});
//# sourceMappingURL=b415e7eeaf4cd015c894d192026c03211fd015fc.js.map