System.register([], function (_export, _context) {
  "use strict";

  var streamChunk, readBytes, readStream, trackStream;
  return {
    setters: [],
    execute: function () {
      _export("streamChunk", streamChunk = function* (chunk, chunkSize) {
        let len = chunk.byteLength;

        if (!chunkSize || len < chunkSize) {
          yield chunk;
          return;
        }

        let pos = 0;
        let end;

        while (pos < len) {
          end = pos + chunkSize;
          yield chunk.slice(pos, end);
          pos = end;
        }
      });

      _export("readBytes", readBytes = async function* (iterable, chunkSize) {
        for await (const chunk of readStream(iterable)) {
          yield* streamChunk(chunk, chunkSize);
        }
      });

      readStream = async function* (stream) {
        if (stream[Symbol.asyncIterator]) {
          yield* stream;
          return;
        }

        const reader = stream.getReader();

        try {
          for (;;) {
            const {
              done,
              value
            } = await reader.read();

            if (done) {
              break;
            }

            yield value;
          }
        } finally {
          await reader.cancel();
        }
      };

      _export("trackStream", trackStream = (stream, chunkSize, onProgress, onFinish) => {
        const iterator = readBytes(stream, chunkSize);
        let bytes = 0;
        let done;

        let _onFinish = e => {
          if (!done) {
            done = true;
            onFinish && onFinish(e);
          }
        };

        return new ReadableStream({
          async pull(controller) {
            try {
              const {
                done,
                value
              } = await iterator.next();

              if (done) {
                _onFinish();

                controller.close();
                return;
              }

              let len = value.byteLength;

              if (onProgress) {
                let loadedBytes = bytes += len;
                onProgress(loadedBytes);
              }

              controller.enqueue(new Uint8Array(value));
            } catch (err) {
              _onFinish(err);

              throw err;
            }
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