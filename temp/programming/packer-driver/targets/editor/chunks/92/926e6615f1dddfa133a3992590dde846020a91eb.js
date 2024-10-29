System.register([], function (_export, _context) {
  "use strict";

  var PACKET_TYPES, PACKET_TYPES_REVERSE, ERROR_PACKET;
  return {
    setters: [],
    execute: function () {
      _export("PACKET_TYPES", PACKET_TYPES = Object.create(null)); // no Map = no polyfill


      PACKET_TYPES["open"] = "0";
      PACKET_TYPES["close"] = "1";
      PACKET_TYPES["ping"] = "2";
      PACKET_TYPES["pong"] = "3";
      PACKET_TYPES["message"] = "4";
      PACKET_TYPES["upgrade"] = "5";
      PACKET_TYPES["noop"] = "6";

      _export("PACKET_TYPES_REVERSE", PACKET_TYPES_REVERSE = Object.create(null));

      Object.keys(PACKET_TYPES).forEach(key => {
        PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
      });

      _export("ERROR_PACKET", ERROR_PACKET = {
        type: "error",
        data: "parser error"
      });
    }
  };
});
//# sourceMappingURL=926e6615f1dddfa133a3992590dde846020a91eb.js.map