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
        module.exports = defer;
        /**
         * Runs provided function on next iteration of the event loop
         *
         * @param {function} fn - function to run
         */

        function defer(fn) {
          var nextTick = typeof setImmediate == 'function' ? setImmediate : typeof process == 'object' && typeof process.nextTick == 'function' ? process.nextTick : null;

          if (nextTick) {
            nextTick(fn);
          } else {
            setTimeout(fn, 0);
          }
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=71a915307ed7379b26cd738958d0215b7e57083b.js.map