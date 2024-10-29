System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var globalThis, NATIVE_SET_TIMEOUT, NATIVE_CLEAR_TIMEOUT, BASE64_OVERHEAD;

  function pick(obj) {
    for (var _len = arguments.length, attr = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      attr[_key - 1] = arguments[_key];
    }

    return attr.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }

      return acc;
    }, {});
  } // Keep a reference to the real timeout functions so they can be used when overridden


  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThis);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThis);
    } else {
      obj.setTimeoutFn = globalThis.setTimeout.bind(globalThis);
      obj.clearTimeoutFn = globalThis.clearTimeout.bind(globalThis);
    }
  } // base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)


  // we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    } // arraybuffer or blob


    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }

  function utf8Length(str) {
    var c = 0,
        length = 0;

    for (var i = 0, l = str.length; i < l; i++) {
      c = str.charCodeAt(i);

      if (c < 0x80) {
        length += 1;
      } else if (c < 0x800) {
        length += 2;
      } else if (c < 0xd800 || c >= 0xe000) {
        length += 3;
      } else {
        i++;
        length += 4;
      }
    }

    return length;
  }
  /**
   * Generates a random 8-characters string.
   */


  function randomString() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
  }

  _export({
    pick: pick,
    installTimerFunctions: installTimerFunctions,
    byteLength: byteLength,
    randomString: randomString
  });

  return {
    setters: [function (_unresolved_) {
      globalThis = _unresolved_.globalThisShim;
    }],
    execute: function () {
      NATIVE_SET_TIMEOUT = globalThis.setTimeout;
      NATIVE_CLEAR_TIMEOUT = globalThis.clearTimeout;
      BASE64_OVERHEAD = 1.33;
    }
  };
});
//# sourceMappingURL=b24b4e8547eee900b5692f6b44e66e133b58f506.js.map