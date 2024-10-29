System.register([], function (_export, _context) {
  "use strict";

  var asyncIterator, readBlob;
  return {
    setters: [],
    execute: function () {
      ({
        asyncIterator
      } = Symbol);

      readBlob = async function* (blob) {
        if (blob.stream) {
          yield* blob.stream();
        } else if (blob.arrayBuffer) {
          yield await blob.arrayBuffer();
        } else if (blob[asyncIterator]) {
          yield* blob[asyncIterator]();
        } else {
          yield blob;
        }
      };

      _export("default", readBlob);
    }
  };
});
//# sourceMappingURL=bfe6023d5e23a187c5532e0736ec4066576422e1.js.map