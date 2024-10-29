'use strict';

System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var toFormData, prototype;

  /**
   * It encodes a string by replacing all characters that are not in the unreserved set with
   * their percent-encoded equivalents
   *
   * @param {string} str - The string to encode.
   *
   * @returns {string} The encoded string.
   */
  function encode(str) {
    const charMap = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
      return charMap[match];
    });
  }
  /**
   * It takes a params object and converts it to a FormData object
   *
   * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
   * @param {Object<string, any>} options - The options object passed to the Axios constructor.
   *
   * @returns {void}
   */


  function AxiosURLSearchParams(params, options) {
    this._pairs = [];
    params && toFormData(params, this, options);
  }

  return {
    setters: [function (_unresolved_) {
      toFormData = _unresolved_.default;
    }],
    execute: function () {
      prototype = AxiosURLSearchParams.prototype;

      prototype.append = function append(name, value) {
        this._pairs.push([name, value]);
      };

      prototype.toString = function toString(encoder) {
        const _encode = encoder ? function (value) {
          return encoder.call(this, value, encode);
        } : encode;

        return this._pairs.map(function each(pair) {
          return _encode(pair[0]) + '=' + _encode(pair[1]);
        }, '').join('&');
      };

      _export("default", AxiosURLSearchParams);
    }
  };
});
//# sourceMappingURL=ce51c372f799b5350f9aee9d8319a7bf5d8acb68.js.map