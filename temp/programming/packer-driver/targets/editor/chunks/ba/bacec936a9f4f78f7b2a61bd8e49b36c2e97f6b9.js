System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Collider2D, Component, Contact2DType, director, Input, input, instantiate, KeyCode, Node, Prefab, Vec3, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _crd, ccclass, property, Tank;

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
      Collider2D = _cc.Collider2D;
      Component = _cc.Component;
      Contact2DType = _cc.Contact2DType;
      director = _cc.director;
      Input = _cc.Input;
      input = _cc.input;
      instantiate = _cc.instantiate;
      KeyCode = _cc.KeyCode;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a0690st3EFL+o9e1JCo4Y4O", "tank", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Collider2D', 'Component', 'Contact2DType', 'director', 'EventKeyboard', 'Input', 'input', 'instantiate', 'IPhysics2DContact', 'KeyCode', 'Node', 'Prefab', 'UIOpacity', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Tank", Tank = (_dec = ccclass("Tank"), _dec2 = property({
        type: Button
      }), _dec3 = property({
        type: Button
      }), _dec4 = property({
        type: Button
      }), _dec5 = property({
        type: Button
      }), _dec6 = property({
        type: Button
      }), _dec7 = property(Prefab), _dec(_class = (_class2 = class Tank extends Component {
        constructor(...args) {
          super(...args);
          this.direction = new Vec3(0, 0, 0);
          this.angle = new Vec3(0, 0, 0);
          this.speed = 300;

          _initializerDefineProperty(this, "upBtn", _descriptor, this);

          _initializerDefineProperty(this, "downBtn", _descriptor2, this);

          _initializerDefineProperty(this, "leftBtn", _descriptor3, this);

          _initializerDefineProperty(this, "rightBtn", _descriptor4, this);

          _initializerDefineProperty(this, "fireBtn", _descriptor5, this);

          _initializerDefineProperty(this, "bullet", _descriptor6, this);

          this.previousPosition = new Vec3();
          this.hp = 100;
        }

        onBeginContactMyBullet(selfCollider, otherCollider, contact) {
          if (selfCollider.node.name === "my_bullet" && otherCollider.node.name === "my_bullet") {
            return;
          }

          if (otherCollider.node.name === "wall" || otherCollider.node.name !== "tank") {
            // hide bullet
            setTimeout(() => {
              selfCollider.node.destroy();
            }, 1);
          }
        }

        onLoad() {
          this.leftBtn.node.on(Node.EventType.TOUCH_START, () => {
            this.direction.x = -this.speed;
            this.angle = new Vec3(0, 0, 90);
            return;
          }, this);
          this.rightBtn.node.on(Node.EventType.TOUCH_START, () => {
            this.direction.x = this.speed;
            this.angle = new Vec3(0, 0, -90);
            return;
          });
          this.upBtn.node.on(Node.EventType.TOUCH_START, () => {
            this.direction.y = this.speed;
            this.angle = new Vec3(0, 0, 0);
            return;
          });
          this.downBtn.node.on(Node.EventType.TOUCH_START, () => {
            this.direction.y = -this.speed;
            this.angle = new Vec3(0, 0, 180);
            return;
          });
          this.fireBtn.node.on(Button.EventType.CLICK, () => {
            this.Fire();
            window.socketManager.send(JSON.stringify({
              event: "fire",
              data: {
                id: window.myTankId,
                angle: this.angle.z
              }
            }));
          });
          this.leftBtn.node.on(Node.EventType.TOUCH_END, () => {
            this.direction = new Vec3(0, 0, 0);
            return;
          });
          this.rightBtn.node.on(Node.EventType.TOUCH_END, () => {
            this.direction = new Vec3(0, 0, 0);
            return;
          });
          this.upBtn.node.on(Node.EventType.TOUCH_END, () => {
            this.direction = new Vec3(0, 0, 0);
            return;
          });
          this.downBtn.node.on(Node.EventType.TOUCH_END, () => {
            this.direction = new Vec3(0, 0, 0);
            return;
          });
        }

        start() {
          console.log("PlayerController start");
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        }

        update(deltaTime) {
          let pos = this.node.getPosition();
          pos.add(this.direction.clone().multiplyScalar(deltaTime));
          this.node.setPosition(pos);
          this.node.setRotationFromEuler(this.angle);
          const currentPosition = this.node.getPosition();

          if (!currentPosition.equals(this.previousPosition)) {
            this.sendPosition();
            this.previousPosition.set(currentPosition);
          }

          if (this.hp <= 0) {
            window.socketManager.close();
            setTimeout(() => {
              director.loadScene("gameOver");
            }, 500);
          }
        }

        Fire() {
          let bullet = instantiate(this.bullet);
          const PlayerPos = this.node.getPosition();
          bullet.name = "my_bullet";
          bullet.setPosition(PlayerPos);
          bullet.setRotationFromEuler(this.angle);
          this.node.parent.addChild(bullet);
          let collider = bullet.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactMyBullet, this);
          }
        }

        onKeyDown(EventType) {
          if (KeyCode.ARROW_LEFT == EventType.keyCode) {
            this.direction.x = -this.speed;
            this.angle = new Vec3(0, 0, 90);
            return;
          }

          if (KeyCode.ARROW_RIGHT == EventType.keyCode) {
            this.direction.x = this.speed;
            this.angle = new Vec3(0, 0, -90);
            return;
          }

          if (KeyCode.ARROW_UP == EventType.keyCode) {
            this.direction.y = this.speed;
            this.angle = new Vec3(0, 0, 0);
            return;
          }

          if (KeyCode.ARROW_DOWN == EventType.keyCode) {
            this.direction.y = -this.speed;
            this.angle = new Vec3(0, 0, 180);
            return;
          }

          if (KeyCode.SPACE == EventType.keyCode) {
            this.Fire();
            window.socketManager.send(JSON.stringify({
              event: "fire",
              data: {
                id: window.myTankId,
                angle: this.angle.z
              }
            }));
          }
        }

        sendPosition() {
          window.socketManager.send(JSON.stringify({
            event: "play",
            data: {
              id: window.myTankId,
              x: this.node.position.x,
              y: this.node.position.y,
              angle: this.angle.z
            }
          }));
        }

        onKeyUp(EventType) {
          this.direction = new Vec3(0, 0, 0);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "upBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "downBtn", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "leftBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "rightBtn", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "fireBtn", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bullet", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bacec936a9f4f78f7b2a61bd8e49b36c2e97f6b9.js.map