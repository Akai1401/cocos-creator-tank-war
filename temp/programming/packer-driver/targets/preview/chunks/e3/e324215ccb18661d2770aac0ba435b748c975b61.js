System.register([], function (_export, _context) {
  "use strict";

  var value, hasCORS;
  return {
    setters: [],
    execute: function () {
      // imported from https://github.com/component/has-cors
      value = false;

      try {
        value = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
      } catch (err) {// if XMLHttp support is disabled in IE then it will throw
        // when trying to create
      }

      _export("hasCORS", hasCORS = value);
    }
  };
});
//# sourceMappingURL=e324215ccb18661d2770aac0ba435b748c975b61.js.map