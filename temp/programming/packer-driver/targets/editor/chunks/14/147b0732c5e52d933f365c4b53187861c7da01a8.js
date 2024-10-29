System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, Button, Component, director, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Menu;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioSource = _cc.AudioSource;
      Button = _cc.Button;
      Component = _cc.Component;
      director = _cc.director;
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
        constructor(...args) {
          super(...args);

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

          this.socket = new WebSocket("ws://a1ac-27-72-104-163.ngrok-free.app"); // global variable

          window.socketManager = this.socket;
          window.userListArr = []; // on click multiplayer button

          this.multiPlayer.node.on(Button.EventType.CLICK, () => {
            window.socketManager.send(JSON.stringify({
              event: "joinRoom",
              data: {
                id: window.myTankId
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
            const data = JSON.parse(event.data); // on connect event

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
                window.userListArr.push(data);
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
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "store", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=147b0732c5e52d933f365c4b53187861c7da01a8.js.map