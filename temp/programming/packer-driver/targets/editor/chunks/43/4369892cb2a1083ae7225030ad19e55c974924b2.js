System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var encodePacket, encodePacketToBinary, decodePacket, ERROR_PACKET, SEPARATOR, encodePayload, decodePayload, TEXT_DECODER, protocol;

  function createPacketEncoderStream() {
    return new TransformStream({
      transform(packet, controller) {
        encodePacketToBinary(packet, encodedPacket => {
          const payloadLength = encodedPacket.length;
          let header; // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length

          if (payloadLength < 126) {
            header = new Uint8Array(1);
            new DataView(header.buffer).setUint8(0, payloadLength);
          } else if (payloadLength < 65536) {
            header = new Uint8Array(3);
            const view = new DataView(header.buffer);
            view.setUint8(0, 126);
            view.setUint16(1, payloadLength);
          } else {
            header = new Uint8Array(9);
            const view = new DataView(header.buffer);
            view.setUint8(0, 127);
            view.setBigUint64(1, BigInt(payloadLength));
          } // first bit indicates whether the payload is plain text (0) or binary (1)


          if (packet.data && typeof packet.data !== "string") {
            header[0] |= 0x80;
          }

          controller.enqueue(header);
          controller.enqueue(encodedPacket);
        });
      }

    });
  }

  function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  }

  function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
      return chunks.shift();
    }

    const buffer = new Uint8Array(size);
    let j = 0;

    for (let i = 0; i < size; i++) {
      buffer[i] = chunks[0][j++];

      if (j === chunks[0].length) {
        chunks.shift();
        j = 0;
      }
    }

    if (chunks.length && j < chunks[0].length) {
      chunks[0] = chunks[0].slice(j);
    }

    return buffer;
  }

  function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
      TEXT_DECODER = new TextDecoder();
    }

    const chunks = [];
    let state = 0
    /* State.READ_HEADER */
    ;
    let expectedLength = -1;
    let isBinary = false;
    return new TransformStream({
      transform(chunk, controller) {
        chunks.push(chunk);

        while (true) {
          if (state === 0
          /* State.READ_HEADER */
          ) {
            if (totalLength(chunks) < 1) {
              break;
            }

            const header = concatChunks(chunks, 1);
            isBinary = (header[0] & 0x80) === 0x80;
            expectedLength = header[0] & 0x7f;

            if (expectedLength < 126) {
              state = 3
              /* State.READ_PAYLOAD */
              ;
            } else if (expectedLength === 126) {
              state = 1
              /* State.READ_EXTENDED_LENGTH_16 */
              ;
            } else {
              state = 2
              /* State.READ_EXTENDED_LENGTH_64 */
              ;
            }
          } else if (state === 1
          /* State.READ_EXTENDED_LENGTH_16 */
          ) {
            if (totalLength(chunks) < 2) {
              break;
            }

            const headerArray = concatChunks(chunks, 2);
            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
            state = 3
            /* State.READ_PAYLOAD */
            ;
          } else if (state === 2
          /* State.READ_EXTENDED_LENGTH_64 */
          ) {
            if (totalLength(chunks) < 8) {
              break;
            }

            const headerArray = concatChunks(chunks, 8);
            const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
            const n = view.getUint32(0);

            if (n > Math.pow(2, 53 - 32) - 1) {
              // the maximum safe integer in JavaScript is 2^53 - 1
              controller.enqueue(ERROR_PACKET);
              break;
            }

            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
            state = 3
            /* State.READ_PAYLOAD */
            ;
          } else {
            if (totalLength(chunks) < expectedLength) {
              break;
            }

            const data = concatChunks(chunks, expectedLength);
            controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
            state = 0
            /* State.READ_HEADER */
            ;
          }

          if (expectedLength === 0 || expectedLength > maxPayload) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
        }
      }

    });
  }

  _export({
    createPacketEncoderStream: createPacketEncoderStream,
    createPacketDecoderStream: createPacketDecoderStream
  });

  return {
    setters: [function (_unresolved_) {
      encodePacket = _unresolved_.encodePacket;
      encodePacketToBinary = _unresolved_.encodePacketToBinary;
    }, function (_unresolved_2) {
      decodePacket = _unresolved_2.decodePacket;
    }, function (_unresolved_3) {
      ERROR_PACKET = _unresolved_3.ERROR_PACKET;
    }],
    execute: function () {
      SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text

      _export("encodePayload", encodePayload = (packets, callback) => {
        // some packets may be added to the array while encoding, so the initial length must be saved
        const length = packets.length;
        const encodedPackets = new Array(length);
        let count = 0;
        packets.forEach((packet, i) => {
          // force base64 encoding for binary packets
          encodePacket(packet, false, encodedPacket => {
            encodedPackets[i] = encodedPacket;

            if (++count === length) {
              callback(encodedPackets.join(SEPARATOR));
            }
          });
        });
      });

      _export("decodePayload", decodePayload = (encodedPayload, binaryType) => {
        const encodedPackets = encodedPayload.split(SEPARATOR);
        const packets = [];

        for (let i = 0; i < encodedPackets.length; i++) {
          const decodedPacket = decodePacket(encodedPackets[i], binaryType);
          packets.push(decodedPacket);

          if (decodedPacket.type === "error") {
            break;
          }
        }

        return packets;
      });

      _export("protocol", protocol = 4);

      _export("encodePacket", encodePacket);

      _export("decodePacket", decodePacket);
    }
  };
});
//# sourceMappingURL=4369892cb2a1083ae7225030ad19e55c974924b2.js.map