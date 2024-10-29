System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var PACKET_TYPES, encodePacket, toBuffer, TEXT_ENCODER;

  function encodePacketToBinary(packet, callback) {
    if (packet.data instanceof ArrayBuffer || ArrayBuffer.isView(packet.data)) {
      return callback(toBuffer(packet.data, false));
    }

    encodePacket(packet, true, encoded => {
      if (!TEXT_ENCODER) {
        // lazily created for compatibility with Node.js 10
        TEXT_ENCODER = new TextEncoder();
      }

      callback(TEXT_ENCODER.encode(encoded));
    });
  }

  _export("encodePacketToBinary", encodePacketToBinary);

  return {
    setters: [function (_unresolved_) {
      PACKET_TYPES = _unresolved_.PACKET_TYPES;
    }],
    execute: function () {
      _export("encodePacket", encodePacket = (_ref, supportsBinary, callback) => {
        var {
          type,
          data
        } = _ref;

        if (data instanceof ArrayBuffer || ArrayBuffer.isView(data)) {
          return callback(supportsBinary ? data : "b" + toBuffer(data, true).toString("base64"));
        } // plain string


        return callback(PACKET_TYPES[type] + (data || ""));
      });

      toBuffer = (data, forceBufferConversion) => {
        if (Buffer.isBuffer(data) || data instanceof Uint8Array && !forceBufferConversion) {
          return data;
        } else if (data instanceof ArrayBuffer) {
          return Buffer.from(data);
        } else {
          return Buffer.from(data.buffer, data.byteOffset, data.byteLength);
        }
      };
    }
  };
});
//# sourceMappingURL=78db1655a033d6c0864fca6322b0927fcbd039e8.js.map