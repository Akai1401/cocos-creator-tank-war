"use strict";

System.register(["stream"], function (_export, _context) {
  "use strict";

  var stream, ZlibHeaderTransformStream;
  return {
    setters: [function (_stream) {
      stream = _stream.default;
    }],
    execute: function () {
      ZlibHeaderTransformStream = class ZlibHeaderTransformStream extends stream.Transform {
        __transform(chunk, encoding, callback) {
          this.push(chunk);
          callback();
        }

        _transform(chunk, encoding, callback) {
          if (chunk.length !== 0) {
            this._transform = this.__transform; // Add Default Compression headers if no zlib headers are present

            if (chunk[0] !== 120) {
              // Hex: 78
              var header = Buffer.alloc(2);
              header[0] = 120; // Hex: 78

              header[1] = 156; // Hex: 9C 

              this.push(header, encoding);
            }
          }

          this.__transform(chunk, encoding, callback);
        }

      };

      _export("default", ZlibHeaderTransformStream);
    }
  };
});
//# sourceMappingURL=0254cc18973daa543efbac5a5380536343eec748.js.map