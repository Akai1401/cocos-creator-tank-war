'use strict';

System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var AxiosError, parseProtocol, platform, DATA_URL_PATTERN;

  function fromDataURI(uri, asBlob, options) {
    const _Blob = options && options.Blob || platform.classes.Blob;

    const protocol = parseProtocol(uri);

    if (asBlob === undefined && _Blob) {
      asBlob = true;
    }

    if (protocol === 'data') {
      uri = protocol.length ? uri.slice(protocol.length + 1) : uri;
      const match = DATA_URL_PATTERN.exec(uri);

      if (!match) {
        throw new AxiosError('Invalid URL', AxiosError.ERR_INVALID_URL);
      }

      const mime = match[1];
      const isBase64 = match[2];
      const body = match[3];
      const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? 'base64' : 'utf8');

      if (asBlob) {
        if (!_Blob) {
          throw new AxiosError('Blob is not supported', AxiosError.ERR_NOT_SUPPORT);
        }

        return new _Blob([buffer], {
          type: mime
        });
      }

      return buffer;
    }

    throw new AxiosError('Unsupported protocol ' + protocol, AxiosError.ERR_NOT_SUPPORT);
  }

  _export("default", fromDataURI);

  return {
    setters: [function (_unresolved_) {
      AxiosError = _unresolved_.default;
    }, function (_unresolved_2) {
      parseProtocol = _unresolved_2.default;
    }, function (_unresolved_3) {
      platform = _unresolved_3.default;
    }],
    execute: function () {
      DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
      /**
       * Parse data uri to a Buffer or Blob
       *
       * @param {String} uri
       * @param {?Boolean} asBlob
       * @param {?Object} options
       * @param {?Function} options.Blob
       *
       * @returns {Buffer|Blob}
       */
    }
  };
});
//# sourceMappingURL=c386319fed32f82f41e348d53fc8ca99b54dd834.js.map