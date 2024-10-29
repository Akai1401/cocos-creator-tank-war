'use strict';

System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var isAbsoluteURL, combineURLs;

  function buildFullPath(baseURL, requestedURL) {
    if (baseURL && !isAbsoluteURL(requestedURL)) {
      return combineURLs(baseURL, requestedURL);
    }

    return requestedURL;
  }

  _export("default", buildFullPath);

  return {
    setters: [function (_unresolved_) {
      isAbsoluteURL = _unresolved_.default;
    }, function (_unresolved_2) {
      combineURLs = _unresolved_2.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=b00191a62fd7402173116ad2116e18e6c92b5820.js.map