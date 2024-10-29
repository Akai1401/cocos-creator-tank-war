'use strict';

System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var utils, toFormData, platform;

  function toURLEncodedForm(data, options) {
    return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
      visitor: function visitor(value, key, path, helpers) {
        if (platform.isNode && utils.isBuffer(value)) {
          this.append(key, value.toString('base64'));
          return false;
        }

        return helpers.defaultVisitor.apply(this, arguments);
      }
    }, options));
  }

  _export("default", toURLEncodedForm);

  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      toFormData = _unresolved_2.default;
    }, function (_unresolved_3) {
      platform = _unresolved_3.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=519f567d4fcd3662fd9c3b3694524577c092f116.js.map