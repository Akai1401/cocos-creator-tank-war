System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Component, director, instantiate, Label, Node, Prefab, Vec3, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, roomCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Component = _cc.Component;
      director = _cc.director;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "6f838e/MWBAwrEvFqVHwtQQ", "roomCtrl", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Component', 'director', 'instantiate', 'Label', 'Node', 'Prefab', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("roomCtrl", roomCtrl = (_dec = ccclass("roomCtrl"), _dec2 = property({
        type: Button
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Node
      }), _dec(_class = (_class2 = class roomCtrl extends Component {
        constructor(...args) {
          super(...args);

          // play button
          _initializerDefineProperty(this, "playBtn", _descriptor, this);

          // tank prefab
          _initializerDefineProperty(this, "tank", _descriptor2, this);

          // user list container
          _initializerDefineProperty(this, "userListContainer", _descriptor3, this);
        }

        onLoad() {
          // render my tank
          this.renderUserList(); // on click play button

          this.playBtn.node.on(Button.EventType.CLICK, () => {
            window.socketManager.send(JSON.stringify({
              event: "startGame",
              data: {
                id: window.myTankId
              }
            }));
          }); // socket listeners

          window.socketManager.onmessage = event => {
            const data = JSON.parse(event.data); // on startGame event

            if ((data == null ? void 0 : data.event) === "startGame") {
              director.loadScene("play");
              return;
            } // on leave room event


            if ((data == null ? void 0 : data.event) === "disconnect") {
              console.log("disconnect", data);
              this.removeUserFromList(data);
            } // on joinRoom event


            if ((data == null ? void 0 : data.event) === "joinRoom") {
              this.tank && this.addUserToList(data);
            }
          };
        }

        addUserToList(data) {
          this.userListContainer.removeAllChildren();
          window.userListArr.push(data);
          this.renderUserList();
        }

        removeUserFromList(data) {
          this.userListContainer.removeAllChildren();
          const newArr = window.userListArr.filter(item => item.id !== (data == null ? void 0 : data.id));
          window.userListArr = newArr;
          this.renderUserList();
        }

        renderUserList() {
          window.userListArr.forEach(item => {
            var _item$id;

            const userNode = instantiate(this.tank);
            const labelNode = new Node();
            const labelComponent = labelNode.addComponent(Label);
            labelComponent.string = (item == null || (_item$id = item.id) == null ? void 0 : _item$id.slice(0, 3)) + ((item == null ? void 0 : item.id) === window.myTankId ? " (You)" : "");
            labelNode.setPosition(new Vec3(0, 70, 0));
            userNode.addChild(labelNode);
            userNode.name = item == null ? void 0 : item.id;
            const userCount = this.userListContainer.children.length;
            const row = Math.floor(userCount / 4);
            const col = userCount % 4;
            const xOffset = 150;
            const yOffset = 150;
            const newPosition = new Vec3(-220 + col * xOffset, 100 + -row * yOffset, 0);
            userNode.setPosition(newPosition);
            this.userListContainer.addChild(userNode);
          });
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tank", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "userListContainer", [_dec4], {
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
//# sourceMappingURL=18dd874d7842caddfa477a5cd1236390707c6d7b.js.map