System.register([], function (_export, _context) {
  "use strict";

  var streamChunk, readBytes, readStream, trackStream;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

  function _AsyncGenerator(e) { var r, t; function resume(r, t) { try { var n = e[r](t), o = n.value, u = o instanceof _OverloadYield; Promise.resolve(u ? o.v : o).then(function (t) { if (u) { var i = "return" === r ? "return" : "next"; if (!o.k || t.done) return resume(i, t); t = e[i](t).value; } settle(n.done ? "return" : "normal", t); }, function (e) { resume("throw", e); }); } catch (e) { settle("throw", e); } } function settle(e, n) { switch (e) { case "return": r.resolve({ value: n, done: !0 }); break; case "throw": r.reject(n); break; default: r.resolve({ value: n, done: !1 }); } (r = r.next) ? resume(r.key, r.arg) : t = null; } this._invoke = function (e, n) { return new Promise(function (o, u) { var i = { key: e, arg: n, resolve: o, reject: u, next: null }; t ? t = t.next = i : (r = t = i, resume(e, n)); }); }, "function" != typeof e.return && (this.return = void 0); }

  function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }

  function _asyncGeneratorDelegate(t) { var e = {}, n = !1; function pump(e, r) { return n = !0, r = new Promise(function (n) { n(t[e](r)); }), { done: !1, value: new _OverloadYield(r, 1) }; } return e["undefined" != typeof Symbol && Symbol.iterator || "@@iterator"] = function () { return this; }, e.next = function (t) { return n ? (n = !1, t) : pump("next", t); }, "function" == typeof t.throw && (e.throw = function (t) { if (n) throw n = !1, t; return pump("throw", t); }), "function" == typeof t.return && (e.return = function (t) { return n ? (n = !1, t) : pump("return", t); }), e; }

  function _OverloadYield(t, e) { this.v = t, this.k = e; }

  function _asyncIterator(r) { var n, t, o, e = 2; for ("undefined" != typeof Symbol && (t = Symbol.asyncIterator, o = Symbol.iterator); e--;) { if (t && null != (n = r[t])) return n.call(r); if (o && null != (n = r[o])) return new AsyncFromSyncIterator(n.call(r)); t = "@@asyncIterator", o = "@@iterator"; } throw new TypeError("Object is not async iterable"); }

  function AsyncFromSyncIterator(r) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var n = r.done; return Promise.resolve(r.value).then(function (r) { return { value: r, done: n }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(r) { this.s = r, this.n = r.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(r) { var n = this.s.return; return void 0 === n ? Promise.resolve({ value: r, done: !0 }) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); }, throw: function _throw(r) { var n = this.s.return; return void 0 === n ? Promise.reject(r) : AsyncFromSyncIteratorContinuation(n.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(r); }

  return {
    setters: [],
    execute: function () {
      _AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, _AsyncGenerator.prototype.next = function (e) { return this._invoke("next", e); }, _AsyncGenerator.prototype.throw = function (e) { return this._invoke("throw", e); }, _AsyncGenerator.prototype.return = function (e) { return this._invoke("return", e); };

      _export("streamChunk", streamChunk = function* streamChunk(chunk, chunkSize) {
        var len = chunk.byteLength;

        if (!chunkSize || len < chunkSize) {
          yield chunk;
          return;
        }

        var pos = 0;
        var end;

        while (pos < len) {
          end = pos + chunkSize;
          yield chunk.slice(pos, end);
          pos = end;
        }
      });

      _export("readBytes", readBytes = /*#__PURE__*/function () {
        var _ref = _wrapAsyncGenerator(function* (iterable, chunkSize) {
          var _iteratorAbruptCompletion = false;
          var _didIteratorError = false;

          var _iteratorError;

          try {
            for (var _iterator = _asyncIterator(readStream(iterable)), _step; _iteratorAbruptCompletion = !(_step = yield _awaitAsyncGenerator(_iterator.next())).done; _iteratorAbruptCompletion = false) {
              var chunk = _step.value;
              {
                yield* _asyncGeneratorDelegate(_asyncIterator(streamChunk(chunk, chunkSize)), _awaitAsyncGenerator);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (_iteratorAbruptCompletion && _iterator.return != null) {
                yield _awaitAsyncGenerator(_iterator.return());
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        });

        return function readBytes(_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      readStream = /*#__PURE__*/function () {
        var _ref2 = _wrapAsyncGenerator(function* (stream) {
          if (stream[Symbol.asyncIterator]) {
            yield* _asyncGeneratorDelegate(_asyncIterator(stream), _awaitAsyncGenerator);
            return;
          }

          var reader = stream.getReader();

          try {
            for (;;) {
              var {
                done,
                value
              } = yield _awaitAsyncGenerator(reader.read());

              if (done) {
                break;
              }

              yield value;
            }
          } finally {
            yield _awaitAsyncGenerator(reader.cancel());
          }
        });

        return function readStream(_x3) {
          return _ref2.apply(this, arguments);
        };
      }();

      _export("trackStream", trackStream = (stream, chunkSize, onProgress, onFinish) => {
        var iterator = readBytes(stream, chunkSize);
        var bytes = 0;
        var done;

        var _onFinish = e => {
          if (!done) {
            done = true;
            onFinish && onFinish(e);
          }
        };

        return new ReadableStream({
          pull(controller) {
            return _asyncToGenerator(function* () {
              try {
                var {
                  done: _done,
                  value
                } = yield iterator.next();

                if (_done) {
                  _onFinish();

                  controller.close();
                  return;
                }

                var len = value.byteLength;

                if (onProgress) {
                  var loadedBytes = bytes += len;
                  onProgress(loadedBytes);
                }

                controller.enqueue(new Uint8Array(value));
              } catch (err) {
                _onFinish(err);

                throw err;
              }
            })();
          },

          cancel(reason) {
            _onFinish(reason);

            return iterator.return();
          }

        }, {
          highWaterMark: 2
        });
      });
    }
  };
});
//# sourceMappingURL=9d1d7d551ee4c54d3a1e9609ed54fc1720c4be5e.js.map