System.register(["ws", "__unresolved_0"], function (_export, _context) {
  "use strict";

  var WebSocket, BaseWS, WS;

  _export("WS", void 0);

  return {
    setters: [function (_ws) {
      WebSocket = _ws.WebSocket;
    }, function (_unresolved_) {
      BaseWS = _unresolved_.BaseWS;
    }],
    execute: function () {
      /**
       * WebSocket transport based on the `WebSocket` object provided by the `ws` package.
       *
       * Usage: Node.js, Deno (compat), Bun (compat)
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
       * @see https://caniuse.com/mdn-api_websocket
       */
      _export("WS", WS = class WS extends BaseWS {
        createSocket(uri, protocols, opts) {
          var _a;

          if ((_a = this.socket) === null || _a === void 0 ? void 0 : _a._cookieJar) {
            opts.headers = opts.headers || {};
            opts.headers.cookie = typeof opts.headers.cookie === "string" ? [opts.headers.cookie] : opts.headers.cookie || [];

            for (const [name, cookie] of this.socket._cookieJar.cookies) {
              opts.headers.cookie.push(`${name}=${cookie.value}`);
            }
          }

          return new WebSocket(uri, protocols, opts);
        }

        doWrite(packet, data) {
          const opts = {};

          if (packet.options) {
            opts.compress = packet.options.compress;
          }

          if (this.opts.perMessageDeflate) {
            const len = // @ts-ignore
            "string" === typeof data ? Buffer.byteLength(data) : data.length;

            if (len < this.opts.perMessageDeflate.threshold) {
              opts.compress = false;
            }
          }

          this.ws.send(data, opts);
        }

      });
    }
  };
});
//# sourceMappingURL=370d6d112745116bc0a0b5aa6b6fd3fd554e214c.js.map