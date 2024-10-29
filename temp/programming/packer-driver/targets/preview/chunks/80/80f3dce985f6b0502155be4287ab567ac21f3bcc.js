System.register(["socket.io-parser", "__unresolved_0", "@socket.io/component-emitter"], function (_export, _context) {
  "use strict";

  var PacketType, on, Emitter, Socket, RESERVED_EVENTS;

  _export("Socket", void 0);

  return {
    setters: [function (_socketIoParser) {
      PacketType = _socketIoParser.PacketType;
    }, function (_unresolved_) {
      on = _unresolved_.on;
    }, function (_socketIoComponentEmitter) {
      Emitter = _socketIoComponentEmitter.Emitter;
    }],
    execute: function () {
      /**
       * Internal events.
       * These events can't be emitted by the user.
       */
      RESERVED_EVENTS = Object.freeze({
        connect: 1,
        connect_error: 1,
        disconnect: 1,
        disconnecting: 1,
        // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
        newListener: 1,
        removeListener: 1
      });
      /**
       * A Socket is the fundamental class for interacting with the server.
       *
       * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
       *
       * @example
       * const socket = io();
       *
       * socket.on("connect", () => {
       *   console.log("connected");
       * });
       *
       * // send an event to the server
       * socket.emit("foo", "bar");
       *
       * socket.on("foobar", () => {
       *   // an event was received from the server
       * });
       *
       * // upon disconnection
       * socket.on("disconnect", (reason) => {
       *   console.log(`disconnected due to ${reason}`);
       * });
       */

      _export("Socket", Socket = class Socket extends Emitter {
        /**
         * `Socket` constructor.
         */
        constructor(io, nsp, opts) {
          super();
          /**
           * Whether the socket is currently connected to the server.
           *
           * @example
           * const socket = io();
           *
           * socket.on("connect", () => {
           *   console.log(socket.connected); // true
           * });
           *
           * socket.on("disconnect", () => {
           *   console.log(socket.connected); // false
           * });
           */

          this.connected = false;
          /**
           * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
           * be transmitted by the server.
           */

          this.recovered = false;
          /**
           * Buffer for packets received before the CONNECT packet
           */

          this.receiveBuffer = [];
          /**
           * Buffer for packets that will be sent once the socket is connected
           */

          this.sendBuffer = [];
          /**
           * The queue of packets to be sent with retry in case of failure.
           *
           * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
           * @private
           */

          this._queue = [];
          /**
           * A sequence to generate the ID of the {@link QueuedPacket}.
           * @private
           */

          this._queueSeq = 0;
          this.ids = 0;
          /**
           * A map containing acknowledgement handlers.
           *
           * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
           *
           * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
           * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
           * - `const value = await socket.emitWithAck("test")`
           *
           * From those that don't:
           *
           * - `socket.emit("test", (value) => { ... });`
           *
           * In the first case, the handlers will be called with an error when:
           *
           * - the timeout is reached
           * - the socket gets disconnected
           *
           * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
           * an acknowledgement from the server.
           *
           * @private
           */

          this.acks = {};
          this.flags = {};
          this.io = io;
          this.nsp = nsp;

          if (opts && opts.auth) {
            this.auth = opts.auth;
          }

          this._opts = Object.assign({}, opts);
          if (this.io._autoConnect) this.open();
        }
        /**
         * Whether the socket is currently disconnected
         *
         * @example
         * const socket = io();
         *
         * socket.on("connect", () => {
         *   console.log(socket.disconnected); // false
         * });
         *
         * socket.on("disconnect", () => {
         *   console.log(socket.disconnected); // true
         * });
         */


        get disconnected() {
          return !this.connected;
        }
        /**
         * Subscribe to open, close and packet events
         *
         * @private
         */


        subEvents() {
          if (this.subs) return;
          var io = this.io;
          this.subs = [on(io, "open", this.onopen.bind(this)), on(io, "packet", this.onpacket.bind(this)), on(io, "error", this.onerror.bind(this)), on(io, "close", this.onclose.bind(this))];
        }
        /**
         * Whether the Socket will try to reconnect when its Manager connects or reconnects.
         *
         * @example
         * const socket = io();
         *
         * console.log(socket.active); // true
         *
         * socket.on("disconnect", (reason) => {
         *   if (reason === "io server disconnect") {
         *     // the disconnection was initiated by the server, you need to manually reconnect
         *     console.log(socket.active); // false
         *   }
         *   // else the socket will automatically try to reconnect
         *   console.log(socket.active); // true
         * });
         */


        get active() {
          return !!this.subs;
        }
        /**
         * "Opens" the socket.
         *
         * @example
         * const socket = io({
         *   autoConnect: false
         * });
         *
         * socket.connect();
         */


        connect() {
          if (this.connected) return this;
          this.subEvents();
          if (!this.io["_reconnecting"]) this.io.open(); // ensure open

          if ("open" === this.io._readyState) this.onopen();
          return this;
        }
        /**
         * Alias for {@link connect()}.
         */


        open() {
          return this.connect();
        }
        /**
         * Sends a `message` event.
         *
         * This method mimics the WebSocket.send() method.
         *
         * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
         *
         * @example
         * socket.send("hello");
         *
         * // this is equivalent to
         * socket.emit("message", "hello");
         *
         * @return self
         */


        send() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          args.unshift("message");
          this.emit.apply(this, args);
          return this;
        }
        /**
         * Override `emit`.
         * If the event is in `events`, it's emitted normally.
         *
         * @example
         * socket.emit("hello", "world");
         *
         * // all serializable datastructures are supported (no need to call JSON.stringify)
         * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
         *
         * // with an acknowledgement from the server
         * socket.emit("hello", "world", (val) => {
         *   // ...
         * });
         *
         * @return self
         */


        emit(ev) {
          var _a, _b, _c;

          if (RESERVED_EVENTS.hasOwnProperty(ev)) {
            throw new Error('"' + ev.toString() + '" is a reserved event name');
          }

          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }

          args.unshift(ev);

          if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
            this._addToQueue(args);

            return this;
          }

          var packet = {
            type: PacketType.EVENT,
            data: args
          };
          packet.options = {};
          packet.options.compress = this.flags.compress !== false; // event ack callback

          if ("function" === typeof args[args.length - 1]) {
            var id = this.ids++;
            var ack = args.pop();

            this._registerAckCallback(id, ack);

            packet.id = id;
          }

          var isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
          var isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
          var discardPacket = this.flags.volatile && !isTransportWritable;

          if (discardPacket) {} else if (isConnected) {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
          } else {
            this.sendBuffer.push(packet);
          }

          this.flags = {};
          return this;
        }
        /**
         * @private
         */


        _registerAckCallback(id, ack) {
          var _this = this;

          var _a;

          var timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;

          if (timeout === undefined) {
            this.acks[id] = ack;
            return;
          } // @ts-ignore


          var timer = this.io.setTimeoutFn(() => {
            delete this.acks[id];

            for (var i = 0; i < this.sendBuffer.length; i++) {
              if (this.sendBuffer[i].id === id) {
                this.sendBuffer.splice(i, 1);
              }
            }

            ack.call(this, new Error("operation has timed out"));
          }, timeout);

          var fn = function fn() {
            // @ts-ignore
            _this.io.clearTimeoutFn(timer);

            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            ack.apply(_this, args);
          };

          fn.withError = true;
          this.acks[id] = fn;
        }
        /**
         * Emits an event and waits for an acknowledgement
         *
         * @example
         * // without timeout
         * const response = await socket.emitWithAck("hello", "world");
         *
         * // with a specific timeout
         * try {
         *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
         * } catch (err) {
         *   // the server did not acknowledge the event in the given delay
         * }
         *
         * @return a Promise that will be fulfilled when the server acknowledges the event
         */


        emitWithAck(ev) {
          for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
            args[_key4 - 1] = arguments[_key4];
          }

          return new Promise((resolve, reject) => {
            var fn = (arg1, arg2) => {
              return arg1 ? reject(arg1) : resolve(arg2);
            };

            fn.withError = true;
            args.push(fn);
            this.emit(ev, ...args);
          });
        }
        /**
         * Add the packet to the queue.
         * @param args
         * @private
         */


        _addToQueue(args) {
          var _this2 = this;

          var ack;

          if (typeof args[args.length - 1] === "function") {
            ack = args.pop();
          }

          var packet = {
            id: this._queueSeq++,
            tryCount: 0,
            pending: false,
            args,
            flags: Object.assign({
              fromQueue: true
            }, this.flags)
          };
          args.push(function (err) {
            if (packet !== _this2._queue[0]) {
              // the packet has already been acknowledged
              return;
            }

            var hasError = err !== null;

            if (hasError) {
              if (packet.tryCount > _this2._opts.retries) {
                _this2._queue.shift();

                if (ack) {
                  ack(err);
                }
              }
            } else {
              _this2._queue.shift();

              if (ack) {
                for (var _len5 = arguments.length, responseArgs = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                  responseArgs[_key5 - 1] = arguments[_key5];
                }

                ack(null, ...responseArgs);
              }
            }

            packet.pending = false;
            return _this2._drainQueue();
          });

          this._queue.push(packet);

          this._drainQueue();
        }
        /**
         * Send the first packet of the queue, and wait for an acknowledgement from the server.
         * @param force - whether to resend a packet that has not been acknowledged yet
         *
         * @private
         */


        _drainQueue(force) {
          if (force === void 0) {
            force = false;
          }

          if (!this.connected || this._queue.length === 0) {
            return;
          }

          var packet = this._queue[0];

          if (packet.pending && !force) {
            return;
          }

          packet.pending = true;
          packet.tryCount++;
          this.flags = packet.flags;
          this.emit.apply(this, packet.args);
        }
        /**
         * Sends a packet.
         *
         * @param packet
         * @private
         */


        packet(packet) {
          packet.nsp = this.nsp;

          this.io._packet(packet);
        }
        /**
         * Called upon engine `open`.
         *
         * @private
         */


        onopen() {
          if (typeof this.auth == "function") {
            this.auth(data => {
              this._sendConnectPacket(data);
            });
          } else {
            this._sendConnectPacket(this.auth);
          }
        }
        /**
         * Sends a CONNECT packet to initiate the Socket.IO session.
         *
         * @param data
         * @private
         */


        _sendConnectPacket(data) {
          this.packet({
            type: PacketType.CONNECT,
            data: this._pid ? Object.assign({
              pid: this._pid,
              offset: this._lastOffset
            }, data) : data
          });
        }
        /**
         * Called upon engine or manager `error`.
         *
         * @param err
         * @private
         */


        onerror(err) {
          if (!this.connected) {
            this.emitReserved("connect_error", err);
          }
        }
        /**
         * Called upon engine `close`.
         *
         * @param reason
         * @param description
         * @private
         */


        onclose(reason, description) {
          this.connected = false;
          delete this.id;
          this.emitReserved("disconnect", reason, description);

          this._clearAcks();
        }
        /**
         * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
         * the server.
         *
         * @private
         */


        _clearAcks() {
          Object.keys(this.acks).forEach(id => {
            var isBuffered = this.sendBuffer.some(packet => String(packet.id) === id);

            if (!isBuffered) {
              // note: handlers that do not accept an error as first argument are ignored here
              var ack = this.acks[id];
              delete this.acks[id];

              if (ack.withError) {
                ack.call(this, new Error("socket has been disconnected"));
              }
            }
          });
        }
        /**
         * Called with socket packet.
         *
         * @param packet
         * @private
         */


        onpacket(packet) {
          var sameNamespace = packet.nsp === this.nsp;
          if (!sameNamespace) return;

          switch (packet.type) {
            case PacketType.CONNECT:
              if (packet.data && packet.data.sid) {
                this.onconnect(packet.data.sid, packet.data.pid);
              } else {
                this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
              }

              break;

            case PacketType.EVENT:
            case PacketType.BINARY_EVENT:
              this.onevent(packet);
              break;

            case PacketType.ACK:
            case PacketType.BINARY_ACK:
              this.onack(packet);
              break;

            case PacketType.DISCONNECT:
              this.ondisconnect();
              break;

            case PacketType.CONNECT_ERROR:
              this.destroy();
              var err = new Error(packet.data.message); // @ts-ignore

              err.data = packet.data.data;
              this.emitReserved("connect_error", err);
              break;
          }
        }
        /**
         * Called upon a server event.
         *
         * @param packet
         * @private
         */


        onevent(packet) {
          var args = packet.data || [];

          if (null != packet.id) {
            args.push(this.ack(packet.id));
          }

          if (this.connected) {
            this.emitEvent(args);
          } else {
            this.receiveBuffer.push(Object.freeze(args));
          }
        }

        emitEvent(args) {
          if (this._anyListeners && this._anyListeners.length) {
            var listeners = this._anyListeners.slice();

            for (var listener of listeners) {
              listener.apply(this, args);
            }
          }

          super.emit.apply(this, args);

          if (this._pid && args.length && typeof args[args.length - 1] === "string") {
            this._lastOffset = args[args.length - 1];
          }
        }
        /**
         * Produces an ack callback to emit with an event.
         *
         * @private
         */


        ack(id) {
          var self = this;
          var sent = false;
          return function () {
            // prevent double callbacks
            if (sent) return;
            sent = true;

            for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
              args[_key6] = arguments[_key6];
            }

            self.packet({
              type: PacketType.ACK,
              id: id,
              data: args
            });
          };
        }
        /**
         * Called upon a server acknowledgement.
         *
         * @param packet
         * @private
         */


        onack(packet) {
          var ack = this.acks[packet.id];

          if (typeof ack !== "function") {
            return;
          }

          delete this.acks[packet.id]; // @ts-ignore FIXME ack is incorrectly inferred as 'never'

          if (ack.withError) {
            packet.data.unshift(null);
          } // @ts-ignore


          ack.apply(this, packet.data);
        }
        /**
         * Called upon server connect.
         *
         * @private
         */


        onconnect(id, pid) {
          this.id = id;
          this.recovered = pid && this._pid === pid;
          this._pid = pid; // defined only if connection state recovery is enabled

          this.connected = true;
          this.emitBuffered();
          this.emitReserved("connect");

          this._drainQueue(true);
        }
        /**
         * Emit buffered events (received and emitted).
         *
         * @private
         */


        emitBuffered() {
          this.receiveBuffer.forEach(args => this.emitEvent(args));
          this.receiveBuffer = [];
          this.sendBuffer.forEach(packet => {
            this.notifyOutgoingListeners(packet);
            this.packet(packet);
          });
          this.sendBuffer = [];
        }
        /**
         * Called upon server disconnect.
         *
         * @private
         */


        ondisconnect() {
          this.destroy();
          this.onclose("io server disconnect");
        }
        /**
         * Called upon forced client/server side disconnections,
         * this method ensures the manager stops tracking us and
         * that reconnections don't get triggered for this.
         *
         * @private
         */


        destroy() {
          if (this.subs) {
            // clean subscriptions to avoid reconnections
            this.subs.forEach(subDestroy => subDestroy());
            this.subs = undefined;
          }

          this.io["_destroy"](this);
        }
        /**
         * Disconnects the socket manually. In that case, the socket will not try to reconnect.
         *
         * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
         *
         * @example
         * const socket = io();
         *
         * socket.on("disconnect", (reason) => {
         *   // console.log(reason); prints "io client disconnect"
         * });
         *
         * socket.disconnect();
         *
         * @return self
         */


        disconnect() {
          if (this.connected) {
            this.packet({
              type: PacketType.DISCONNECT
            });
          } // remove socket from pool


          this.destroy();

          if (this.connected) {
            // fire events
            this.onclose("io client disconnect");
          }

          return this;
        }
        /**
         * Alias for {@link disconnect()}.
         *
         * @return self
         */


        close() {
          return this.disconnect();
        }
        /**
         * Sets the compress flag.
         *
         * @example
         * socket.compress(false).emit("hello");
         *
         * @param compress - if `true`, compresses the sending data
         * @return self
         */


        compress(compress) {
          this.flags.compress = compress;
          return this;
        }
        /**
         * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
         * ready to send messages.
         *
         * @example
         * socket.volatile.emit("hello"); // the server may or may not receive it
         *
         * @returns self
         */


        get volatile() {
          this.flags.volatile = true;
          return this;
        }
        /**
         * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
         * given number of milliseconds have elapsed without an acknowledgement from the server:
         *
         * @example
         * socket.timeout(5000).emit("my-event", (err) => {
         *   if (err) {
         *     // the server did not acknowledge the event in the given delay
         *   }
         * });
         *
         * @returns self
         */


        timeout(timeout) {
          this.flags.timeout = timeout;
          return this;
        }
        /**
         * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
         * callback.
         *
         * @example
         * socket.onAny((event, ...args) => {
         *   console.log(`got ${event}`);
         * });
         *
         * @param listener
         */


        onAny(listener) {
          this._anyListeners = this._anyListeners || [];

          this._anyListeners.push(listener);

          return this;
        }
        /**
         * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
         * callback. The listener is added to the beginning of the listeners array.
         *
         * @example
         * socket.prependAny((event, ...args) => {
         *   console.log(`got event ${event}`);
         * });
         *
         * @param listener
         */


        prependAny(listener) {
          this._anyListeners = this._anyListeners || [];

          this._anyListeners.unshift(listener);

          return this;
        }
        /**
         * Removes the listener that will be fired when any event is emitted.
         *
         * @example
         * const catchAllListener = (event, ...args) => {
         *   console.log(`got event ${event}`);
         * }
         *
         * socket.onAny(catchAllListener);
         *
         * // remove a specific listener
         * socket.offAny(catchAllListener);
         *
         * // or remove all listeners
         * socket.offAny();
         *
         * @param listener
         */


        offAny(listener) {
          if (!this._anyListeners) {
            return this;
          }

          if (listener) {
            var listeners = this._anyListeners;

            for (var i = 0; i < listeners.length; i++) {
              if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
              }
            }
          } else {
            this._anyListeners = [];
          }

          return this;
        }
        /**
         * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
         * e.g. to remove listeners.
         */


        listenersAny() {
          return this._anyListeners || [];
        }
        /**
         * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
         * callback.
         *
         * Note: acknowledgements sent to the server are not included.
         *
         * @example
         * socket.onAnyOutgoing((event, ...args) => {
         *   console.log(`sent event ${event}`);
         * });
         *
         * @param listener
         */


        onAnyOutgoing(listener) {
          this._anyOutgoingListeners = this._anyOutgoingListeners || [];

          this._anyOutgoingListeners.push(listener);

          return this;
        }
        /**
         * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
         * callback. The listener is added to the beginning of the listeners array.
         *
         * Note: acknowledgements sent to the server are not included.
         *
         * @example
         * socket.prependAnyOutgoing((event, ...args) => {
         *   console.log(`sent event ${event}`);
         * });
         *
         * @param listener
         */


        prependAnyOutgoing(listener) {
          this._anyOutgoingListeners = this._anyOutgoingListeners || [];

          this._anyOutgoingListeners.unshift(listener);

          return this;
        }
        /**
         * Removes the listener that will be fired when any event is emitted.
         *
         * @example
         * const catchAllListener = (event, ...args) => {
         *   console.log(`sent event ${event}`);
         * }
         *
         * socket.onAnyOutgoing(catchAllListener);
         *
         * // remove a specific listener
         * socket.offAnyOutgoing(catchAllListener);
         *
         * // or remove all listeners
         * socket.offAnyOutgoing();
         *
         * @param [listener] - the catch-all listener (optional)
         */


        offAnyOutgoing(listener) {
          if (!this._anyOutgoingListeners) {
            return this;
          }

          if (listener) {
            var listeners = this._anyOutgoingListeners;

            for (var i = 0; i < listeners.length; i++) {
              if (listener === listeners[i]) {
                listeners.splice(i, 1);
                return this;
              }
            }
          } else {
            this._anyOutgoingListeners = [];
          }

          return this;
        }
        /**
         * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
         * e.g. to remove listeners.
         */


        listenersAnyOutgoing() {
          return this._anyOutgoingListeners || [];
        }
        /**
         * Notify the listeners for each packet sent
         *
         * @param packet
         *
         * @private
         */


        notifyOutgoingListeners(packet) {
          if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
            var listeners = this._anyOutgoingListeners.slice();

            for (var listener of listeners) {
              listener.apply(this, packet.data);
            }
          }
        }

      });
    }
  };
});
//# sourceMappingURL=80f3dce985f6b0502155be4287ab567ac21f3bcc.js.map