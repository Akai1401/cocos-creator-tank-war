System.register(["__unresolved_0", "__unresolved_1", "engine.io-parser"], function (_export, _context) {
  "use strict";

  var Transport, randomString, encodePayload, decodePayload, Polling;

  _export("Polling", void 0);

  return {
    setters: [function (_unresolved_) {
      Transport = _unresolved_.Transport;
    }, function (_unresolved_2) {
      randomString = _unresolved_2.randomString;
    }, function (_engineIoParser) {
      encodePayload = _engineIoParser.encodePayload;
      decodePayload = _engineIoParser.decodePayload;
    }],
    execute: function () {
      _export("Polling", Polling = class Polling extends Transport {
        constructor() {
          super(...arguments);
          this._polling = false;
        }

        get name() {
          return "polling";
        }
        /**
         * Opens the socket (triggers polling). We write a PING message to determine
         * when the transport is open.
         *
         * @protected
         */


        doOpen() {
          this._poll();
        }
        /**
         * Pauses polling.
         *
         * @param {Function} onPause - callback upon buffers are flushed and transport is paused
         * @package
         */


        pause(onPause) {
          this.readyState = "pausing";

          const pause = () => {
            this.readyState = "paused";
            onPause();
          };

          if (this._polling || !this.writable) {
            let total = 0;

            if (this._polling) {
              total++;
              this.once("pollComplete", function () {
                --total || pause();
              });
            }

            if (!this.writable) {
              total++;
              this.once("drain", function () {
                --total || pause();
              });
            }
          } else {
            pause();
          }
        }
        /**
         * Starts polling cycle.
         *
         * @private
         */


        _poll() {
          this._polling = true;
          this.doPoll();
          this.emitReserved("poll");
        }
        /**
         * Overloads onData to detect payloads.
         *
         * @protected
         */


        onData(data) {
          const callback = packet => {
            // if its the first message we consider the transport open
            if ("opening" === this.readyState && packet.type === "open") {
              this.onOpen();
            } // if its a close packet, we close the ongoing requests


            if ("close" === packet.type) {
              this.onClose({
                description: "transport closed by the server"
              });
              return false;
            } // otherwise bypass onData and handle the message


            this.onPacket(packet);
          }; // decode payload


          decodePayload(data, this.socket.binaryType).forEach(callback); // if an event did not trigger closing

          if ("closed" !== this.readyState) {
            // if we got data we're not polling
            this._polling = false;
            this.emitReserved("pollComplete");

            if ("open" === this.readyState) {
              this._poll();
            } else {}
          }
        }
        /**
         * For polling, send a close packet.
         *
         * @protected
         */


        doClose() {
          const close = () => {
            this.write([{
              type: "close"
            }]);
          };

          if ("open" === this.readyState) {
            close();
          } else {
            // in case we're trying to close while
            // handshaking is in progress (GH-164)
            this.once("open", close);
          }
        }
        /**
         * Writes a packets payload.
         *
         * @param {Array} packets - data packets
         * @protected
         */


        write(packets) {
          this.writable = false;
          encodePayload(packets, data => {
            this.doWrite(data, () => {
              this.writable = true;
              this.emitReserved("drain");
            });
          });
        }
        /**
         * Generates uri for connection.
         *
         * @private
         */


        uri() {
          const schema = this.opts.secure ? "https" : "http";
          const query = this.query || {}; // cache busting is forced

          if (false !== this.opts.timestampRequests) {
            query[this.opts.timestampParam] = randomString();
          }

          if (!this.supportsBinary && !query.sid) {
            query.b64 = 1;
          }

          return this.createUri(schema, query);
        }

      });
    }
  };
});
//# sourceMappingURL=eba62b7791818723f6d00cfb991ab95751ff30d1.js.map