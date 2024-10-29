System.register(["__unresolved_0", "@socket.io/component-emitter", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var Polling, Emitter, installTimerFunctions, pick, globalThis, hasCORS, BaseXHR, Request, XHR, terminationEvent, hasXHR2;

  function empty() {}

  function unloadHandler() {
    for (let i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }

  function newRequest(opts) {
    const xdomain = opts.xdomain; // XMLHttpRequest can be disabled on IE

    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {}

    if (!xdomain) {
      try {
        return new globalThis[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {}
    }
  }

  _export({
    BaseXHR: void 0,
    Request: void 0,
    XHR: void 0
  });

  return {
    setters: [function (_unresolved_) {
      Polling = _unresolved_.Polling;
    }, function (_socketIoComponentEmitter) {
      Emitter = _socketIoComponentEmitter.Emitter;
    }, function (_unresolved_2) {
      installTimerFunctions = _unresolved_2.installTimerFunctions;
      pick = _unresolved_2.pick;
    }, function (_unresolved_3) {
      globalThis = _unresolved_3.globalThisShim;
    }, function (_unresolved_4) {
      hasCORS = _unresolved_4.hasCORS;
    }],
    execute: function () {
      _export("BaseXHR", BaseXHR = class BaseXHR extends Polling {
        /**
         * XHR Polling constructor.
         *
         * @param {Object} opts
         * @package
         */
        constructor(opts) {
          super(opts);

          if (typeof location !== "undefined") {
            const isSSL = "https:" === location.protocol;
            let port = location.port; // some user agents have empty `location.port`

            if (!port) {
              port = isSSL ? "443" : "80";
            }

            this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
          }
        }
        /**
         * Sends data.
         *
         * @param {String} data to send.
         * @param {Function} called upon flush.
         * @private
         */


        doWrite(data, fn) {
          const req = this.request({
            method: "POST",
            data: data
          });
          req.on("success", fn);
          req.on("error", (xhrStatus, context) => {
            this.onError("xhr post error", xhrStatus, context);
          });
        }
        /**
         * Starts a poll cycle.
         *
         * @private
         */


        doPoll() {
          const req = this.request();
          req.on("data", this.onData.bind(this));
          req.on("error", (xhrStatus, context) => {
            this.onError("xhr poll error", xhrStatus, context);
          });
          this.pollXhr = req;
        }

      });

      _export("Request", Request = class Request extends Emitter {
        /**
         * Request constructor
         *
         * @param {Object} options
         * @package
         */
        constructor(createRequest, uri, opts) {
          super();
          this.createRequest = createRequest;
          installTimerFunctions(this, opts);
          this._opts = opts;
          this._method = opts.method || "GET";
          this._uri = uri;
          this._data = undefined !== opts.data ? opts.data : null;

          this._create();
        }
        /**
         * Creates the XHR object and sends the request.
         *
         * @private
         */


        _create() {
          var _a;

          const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
          opts.xdomain = !!this._opts.xd;
          const xhr = this._xhr = this.createRequest(opts);

          try {
            xhr.open(this._method, this._uri, true);

            try {
              if (this._opts.extraHeaders) {
                // @ts-ignore
                xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);

                for (let i in this._opts.extraHeaders) {
                  if (this._opts.extraHeaders.hasOwnProperty(i)) {
                    xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
                  }
                }
              }
            } catch (e) {}

            if ("POST" === this._method) {
              try {
                xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
              } catch (e) {}
            }

            try {
              xhr.setRequestHeader("Accept", "*/*");
            } catch (e) {}

            (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr); // ie6 check

            if ("withCredentials" in xhr) {
              xhr.withCredentials = this._opts.withCredentials;
            }

            if (this._opts.requestTimeout) {
              xhr.timeout = this._opts.requestTimeout;
            }

            xhr.onreadystatechange = () => {
              var _a;

              if (xhr.readyState === 3) {
                (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies( // @ts-ignore
                xhr.getResponseHeader("set-cookie"));
              }

              if (4 !== xhr.readyState) return;

              if (200 === xhr.status || 1223 === xhr.status) {
                this._onLoad();
              } else {
                // make sure the `error` event handler that's user-set
                // does not throw in the same tick and gets caught here
                this.setTimeoutFn(() => {
                  this._onError(typeof xhr.status === "number" ? xhr.status : 0);
                }, 0);
              }
            };

            xhr.send(this._data);
          } catch (e) {
            // Need to defer since .create() is called directly from the constructor
            // and thus the 'error' event can only be only bound *after* this exception
            // occurs.  Therefore, also, we cannot throw here at all.
            this.setTimeoutFn(() => {
              this._onError(e);
            }, 0);
            return;
          }

          if (typeof document !== "undefined") {
            this._index = Request.requestsCount++;
            Request.requests[this._index] = this;
          }
        }
        /**
         * Called upon error.
         *
         * @private
         */


        _onError(err) {
          this.emitReserved("error", err, this._xhr);

          this._cleanup(true);
        }
        /**
         * Cleans up house.
         *
         * @private
         */


        _cleanup(fromError) {
          if ("undefined" === typeof this._xhr || null === this._xhr) {
            return;
          }

          this._xhr.onreadystatechange = empty;

          if (fromError) {
            try {
              this._xhr.abort();
            } catch (e) {}
          }

          if (typeof document !== "undefined") {
            delete Request.requests[this._index];
          }

          this._xhr = null;
        }
        /**
         * Called upon load.
         *
         * @private
         */


        _onLoad() {
          const data = this._xhr.responseText;

          if (data !== null) {
            this.emitReserved("data", data);
            this.emitReserved("success");

            this._cleanup();
          }
        }
        /**
         * Aborts the request.
         *
         * @package
         */


        abort() {
          this._cleanup();
        }

      });

      Request.requestsCount = 0;
      Request.requests = {};
      /**
       * Aborts pending requests when unloading the window. This is needed to prevent
       * memory leaks (e.g. when using IE) and to ensure that no spurious error is
       * emitted.
       */

      if (typeof document !== "undefined") {
        // @ts-ignore
        if (typeof attachEvent === "function") {
          // @ts-ignore
          attachEvent("onunload", unloadHandler);
        } else if (typeof addEventListener === "function") {
          terminationEvent = "onpagehide" in globalThis ? "pagehide" : "unload";
          addEventListener(terminationEvent, unloadHandler, false);
        }
      }

      hasXHR2 = function () {
        const xhr = newRequest({
          xdomain: false
        });
        return xhr && xhr.responseType !== null;
      }();
      /**
       * HTTP long-polling based on the built-in `XMLHttpRequest` object.
       *
       * Usage: browser
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
       */


      _export("XHR", XHR = class XHR extends BaseXHR {
        constructor(opts) {
          super(opts);
          const forceBase64 = opts && opts.forceBase64;
          this.supportsBinary = hasXHR2 && !forceBase64;
        }

        request(opts = {}) {
          Object.assign(opts, {
            xd: this.xd
          }, this.opts);
          return new Request(newRequest, this.uri(), opts);
        }

      });
    }
  };
});
//# sourceMappingURL=aa1c5aabf756e47a354ea8d35f06f256cccb5af8.js.map