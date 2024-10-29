System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var XHR, WS, WT, transports;
  return {
    setters: [function (_unresolved_) {
      XHR = _unresolved_.XHR;
    }, function (_unresolved_2) {
      WS = _unresolved_2.WS;
    }, function (_unresolved_3) {
      WT = _unresolved_3.WT;
    }],
    execute: function () {
      _export("transports", transports = {
        websocket: WS,
        webtransport: WT,
        polling: XHR
      });
    }
  };
});
//# sourceMappingURL=6547b3bd0be6aabf873560241d7a24f7a14afcc7.js.map