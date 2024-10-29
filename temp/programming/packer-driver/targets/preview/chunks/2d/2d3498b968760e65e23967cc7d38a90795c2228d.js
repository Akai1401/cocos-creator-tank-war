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
        // populates missing values
        module.exports = function (dst, src) {
          Object.keys(src).forEach(function (prop) {
            dst[prop] = dst[prop] || src[prop];
          });
          return dst;
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=2d3498b968760e65e23967cc7d38a90795c2228d.js.map