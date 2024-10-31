System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, BE_URL, _crd, HEADER, loginByBot, getAllItems, getMyItem, buyItem;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
        Authorization: localStorage.getItem("token") ? "Bearer " + localStorage.getItem("token") : undefined
      };

      _export("loginByBot", loginByBot = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator(function* (data) {
          var res = yield fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
            error: Error()
          }), BE_URL) : BE_URL) + "/api/auth/login-through-bot", {
            method: "POST",
            headers: HEADER,
            body: JSON.stringify({
              telegramData: data
            })
          });
          return yield res.json();
        });

        return function loginByBot(_x) {
          return _ref.apply(this, arguments);
        };
      }());

      _export("getAllItems", getAllItems = /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(function* () {
          var res = yield fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
            error: Error()
          }), BE_URL) : BE_URL) + "/api/account/get-all-items", {
            method: "GET",
            headers: HEADER
          });
          return yield res.json();
        });

        return function getAllItems() {
          return _ref2.apply(this, arguments);
        };
      }());

      _export("getMyItem", getMyItem = /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator(function* () {
          var res = yield fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
            error: Error()
          }), BE_URL) : BE_URL) + "/api/account/get-item", {
            method: "GET",
            headers: HEADER
          });
          return yield res.json();
        });

        return function getMyItem() {
          return _ref3.apply(this, arguments);
        };
      }());

      _export("buyItem", buyItem = /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator(function* (itemId) {
          var res = yield fetch((_crd && BE_URL === void 0 ? (_reportPossibleCrUseOfBE_URL({
            error: Error()
          }), BE_URL) : BE_URL) + "/api/account/buy-item-by-star/" + itemId, {
            method: "GET",
            headers: HEADER
          });
          return yield res.json();
        });

        return function buyItem(_x2) {
          return _ref4.apply(this, arguments);
        };
      }());

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d0e3b4a8128107723c8bbb95fab94a479b082d2f.js.map