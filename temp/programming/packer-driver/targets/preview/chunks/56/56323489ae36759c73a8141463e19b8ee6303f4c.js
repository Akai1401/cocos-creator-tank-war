System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, _parallel, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req1 = _unresolved_4.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        module.exports = {
          parallel: require('./parallel.js'),
          serial: require('./serial.js'),
          serialOrdered: require('./serialOrdered.js')
        }; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);

        _parallel = module.exports.parallel;
      }, () => ({
        './parallel.js': _req,
        './serial.js': _req0,
        './serialOrdered.js': _req1
      }));
    }
  };
});
//# sourceMappingURL=56323489ae36759c73a8141463e19b8ee6303f4c.js.map