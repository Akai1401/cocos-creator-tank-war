System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var utils, callbackify;
  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }],
    execute: function () {
      callbackify = (fn, reducer) => {
        return utils.isAsyncFn(fn) ? function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          var cb = args.pop();
          fn.apply(this, args).then(value => {
            try {
              reducer ? cb(null, ...reducer(value)) : cb(null, value);
            } catch (err) {
              cb(err);
            }
          }, cb);
        } : fn;
      };

      _export("default", callbackify);
    }
  };
});
//# sourceMappingURL=03ff3b9cbb92171b0be71af9dccb85e7f9f820d8.js.map