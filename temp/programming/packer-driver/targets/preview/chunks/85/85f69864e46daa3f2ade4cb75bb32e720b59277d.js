System.register([], function (_export, _context) {
  "use strict";

  // imported from https://github.com/galkn/querystring

  /**
   * Compiles a querystring
   * Returns string representation of the object
   *
   * @param {Object}
   * @api private
   */
  function encode(obj) {
    var str = '';

    for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length) str += '&';
        str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
      }
    }

    return str;
  }
  /**
   * Parses a simple querystring into an object
   *
   * @param {String} qs
   * @api private
   */


  function decode(qs) {
    var qry = {};
    var pairs = qs.split('&');

    for (var i = 0, l = pairs.length; i < l; i++) {
      var pair = pairs[i].split('=');
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    return qry;
  }

  _export({
    encode: encode,
    decode: decode
  });

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=85f69864e46daa3f2ade4cb75bb32e720b59277d.js.map