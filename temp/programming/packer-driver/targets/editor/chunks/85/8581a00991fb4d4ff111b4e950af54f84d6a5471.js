System.register([], function (_export, _context) {
  "use strict";

  var withNativeArrayBuffer, isView, toString, withNativeBlob, withNativeFile;

  /**
   * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
   *
   * @private
   */
  function isBinary(obj) {
    return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
  }

  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }

    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }

      return false;
    }

    if (isBinary(obj)) {
      return true;
    }

    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }

    return false;
  }

  _export({
    isBinary: isBinary,
    hasBinary: hasBinary
  });

  return {
    setters: [],
    execute: function () {
      withNativeArrayBuffer = typeof ArrayBuffer === "function";

      isView = obj => {
        return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
      };

      toString = Object.prototype.toString;
      withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
      withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
    }
  };
});
//# sourceMappingURL=8581a00991fb4d4ff111b4e950af54f84d6a5471.js.map