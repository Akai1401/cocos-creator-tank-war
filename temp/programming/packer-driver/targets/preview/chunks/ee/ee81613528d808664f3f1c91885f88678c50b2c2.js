'use strict';

System.register([], function (_export, _context) {
  "use strict";

  function bind(fn, thisArg) {
    return function wrap() {
      return fn.apply(thisArg, arguments);
    };
  }

  _export("default", bind);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=ee81613528d808664f3f1c91885f88678c50b2c2.js.map