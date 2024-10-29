System.register(["engine.io-parser", "@socket.io/component-emitter", "__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var decodePacket, Emitter, installTimerFunctions, encode, TransportError, Transport;

  _export({
    TransportError: void 0,
    Transport: void 0
  });

  return {
    setters: [function (_engineIoParser) {
      decodePacket = _engineIoParser.decodePacket;
    }, function (_socketIoComponentEmitter) {
      Emitter = _socketIoComponentEmitter.Emitter;
    }, function (_unresolved_) {
      installTimerFunctions = _unresolved_.installTimerFunctions;
    }, function (_unresolved_2) {
      encode = _unresolved_2.encode;
    }],
    execute: function () {
      _export("TransportError", TransportError = class TransportError extends Error {
        constructor(reason, description, context) {
          super(reason);
          this.description = description;
          this.context = context;
          this.type = "TransportError";
        }

      });

      _export("Transport", Transport = class Transport extends Emitter {
        /**
         * Transport abstract constructor.
         *
         * @param {Object} opts - options
         * @protected
         */
        constructor(opts) {
          super();
          this.writable = false;
          installTimerFunctions(this, opts);
          this.opts = opts;
          this.query = opts.query;
          this.socket = opts.socket;
          this.supportsBinary = !opts.forceBase64;
        }
        /**
         * Emits an error.
         *
         * @param {String} reason
         * @param description
         * @param context - the error context
         * @return {Transport} for chaining
         * @protected
         */


        onError(reason, description, context) {
          super.emitReserved("error", new TransportError(reason, description, context));
          return this;
        }
        /**
         * Opens the transport.
         */


        open() {
          this.readyState = "opening";
          this.doOpen();
          return this;
        }
        /**
         * Closes the transport.
         */


        close() {
          if (this.readyState === "opening" || this.readyState === "open") {
            this.doClose();
            this.onClose();
          }

          return this;
        }
        /**
         * Sends multiple packets.
         *
         * @param {Array} packets
         */


        send(packets) {
          if (this.readyState === "open") {
            this.write(packets);
          } else {// this might happen if the transport was silently closed in the beforeunload event handler
          }
        }
        /**
         * Called upon open
         *
         * @protected
         */


        onOpen() {
          this.readyState = "open";
          this.writable = true;
          super.emitReserved("open");
        }
        /**
         * Called with data.
         *
         * @param {String} data
         * @protected
         */


        onData(data) {
          const packet = decodePacket(data, this.socket.binaryType);
          this.onPacket(packet);
        }
        /**
         * Called with a decoded packet.
         *
         * @protected
         */


        onPacket(packet) {
          super.emitReserved("packet", packet);
        }
        /**
         * Called upon close.
         *
         * @protected
         */


        onClose(details) {
          this.readyState = "closed";
          super.emitReserved("close", details);
        }
        /**
         * Pauses the transport, in order not to lose packets during an upgrade.
         *
         * @param onPause
         */


        pause(onPause) {}

        createUri(schema, query = {}) {
          return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
        }

        _hostname() {
          const hostname = this.opts.hostname;
          return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
        }

        _port() {
          if (this.opts.port && (this.opts.secure && Number(this.opts.port !== 443) || !this.opts.secure && Number(this.opts.port) !== 80)) {
            return ":" + this.opts.port;
          } else {
            return "";
          }
        }

        _query(query) {
          const encodedQuery = encode(query);
          return encodedQuery.length ? "?" + encodedQuery : "";
        }

      });
    }
  };
});
//# sourceMappingURL=41ea5af5dcda38b2f13bf61e884963b522fdf527.js.map