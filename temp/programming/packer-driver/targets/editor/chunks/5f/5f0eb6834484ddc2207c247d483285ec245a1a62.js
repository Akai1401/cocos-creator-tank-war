'use strict';

System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var utils, AxiosURLSearchParams;

  /**
   * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
   * URI encoded counterparts
   *
   * @param {string} val The value to be encoded.
   *
   * @returns {string} The encoded value.
   */
  function encode(val) {
    return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
  }
  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @param {?object} options
   *
   * @returns {string} The formatted url
   */


  function buildURL(url, params, options) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    const _encode = options && options.encode || encode;

    const serializeFn = options && options.serialize;
    let serializedParams;

    if (serializeFn) {
      serializedParams = serializeFn(params, options);
    } else {
      serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
    }

    if (serializedParams) {
      const hashmarkIndex = url.indexOf("#");

      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  }

  _export("default", buildURL);

  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      AxiosURLSearchParams = _unresolved_2.default;
    }],
    execute: function () {}
  };
});
//# sourceMappingURL=5f0eb6834484ddc2207c247d483285ec245a1a62.js.map