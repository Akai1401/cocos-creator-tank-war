System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "__unresolved_10", "__unresolved_11", "__unresolved_12"], function (_export, _context) {
  "use strict";

  var Socket, protocol;
  return {
    setters: [function (_unresolved_) {
      Socket = _unresolved_.Socket;
    }, function (_unresolved_2) {
      _export({
        SocketWithoutUpgrade: _unresolved_2.SocketWithoutUpgrade,
        SocketWithUpgrade: _unresolved_2.SocketWithUpgrade
      });
    }, function (_unresolved_3) {
      _export({
        Transport: _unresolved_3.Transport,
        TransportError: _unresolved_3.TransportError
      });
    }, function (_unresolved_4) {
      _export("transports", _unresolved_4.transports);
    }, function (_unresolved_5) {
      _export("installTimerFunctions", _unresolved_5.installTimerFunctions);
    }, function (_unresolved_6) {
      _export("parse", _unresolved_6.parse);
    }, function (_unresolved_7) {
      _export("nextTick", _unresolved_7.nextTick);
    }, function (_unresolved_8) {
      _export("Fetch", _unresolved_8.Fetch);
    }, function (_unresolved_9) {
      _export("NodeXHR", _unresolved_9.XHR);
    }, function (_unresolved_10) {
      _export("XHR", _unresolved_10.XHR);
    }, function (_unresolved_11) {
      _export("NodeWebSocket", _unresolved_11.WS);
    }, function (_unresolved_12) {
      _export("WebSocket", _unresolved_12.WS);
    }, function (_unresolved_13) {
      _export("WebTransport", _unresolved_13.WT);
    }],
    execute: function () {
      _export("Socket", Socket);

      _export("protocol", protocol = Socket.protocol);
    }
  };
});
//# sourceMappingURL=33dff24550a9fdea5952f5a0687a94c8942ce732.js.map