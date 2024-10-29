'use strict';

System.register([], function (_export, _context) {
  "use strict";

  function parseProtocol(url) {
    const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
    return match && match[1] || '';
  }

  _export("default", parseProtocol);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=2cda94166be1f17ac2b62ee340fe6e1fd622ae7e.js.map