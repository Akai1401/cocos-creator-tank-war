System.register(["util", "stream", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var TextEncoder, Readable, utils, readBlob, FormDataPart, BOUNDARY_ALPHABET, textEncoder, CRLF, CRLF_BYTES, CRLF_BYTES_COUNT, formDataToStream;
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
      BOUNDARY_ALPHABET = utils.ALPHABET.ALPHA_DIGIT + '-_';
      textEncoder = new TextEncoder();
      CRLF = '\r\n';
      CRLF_BYTES = textEncoder.encode(CRLF);
      CRLF_BYTES_COUNT = 2;
      FormDataPart = class FormDataPart {
        constructor(name, value) {
          const {
            escapeName
          } = this.constructor;
          const isStringValue = utils.isString(value);
          let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${!isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ''}${CRLF}`;

          if (isStringValue) {
            value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
          } else {
            headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
          }

          this.headers = textEncoder.encode(headers + CRLF);
          this.contentLength = isStringValue ? value.byteLength : value.size;
          this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;
          this.name = name;
          this.value = value;
        }

        async *encode() {
          yield this.headers;
          const {
            value
          } = this;

          if (utils.isTypedArray(value)) {
            yield value;
          } else {
            yield* readBlob(value);
          }

          yield CRLF_BYTES;
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
        const {
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

        const boundaryBytes = textEncoder.encode('--' + boundary + CRLF);
        const footerBytes = textEncoder.encode('--' + boundary + '--' + CRLF + CRLF);
        let contentLength = footerBytes.byteLength;
        const parts = Array.from(form.entries()).map(([name, value]) => {
          const part = new FormDataPart(name, value);
          contentLength += part.size;
          return part;
        });
        contentLength += boundaryBytes.byteLength * parts.length;
        contentLength = utils.toFiniteNumber(contentLength);
        const computedHeaders = {
          'Content-Type': `multipart/form-data; boundary=${boundary}`
        };

        if (Number.isFinite(contentLength)) {
          computedHeaders['Content-Length'] = contentLength;
        }

        headersHandler && headersHandler(computedHeaders);
        return Readable.from(async function* () {
          for (const part of parts) {
            yield boundaryBytes;
            yield* part.encode();
          }

          yield footerBytes;
        }());
      };

      _export("default", formDataToStream);
    }
  };
});
//# sourceMappingURL=c1ce9ef2349f8723e8cb12409746cbd233ca8e83.js.map