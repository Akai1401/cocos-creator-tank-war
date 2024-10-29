System.register(["__unresolved_0", "util", "stream", "delayed-stream"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_util) {
      _req = _util.__cjsMetaURL;
    }, function (_stream) {
      _req0 = _stream.__cjsMetaURL;
    }, function (_delayedStream) {
      _req1 = _delayedStream.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var util = require('util');

        var Stream = require('stream').Stream;

        var DelayedStream = require('delayed-stream');

        module.exports = CombinedStream;

        function CombinedStream() {
          this.writable = false;
          this.readable = true;
          this.dataSize = 0;
          this.maxDataSize = 2 * 1024 * 1024;
          this.pauseStreams = true;
          this._released = false;
          this._streams = [];
          this._currentStream = null;
          this._insideLoop = false;
          this._pendingNext = false;
        }

        util.inherits(CombinedStream, Stream);

        CombinedStream.create = function (options) {
          var combinedStream = new this();
          options = options || {};

          for (var option in options) {
            combinedStream[option] = options[option];
          }

          return combinedStream;
        };

        CombinedStream.isStreamLike = function (stream) {
          return typeof stream !== 'function' && typeof stream !== 'string' && typeof stream !== 'boolean' && typeof stream !== 'number' && !Buffer.isBuffer(stream);
        };

        CombinedStream.prototype.append = function (stream) {
          var isStreamLike = CombinedStream.isStreamLike(stream);

          if (isStreamLike) {
            if (!(stream instanceof DelayedStream)) {
              var newStream = DelayedStream.create(stream, {
                maxDataSize: Infinity,
                pauseStream: this.pauseStreams
              });
              stream.on('data', this._checkDataSize.bind(this));
              stream = newStream;
            }

            this._handleErrors(stream);

            if (this.pauseStreams) {
              stream.pause();
            }
          }

          this._streams.push(stream);

          return this;
        };

        CombinedStream.prototype.pipe = function (dest, options) {
          Stream.prototype.pipe.call(this, dest, options);
          this.resume();
          return dest;
        };

        CombinedStream.prototype._getNext = function () {
          this._currentStream = null;

          if (this._insideLoop) {
            this._pendingNext = true;
            return; // defer call
          }

          this._insideLoop = true;

          try {
            do {
              this._pendingNext = false;

              this._realGetNext();
            } while (this._pendingNext);
          } finally {
            this._insideLoop = false;
          }
        };

        CombinedStream.prototype._realGetNext = function () {
          var stream = this._streams.shift();

          if (typeof stream == 'undefined') {
            this.end();
            return;
          }

          if (typeof stream !== 'function') {
            this._pipeNext(stream);

            return;
          }

          var getStream = stream;
          getStream(function (stream) {
            var isStreamLike = CombinedStream.isStreamLike(stream);

            if (isStreamLike) {
              stream.on('data', this._checkDataSize.bind(this));

              this._handleErrors(stream);
            }

            this._pipeNext(stream);
          }.bind(this));
        };

        CombinedStream.prototype._pipeNext = function (stream) {
          this._currentStream = stream;
          var isStreamLike = CombinedStream.isStreamLike(stream);

          if (isStreamLike) {
            stream.on('end', this._getNext.bind(this));
            stream.pipe(this, {
              end: false
            });
            return;
          }

          var value = stream;
          this.write(value);

          this._getNext();
        };

        CombinedStream.prototype._handleErrors = function (stream) {
          var self = this;
          stream.on('error', function (err) {
            self._emitError(err);
          });
        };

        CombinedStream.prototype.write = function (data) {
          this.emit('data', data);
        };

        CombinedStream.prototype.pause = function () {
          if (!this.pauseStreams) {
            return;
          }

          if (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == 'function') this._currentStream.pause();
          this.emit('pause');
        };

        CombinedStream.prototype.resume = function () {
          if (!this._released) {
            this._released = true;
            this.writable = true;

            this._getNext();
          }

          if (this.pauseStreams && this._currentStream && typeof this._currentStream.resume == 'function') this._currentStream.resume();
          this.emit('resume');
        };

        CombinedStream.prototype.end = function () {
          this._reset();

          this.emit('end');
        };

        CombinedStream.prototype.destroy = function () {
          this._reset();

          this.emit('close');
        };

        CombinedStream.prototype._reset = function () {
          this.writable = false;
          this._streams = [];
          this._currentStream = null;
        };

        CombinedStream.prototype._checkDataSize = function () {
          this._updateDataSize();

          if (this.dataSize <= this.maxDataSize) {
            return;
          }

          var message = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';

          this._emitError(new Error(message));
        };

        CombinedStream.prototype._updateDataSize = function () {
          this.dataSize = 0;
          var self = this;

          this._streams.forEach(function (stream) {
            if (!stream.dataSize) {
              return;
            }

            self.dataSize += stream.dataSize;
          });

          if (this._currentStream && this._currentStream.dataSize) {
            this.dataSize += this._currentStream.dataSize;
          }
        };

        CombinedStream.prototype._emitError = function (err) {
          this._reset();

          this.emit('error', err);
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        'util': _req,
        'stream': _req0,
        'delayed-stream': _req1
      }));
    }
  };
});
//# sourceMappingURL=6c4cb29754eae8e1ec6dce2ef4177a76808f890d.js.map