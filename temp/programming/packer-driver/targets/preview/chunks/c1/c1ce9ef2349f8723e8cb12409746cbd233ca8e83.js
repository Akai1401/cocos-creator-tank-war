System.register(["util", "stream", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var TextEncoder, Readable, utils, readBlob, FormDataPart, BOUNDARY_ALPHABET, textEncoder, CRLF, CRLF_BYTES, CRLF_BYTES_COUNT, formDataToStream;

  function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

  function _AsyncGenerator(e) { var r, t; function resume(r, t) { try { var n = e[r](t), o = n.value, u = o instanceof _OverloadYield; Promise.resolve(u ? o.v : o).then(function (t) { if (u) { var i = "return" === r ? "return" : "next"; if (!o.k || t.done) return resume(i, t); t = e[i](t).value; } settle(n.done ? "return" : "normal", t); }, function (e) { resume("throw", e); }); } catch (e) { settle("throw", e); } } function settle(e, n) { switch (e) { case "return": r.resolve({ value: n, done: !0 }); break; case "throw": r.reject(n); break; default: r.resolve({ value: n, done: !1 }); } (r = r.next) ? resume(r.key, r.arg) : t = null; } this._invoke = function (e, n) { return new Promise(function (o, u) { var i = { key: e, arg: n, resolve: o, reject: u, next: null }; t ? t = t.next = i : (r = t = i, resume(e, n)); }); }, "function" != typeof e.return && (this.return = void 0); }

  function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }

  function _asyncGeneratorDelegate(t) { var e = {}, n = !1; function pump(e, r) { return n = !0, r = new Promise(function (n) { n(t[e](r)); }), { done: !1, value: new _OverloadYield(r, 1) }; } return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function () { return this; }, e.next = function (t) { return n ? (n = !1, t) : pump("next", t); }, "function" == typeof t.throw && (e.throw = function (t) { if (n) throw n = !1, t; return pump("throw", t); }), "function" == typeof t.return && (e.return = function (t) { return n ? (n = !1, t) : pump("return", t); }), e; }

  function _OverloadYield(t, e) { this.v = t, this.k = e; }

  function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

  function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }

  return {
    setters: [function (_util) {
      TextEncoder = _util.TextEncoder;
    }, function (_stream) {
      Readable = _stream.Readable;
    }, function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      readBlob = _unresolved_2.default;
    }],
    execute: function () {
      _AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, _AsyncGenerator.prototype.next = function (e) { return this._invoke("next", e); }, _AsyncGenerator.prototype.throw = function (e) { return this._invoke("throw", e); }, _AsyncGenerator.prototype.return = function (e) { return this._invoke("return", e); };
      BOUNDARY_ALPHABET = utils.ALPHABET.ALPHA_DIGIT + '-_';
      textEncoder = new TextEncoder();
      CRLF = '\r\n';
      CRLF_BYTES = textEncoder.encode(CRLF);
      CRLF_BYTES_COUNT = 2;
      FormDataPart = class FormDataPart {
        constructor(name, value) {
          var {
            escapeName
          } = this.constructor;
          var isStringValue = utils.isString(value);
          var headers = "Content-Disposition: form-data; name=\"" + escapeName(name) + "\"" + (!isStringValue && value.name ? "; filename=\"" + escapeName(value.name) + "\"" : '') + CRLF;

          if (isStringValue) {
            value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
          } else {
            headers += "Content-Type: " + (value.type || "application/octet-stream") + CRLF;
          }

          this.headers = textEncoder.encode(headers + CRLF);
          this.contentLength = isStringValue ? value.byteLength : value.size;
          this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
          this.name = name;
          this.value = value;
        }

        encode() {
          var _this = this;

          return _wrapAsyncGenerator(function* () {
            yield _this.headers;
            var {
              value
            } = _this;

            if (utils.isTypedArray(value)) {
              yield value;
            } else {
              yield* _asyncGeneratorDelegate(_asyncIterator(readBlob(value)), _awaitAsyncGenerator);
            }

            yield CRLF_BYTES;
          })();
        }

        static escapeName(name) {
          return String(name).replace(/[\r\n"]/g, match => ({
            '\r': '%0D',
            '\n': '%0A',
            '"': '%22'
          })[match]);
        }

      };

      formDataToStream = (form, headersHandler, options) => {
        var {
          tag = 'form-data-boundary',
          size = 25,
          boundary = tag + '-' + utils.generateString(size, BOUNDARY_ALPHABET)
        } = options || {};

        if (!utils.isFormData(form)) {
          throw TypeError('FormData instance required');
        }

        if (boundary.length < 1 || boundary.length > 70) {
          throw Error('boundary must be 10-70 characters long');
        }

        var boundaryBytes = textEncoder.encode('--' + boundary + CRLF);
        var footerBytes = textEncoder.encode('--' + boundary + '--' + CRLF + CRLF);
        var contentLength = footerBytes.byteLength;
        var parts = Array.from(form.entries()).map(_ref2 => {
          var [name, value] = _ref2;
          var part = new FormDataPart(name, value);
          contentLength += part.size;
          return part;
        });
        contentLength += boundaryBytes.byteLength * parts.length;
        contentLength = utils.toFiniteNumber(contentLength);
        var computedHeaders = {
          'Content-Type': "multipart/form-data; boundary=" + boundary
        };

        if (Number.isFinite(contentLength)) {
          computedHeaders['Content-Length'] = contentLength;
        }

        headersHandler && headersHandler(computedHeaders);
        return Readable.from(_wrapAsyncGenerator(function* () {
          for (var part of parts) {
            yield boundaryBytes;
            yield* _asyncGeneratorDelegate(_asyncIterator(part.encode()), _awaitAsyncGenerator);
          }

          yield footerBytes;
        })());
      };

      _export("default", formDataToStream);
    }
  };
});
//# sourceMappingURL=c1ce9ef2349f8723e8cb12409746cbd233ca8e83.js.map