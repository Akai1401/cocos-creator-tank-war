System.register(["__unresolved_0", "stream", "util"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_stream) {
      _req = _stream.__cjsMetaURL;
    }, function (_util) {
      _req0 = _util.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var Stream = require('stream').Stream;

        var util = require('util');

        module.exports = DelayedStream;

        function DelayedStream() {
          this.source = null;
          this.dataSize = 0;
          this.maxDataSize = 1024 * 1024;
          this.pauseStream = true;
          this._maxDataSizeExceeded = false;
          this._released = false;
          this._bufferedEvents = [];
        }

        util.inherits(DelayedStream, Stream);

        DelayedStream.create = function (source, options) {
          var delayedStream = new this();
          options = options || {};

          for (var option in options) {
            delayedStream[option] = options[option];
          }

          delayedStream.source = source;
          var realEmit = source.emit;

          source.emit = function () {
            delayedStream._handleEmit(arguments);

            return realEmit.apply(source, arguments);
          };

          source.on('error', function () {});

          if (delayedStream.pauseStream) {
            source.pause();
          }

          return delayedStream;
        };

        Object.defineProperty(DelayedStream.prototype, 'readable', {
          configurable: true,
          enumerable: true,
          get: function () {
            return this.source.readable;
          }
        });

        DelayedStream.prototype.setEncoding = function () {
          return this.source.setEncoding.apply(this.source, arguments);
        };

        DelayedStream.prototype.resume = function () {
          if (!this._released) {
            this.release();
          }

          this.source.resume();
        };

        DelayedStream.prototype.pause = function () {
          this.source.pause();
        };

        DelayedStream.prototype.release = function () {
          this._released = true;

          this._bufferedEvents.forEach(function (args) {
            this.emit.apply(this, args);
          }.bind(this));

          this._bufferedEvents = [];
        };

        DelayedStream.prototype.pipe = function () {
          var r = Stream.prototype.pipe.apply(this, arguments);
          this.resume();
          return r;
        };

        DelayedStream.prototype._handleEmit = function (args) {
          if (this._released) {
            this.emit.apply(this, args);
            return;
          }

          if (args[0] === 'data') {
            this.dataSize += args[1].length;

            this._checkIfMaxDataSizeExceeded();
          }

          this._bufferedEvents.push(args);
        };

        DelayedStream.prototype._checkIfMaxDataSizeExceeded = function () {
          if (this._maxDataSizeExceeded) {
            return;
          }

          if (this.dataSize <= this.maxDataSize) {
            return;
          }

          this._maxDataSizeExceeded = true;
          var message = 'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
          this.emit('error', new Error(message));
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        'stream': _req,
        'util': _req0
      }));
    }
  };
});
//# sourceMappingURL=7d06904d76e0ca8c5a06362a0ac7dc86d048c4b8.js.map