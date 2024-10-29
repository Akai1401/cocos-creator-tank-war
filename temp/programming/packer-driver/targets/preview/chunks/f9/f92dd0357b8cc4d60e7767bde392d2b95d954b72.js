System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "socket.io-parser"], function (_export, _context) {
  "use strict";

  var url, Manager, Socket, cache;

  function lookup(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = undefined;
    }

    opts = opts || {};
    var parsed = url(uri, opts.path || "/socket.io");
    var source = parsed.source;
    var id = parsed.id;
    var path = parsed.path;
    var sameNamespace = cache[id] && path in cache[id]["nsps"];
    var newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    var io;

    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }

      io = cache[id];
    }

    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }

    return io.socket(parsed.path, opts);
  } // so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
  // namespace (e.g. `io.connect(...)`), for backward compatibility


  _export({
    io: lookup,
    connect: lookup,
    default: lookup
  });

  return {
    setters: [function (_unresolved_) {
      url = _unresolved_.url;
    }, function (_unresolved_2) {
      Manager = _unresolved_2.Manager;
    }, function (_unresolved_3) {
      Socket = _unresolved_3.Socket;
    }, function (_socketIoParser) {
      _export("protocol", _socketIoParser.protocol);
    }],
    execute: function () {
      /**
       * Managers cache.
       */
      cache = {};
      Object.assign(lookup, {
        Manager,
        Socket,
        io: lookup,
        connect: lookup
      });
      /**
       * Protocol version.
       *
       * @public
       */

      /**
       * Expose constructors for standalone build.
       *
       * @public
       */
      _export("Manager", Manager);

      _export("Socket", Socket);
    }
  };
});
//# sourceMappingURL=f92dd0357b8cc4d60e7767bde392d2b95d954b72.js.map