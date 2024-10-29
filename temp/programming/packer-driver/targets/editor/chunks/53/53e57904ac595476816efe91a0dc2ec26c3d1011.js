System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Input, input, instantiate, KeyCode, Prefab, Vec3, _dec, _dec2, _class, _class2, _descriptor, _crd, ccclass, property, Tank;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Input = _cc.Input;
      input = _cc.input;
      instantiate = _cc.instantiate;
      KeyCode = _cc.KeyCode;
      Prefab = _cc.Prefab;
      Vec3 = _cc.Vec3;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8fa0bjR6oRD+a0VjC2upFF9", "tankCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventKeyboard', 'Input', 'input', 'instantiate', 'KeyCode', 'Node', 'Prefab', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Tank", Tank = (_dec = ccclass("Tank"), _dec2 = property(Prefab), _dec(_class = (_class2 = class Tank extends Component {
        constructor(...args) {
          super(...args);
          this.direction = new Vec3(0, 0, 0);
          this.angle = new Vec3(0, 0, 0);
          this.speed = 300;

          _initializerDefineProperty(this, "bullet", _descriptor, this);
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
        }

        Fire() {
          let bullet = instantiate(this.bullet);
          const PlayerPos = this.node.getPosition();
          bullet.setPosition(PlayerPos);
          bullet.setRotationFromEuler(this.angle);
          this.node.parent.addChild(bullet);
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
          }
        }

        onKeyUp(EventType) {
          this.direction = new Vec3(0, 0, 0);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bullet", [_dec2], {
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
//# sourceMappingURL=53e57904ac595476816efe91a0dc2ec26c3d1011.js.map