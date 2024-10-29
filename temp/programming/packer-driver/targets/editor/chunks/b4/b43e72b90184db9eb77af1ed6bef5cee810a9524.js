'use strict';

System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var utils;

  function isAxiosError(payload) {
    return utils.isObject(payload) && payload.isAxiosError === true;
  }

  _export("default", isAxiosError);

  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=b43e72b90184db9eb77af1ed6bef5cee810a9524.js.map