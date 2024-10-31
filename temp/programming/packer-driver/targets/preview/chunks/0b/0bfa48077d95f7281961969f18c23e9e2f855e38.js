System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Collider2D, Component, Contact2DType, director, instantiate, Label, Node, Prefab, Sprite, Vec3, Tank, colorMapping, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, playCtrl;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfTank(extras) {
    _reporterNs.report("Tank", "./tank", _context.meta, extras);
  }

  function _reportPossibleCrUseOfcolorMapping(extras) {
    _reporterNs.report("colorMapping", "./utils", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      director = _cc.director;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      Tank = _unresolved_2.Tank;
    }, function (_unresolved_3) {
      colorMapping = _unresolved_3.colorMapping;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "5973eY0FFxCubqm1sykvwpR", "playCtrl", undefined);

      __checkObsolete__(['_decorator', 'Collider2D', 'Component', 'Contact2DType', 'director', 'instantiate', 'IPhysics2DContact', 'Label', 'Node', 'Prefab', 'Sprite', 'UIOpacity', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("playCtrl", playCtrl = (_dec = ccclass("playCtrl"), _dec2 = property({
        type: _crd && Tank === void 0 ? (_reportPossibleCrUseOfTank({
          error: Error()
        }), Tank) : Tank
      }), _dec3 = property({
        type: Prefab
      }), _dec4 = property({
        type: Prefab
      }), _dec5 = property({
        type: Node
      }), _dec(_class = (_class2 = class playCtrl extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "tank", _descriptor, this);

          _initializerDefineProperty(this, "tankPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "bullet", _descriptor3, this);

          _initializerDefineProperty(this, "userListContainer", _descriptor4, this);
        }

        onBeginContactMyBullet(selfCollider, otherCollider, contact) {
          if (otherCollider.node.name === "wall" || otherCollider.node.name === "tank") {
            // hide bullet
            setTimeout(() => {
              selfCollider.node.destroy();
            }, 1);
          }

          if (otherCollider.node.name === "tank") {
            // reduce HP
            this.tank.hp -= 10;
            window.socketManager.send(JSON.stringify({
              event: "reduceHP",
              data: {
                id: window.myTankId,
                HP: this.tank.hp
              }
            }));
          }
        }

        onLoad() {
          window.userListArr // .filter((item: any) => item?.id !== (window as any).myTankId)
          .forEach(data => {
            var _data$id;

            // my tank
            if (data.id === window.myTankId) {
              // create name
              var _labelNode = new Node();

              var _labelComponent = _labelNode.addComponent(Label);

              _labelComponent.string = data.id.slice(0, 3) + " (You)";

              _labelNode.setPosition(new Vec3(0, 70, 0));

              this.tank.node.addChild(_labelNode); // create HP

              var _hpNode = new Node();

              var _hpComponent = _hpNode.addComponent(Label);

              _hpComponent.string = "HP: " + this.tank.hp;
              _hpNode.name = "HP";

              _hpNode.setPosition(new Vec3(0, 110, 0));

              this.tank.node.addChild(_hpNode);

              if ((_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                error: Error()
              }), colorMapping) : colorMapping)[data.color]) {
                this.tank.node.getChildByName("image").getComponent(Sprite).color = (_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                  error: Error()
                }), colorMapping) : colorMapping)[data.color];
              }

              return;
            } // other tank name


            var userNode = instantiate(this.tankPrefab);
            var labelNode = new Node();
            var labelComponent = labelNode.addComponent(Label);
            labelComponent.string = data == null || (_data$id = data.id) == null ? void 0 : _data$id.slice(0, 3);
            labelNode.setPosition(new Vec3(0, 70, 0)); // other tank HP

            var hpNode = new Node();
            var hpComponent = hpNode.addComponent(Label);
            hpComponent.string = "HP: " + this.tank.hp;
            hpNode.name = "HP";
            hpNode.setPosition(new Vec3(0, 110, 0)); // other tank color

            if ((_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
              error: Error()
            }), colorMapping) : colorMapping)[data.color]) {
              userNode.getChildByName("image").getComponent(Sprite).color = (_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                error: Error()
              }), colorMapping) : colorMapping)[data.color];
            }

            userNode.addChild(labelNode);
            userNode.addChild(hpNode);
            userNode.name = data == null ? void 0 : data.id;
            this.userListContainer.addChild(userNode);
          });

          window.socketManager.onmessage = event => {
            // console.log("Message from server:", event.data);
            var data = JSON.parse(event.data);

            if ((data == null ? void 0 : data.event) === "play") {
              var userNode = this.userListContainer.getChildByName(data.id);

              if (userNode) {
                userNode.setPosition(data.x, data.y);
                userNode.setRotationFromEuler(new Vec3(0, 0, data.angle));
              }
            }

            if ((data == null ? void 0 : data.event) === "fire") {
              var _userNode = this.userListContainer.getChildByName(data.id);

              if (_userNode) {
                var bullet = instantiate(this.bullet);

                var PlayerPos = _userNode.getPosition();

                if (bullet) {
                  bullet.setPosition(PlayerPos);
                  bullet.setRotationFromEuler(new Vec3(0, 0, data.angle));
                  this.userListContainer.addChild(bullet);
                  bullet.name = "enemy_bullet";
                  var collider = bullet.getComponent(Collider2D);

                  if (collider) {
                    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactMyBullet, this);
                  }
                }
              }
            }

            if ((data == null ? void 0 : data.event) === "reduceHP") {
              var _userNode2 = this.userListContainer.getChildByName(data.id);

              if (_userNode2) {
                var hpNode = _userNode2.getChildByName("HP");

                if (hpNode) {
                  hpNode.getComponent(Label).string = "HP: " + data.HP;
                }
              }

              if (data.id === window.myTankId) {
                this.tank.hp = data.HP;

                var _hpNode2 = this.tank.node.getChildByName("HP");

                if (_hpNode2) {
                  _hpNode2.getComponent(Label).string = "HP: " + data.HP;
                }
              }

              if (data.HP <= 0) {
                this.userListContainer.removeChild(this.userListContainer.getChildByName(data.id));
                window.userListArr = window.userListArr.filter(item => item.id !== data.id);
              }
            }

            if ((data == null ? void 0 : data.event) === "disconnect") {
              this.userListContainer.removeChild(this.userListContainer.getChildByName(data.id));
              var newUserListArr = window.userListArr.filter(item => item.id !== data.id);
              window.userListArr = newUserListArr;

              if (window.userListArr.length === 1) {
                window.socketManager.close();
                setTimeout(() => {
                  alert("You win!");
                  director.loadScene("menu");
                }, 500);
              }
            }
          };
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tank", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "tankPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bullet", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "userListContainer", [_dec5], {
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
//# sourceMappingURL=0bfa48077d95f7281961969f18c23e9e2f855e38.js.map