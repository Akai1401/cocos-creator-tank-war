System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, Button, Component, director, SOCKET_URL, loginByBot, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Menu;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfSOCKET_URL(extras) {
    _reporterNs.report("SOCKET_URL", "./constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfloginByBot(extras) {
    _reporterNs.report("loginByBot", "./apis", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioSource = _cc.AudioSource;
      Button = _cc.Button;
      Component = _cc.Component;
      director = _cc.director;
    }, function (_unresolved_2) {
      SOCKET_URL = _unresolved_2.SOCKET_URL;
    }, function (_unresolved_3) {
      loginByBot = _unresolved_3.loginByBot;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "54c04aJlclH2K2HmhM7kShU", "Menu", undefined);

      __checkObsolete__(['_decorator', 'AudioSource', 'Button', 'Component', 'director']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Menu", Menu = (_dec = ccclass("Menu"), _dec2 = property({
        type: Button
      }), _dec3 = property({
        type: Button
      }), _dec4 = property({
        type: [AudioSource]
      }), _dec(_class = (_class2 = class Menu extends Component {
        constructor() {
          super(...arguments);

          // multiPlayer button
          _initializerDefineProperty(this, "multiPlayer", _descriptor, this);

          // store button
          _initializerDefineProperty(this, "store", _descriptor2, this);

          // audio source
          _initializerDefineProperty(this, "audioSource", _descriptor3, this);

          // websocket
          this.socket = null;
        }

        onLoad() {
          // play background music
          this.audioSource.play(); // init websocket connection

          this.socket = new WebSocket(_crd && SOCKET_URL === void 0 ? (_reportPossibleCrUseOfSOCKET_URL({
            error: Error()
          }), SOCKET_URL) : SOCKET_URL);

          try {
            var _webApp$initDataUnsaf, _webApp$initDataUnsaf2, _webApp$initDataUnsaf3, _webApp$initDataUnsaf4;

            var webApp = window.Telegram.WebApp;
            webApp.expand();
            console.log("Telegram.WebApp:", webApp);
            var userData = webApp == null || (_webApp$initDataUnsaf = webApp.initDataUnsafe) == null ? void 0 : _webApp$initDataUnsaf.user;
            var data = {
              auth_date: webApp == null || (_webApp$initDataUnsaf2 = webApp.initDataUnsafe) == null ? void 0 : _webApp$initDataUnsaf2.auth_date,
              query_id: webApp == null || (_webApp$initDataUnsaf3 = webApp.initDataUnsafe) == null ? void 0 : _webApp$initDataUnsaf3.query_id,
              user: JSON.stringify(userData),
              hash: webApp == null || (_webApp$initDataUnsaf4 = webApp.initDataUnsafe) == null ? void 0 : _webApp$initDataUnsaf4.hash
            };
            console.log("login data:", data);
            window.userData = userData;
            (_crd && loginByBot === void 0 ? (_reportPossibleCrUseOfloginByBot({
              error: Error()
            }), loginByBot) : loginByBot)(data).then(res => {
              localStorage.setItem("token", res == null ? void 0 : res.token);
            }).catch(err => {
              console.log(err, "err");
            });
          } catch (error) {
            console.log("error", error); // localStorage.setItem(
            //   "token",
            //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInRlbGVncmFtSWQiOiI1NTE3OTgyNzM2IiwidXNlcm5hbWUiOiJBa2FpXzE0MDEiLCJpYXQiOjE3MzAyMTY3MzcsImV4cCI6MTczMDMwMzEzN30._rw8oLRDWrPfFRJyfkJgdOw7Tp4x3zPa2wdLgr-Y488"
            // );
          } // global variable


          window.socketManager = this.socket;
          window.userListArr = []; // on click multiplayer button

          this.multiPlayer.node.on(Button.EventType.CLICK, () => {
            var _window, _Telegram$WebApp;

            window.socketManager.send(JSON.stringify({
              event: "joinRoom",
              data: {
                id: window.myTankId,
                telegramId: (_window = window) != null && (_window = _window.Telegram) != null && _window.WebApp ? (_Telegram$WebApp = window.Telegram.WebApp) == null || (_Telegram$WebApp = _Telegram$WebApp.initDataUnsafe) == null || (_Telegram$WebApp = _Telegram$WebApp.user) == null ? void 0 : _Telegram$WebApp.id : "5517982736"
              }
            }));
          }); // on click store button

          this.store.node.on(Button.EventType.CLICK, () => {
            director.loadScene("store");
          }); // socket listeners

          window.socketManager.onopen = event => {
            console.log("Connected to server");
          };

          window.socketManager.onmessage = event => {
            var data = JSON.parse(event.data); // on connect event

            if ((data == null ? void 0 : data.event) === "connect") {
              // set myTankId
              if ((data == null ? void 0 : data.type) === "ME") window.myTankId = data == null ? void 0 : data.id;
            } // on joinRoom event


            if ((data == null ? void 0 : data.event) === "joinRoom") {
              // check if the game is already started
              if ((data == null ? void 0 : data.gameState) === "playing") {
                alert("Please wait for the current game to finish");
                return;
              } else {
                window.userListArr.push(data); // (window as any).myTankColor = data?.color;

                director.loadScene("room");
              }
            }
          };

          window.socketManager.onclose = event => {
            console.log("Closed connection to server");
          };
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "multiPlayer", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0947285c42fe422ac2b47b126eb14d87cae3dcad.js.map