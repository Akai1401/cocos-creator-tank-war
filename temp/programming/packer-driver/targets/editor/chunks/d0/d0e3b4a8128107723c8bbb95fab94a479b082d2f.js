System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, BE_URL, _crd, HEADER, loginByBot, getAllItems, getMyItem, buyItem;

  function _reportPossibleCrUseOfBE_URL(extras) {
    _reporterNs.report("BE_URL", "../constants", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      BE_URL = _unresolved_2.BE_URL;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "ffae8jM69VKMaUfmJltLOWI", "index", undefined);

      HEADER = {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
        Authorization: localStorage.getItem("token") ? `Bearer ${localStorage.getItem("token")}` : undefined
      };

      _export("loginByBot", loginByBot = async data => {
        const res = await fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
          error: Error()
        }), BE_URL) : BE_URL) + "/api/auth/login-through-bot", {
          method: "POST",
          headers: HEADER,
          body: JSON.stringify({
            telegramData: data
          })
        });
        return await res.json();
      });

      _export("getAllItems", getAllItems = async () => {
        const res = await fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
          error: Error()
        }), BE_URL) : BE_URL) + "/api/account/get-all-items", {
          method: "GET",
          headers: HEADER
        });
        return await res.json();
      });

      _export("getMyItem", getMyItem = async () => {
        const res = await fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
          error: Error()
        }), BE_URL) : BE_URL) + "/api/account/get-item", {
          method: "GET",
          headers: HEADER
        });
        return await res.json();
      });

      _export("buyItem", buyItem = async itemId => {
        const res = await fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
          error: Error()
        }), BE_URL) : BE_URL) + "/api/account/buy-item-by-star/" + itemId, {
          method: "GET",
          headers: HEADER
        });
        return await res.json();
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d0e3b4a8128107723c8bbb95fab94a479b082d2f.js.map