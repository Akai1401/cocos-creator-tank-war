'use strict';

System.register(["stream", "__unresolved_0"], function (_export, _context) {
  "use strict";

  var stream, utils, AxiosTransformStream, kInternals;
  return {
    setters: [function (_stream) {
      stream = _stream.default;
    }, function (_unresolved_) {
      utils = _unresolved_.default;
    }],
    execute: function () {
      kInternals = Symbol('internals');
      AxiosTransformStream = class AxiosTransformStream extends stream.Transform {
        constructor(options) {
          options = utils.toFlatObject(options, {
            maxRate: 0,
            chunkSize: 64 * 1024,
            minChunkSize: 100,
            timeWindow: 500,
            ticksRate: 2,
            samplesCount: 15
          }, null, (prop, source) => {
            return !utils.isUndefined(source[prop]);
          });
          super({
            readableHighWaterMark: options.chunkSize
          });
          var internals = this[kInternals] = {
            timeWindow: options.timeWindow,
            chunkSize: options.chunkSize,
            maxRate: options.maxRate,
            minChunkSize: options.minChunkSize,
            bytesSeen: 0,
            isCaptured: false,
            notifiedBytesLoaded: 0,
            ts: Date.now(),
            bytes: 0,
            onReadCallback: null
          };
          this.on('newListener', event => {
            if (event === 'progress') {
              if (!internals.isCaptured) {
                internals.isCaptured = true;
              }
            }
          });
        }

        _read(size) {
          var internals = this[kInternals];

          if (internals.onReadCallback) {
            internals.onReadCallback();
          }

          return super._read(size);
        }

        _transform(chunk, encoding, callback) {
          var internals = this[kInternals];
          var maxRate = internals.maxRate;
          var readableHighWaterMark = this.readableHighWaterMark;
          var timeWindow = internals.timeWindow;
          var divider = 1000 / timeWindow;
          var bytesThreshold = maxRate / divider;
          var minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;

          var pushChunk = (_chunk, _callback) => {
            var bytes = Buffer.byteLength(_chunk);
            internals.bytesSeen += bytes;
            internals.bytes += bytes;
            internals.isCaptured && this.emit('progress', internals.bytesSeen);

            if (this.push(_chunk)) {
              process.nextTick(_callback);
            } else {
              internals.onReadCallback = () => {
                internals.onReadCallback = null;
                process.nextTick(_callback);
              };
            }
          };

          var transformChunk = (_chunk, _callback) => {
            var chunkSize = Buffer.byteLength(_chunk);
            var chunkRemainder = null;
            var maxChunkSize = readableHighWaterMark;
            var bytesLeft;
            var passed = 0;

            if (maxRate) {
              var now = Date.now();

              if (!internals.ts || (passed = now - internals.ts) >= timeWindow) {
                internals.ts = now;
                bytesLeft = bytesThreshold - internals.bytes;
                internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
                passed = 0;
              }

              bytesLeft = bytesThreshold - internals.bytes;
            }

            if (maxRate) {
              if (bytesLeft <= 0) {
                // next time window
                return setTimeout(() => {
                  _callback(null, _chunk);
                }, timeWindow - passed);
              }

              if (bytesLeft < maxChunkSize) {
                maxChunkSize = bytesLeft;
              }
            }

            if (maxChunkSize && chunkSize > maxChunkSize && chunkSize - maxChunkSize > minChunkSize) {
              chunkRemainder = _chunk.subarray(maxChunkSize);
              _chunk = _chunk.subarray(0, maxChunkSize);
            }

            pushChunk(_chunk, chunkRemainder ? () => {
              process.nextTick(_callback, null, chunkRemainder);
            } : _callback);
          };

          transformChunk(chunk, function transformNextChunk(err, _chunk) {
            if (err) {
              return callback(err);
            }

            if (_chunk) {
              transformChunk(_chunk, transformNextChunk);
            } else {
              callback(null);
            }
          });
        }

      };

      _export("default", AxiosTransformStream);
    }
  };
});
//# sourceMappingURL=517a7b4f7b30b0ffd9d1b28c0f4ad6386873b266.js.map