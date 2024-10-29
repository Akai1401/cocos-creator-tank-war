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

      _cclegacy._RF.push({}, "917e36xcjBMVbSlQCuUCWtz", "Menu-001", undefined);

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

          _initializerDefineProperty(this, "multiPlayer", _descriptor, this);

          _initializerDefineProperty(this, "store", _descriptor2, this);

          _initializerDefineProperty(this, "audioSource", _descriptor3, this);
        }

        onLoad() {
          this.multiPlayer.node.on(Button.EventType.CLICK, () => {
            director.loadScene("room");
          });
          this.store.node.on(Button.EventType.CLICK, () => {
            director.loadScene("store");
          });
          this.audioSource.play();
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
//# sourceMappingURL=3f7c711d9a9168b4a35ace85f4a4ad4923c00ce5.js.map