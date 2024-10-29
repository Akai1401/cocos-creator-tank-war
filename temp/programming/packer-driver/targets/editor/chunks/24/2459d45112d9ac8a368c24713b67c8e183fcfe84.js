System.register([], function (_export, _context) {
  "use strict";

  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  _export("on", on);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=2459d45112d9ac8a368c24713b67c8e183fcfe84.js.map