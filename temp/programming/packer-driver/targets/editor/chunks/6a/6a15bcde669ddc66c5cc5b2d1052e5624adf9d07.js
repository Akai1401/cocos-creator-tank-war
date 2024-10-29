System.register(["xmlhttprequest-ssl", "__unresolved_0"], function (_export, _context) {
  "use strict";

  var XMLHttpRequestModule, BaseXHR, Request, XHR, XMLHttpRequest;

  _export("XHR", void 0);

  return {
    setters: [function (_xmlhttprequestSsl) {
      XMLHttpRequestModule = _xmlhttprequestSsl;
    }, function (_unresolved_) {
      BaseXHR = _unresolved_.BaseXHR;
      Request = _unresolved_.Request;
    }],
    execute: function () {
      XMLHttpRequest = XMLHttpRequestModule.default || XMLHttpRequestModule;
      /**
       * HTTP long-polling based on the `XMLHttpRequest` object provided by the `xmlhttprequest-ssl` package.
       *
       * Usage: Node.js, Deno (compat), Bun (compat)
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
       */

      _export("XHR", XHR = class XHR extends BaseXHR {
        request(opts = {}) {
          var _a;

          Object.assign(opts, {
            xd: this.xd,
            cookieJar: (_a = this.socket) === null || _a === void 0 ? void 0 : _a._cookieJar
          }, this.opts);
          return new Request(opts => new XMLHttpRequest(opts), this.uri(), opts);
        }

      });
    }
  };
});
//# sourceMappingURL=6a15bcde669ddc66c5cc5b2d1052e5624adf9d07.js.map