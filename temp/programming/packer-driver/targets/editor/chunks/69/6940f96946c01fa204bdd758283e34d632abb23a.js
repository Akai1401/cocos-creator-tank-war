System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, Button, Component, director, instantiate, Label, Node, Prefab, Sprite, Vec3, buyItem, getAllItems, getMyItem, colorMapping, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _crd, ccclass, property, Store;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfbuyItem(extras) {
    _reporterNs.report("buyItem", "./apis", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetAllItems(extras) {
    _reporterNs.report("getAllItems", "./apis", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetMyItem(extras) {
    _reporterNs.report("getMyItem", "./apis", _context.meta, extras);
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
      AudioSource = _cc.AudioSource;
      Button = _cc.Button;
      Component = _cc.Component;
      director = _cc.director;
      instantiate = _cc.instantiate;
      Label = _cc.Label;
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      Sprite = _cc.Sprite;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      buyItem = _unresolved_2.buyItem;
      getAllItems = _unresolved_2.getAllItems;
      getMyItem = _unresolved_2.getMyItem;
    }, function (_unresolved_3) {
      colorMapping = _unresolved_3.colorMapping;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "53fa9Nph35IRozVHg/7obwF", "Store", undefined);

      __checkObsolete__(['_decorator', 'AudioClip', 'AudioSource', 'Button', 'Color', 'Component', 'director', 'instantiate', 'Label', 'Node', 'Prefab', 'Sprite', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Store", Store = (_dec = ccclass("Store"), _dec2 = property({
        type: Button
      }), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property({
        type: Node
      }), _dec6 = property({
        type: [AudioSource]
      }), _dec(_class = (_class2 = class Store extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "backBtn", _descriptor, this);

          _initializerDefineProperty(this, "activeItemPrefab", _descriptor2, this);

          _initializerDefineProperty(this, "itemPrefab", _descriptor3, this);

          _initializerDefineProperty(this, "itemListContainer", _descriptor4, this);

          _initializerDefineProperty(this, "audioSource", _descriptor5, this);
        }

        async handleBuyItem(itemId) {
          const res = await (_crd && buyItem === void 0 ? (_reportPossibleCrUseOfbuyItem({
            error: Error()
          }), buyItem) : buyItem)(itemId);
          console.log(res);
        }

        onLoad() {
          (_crd && getAllItems === void 0 ? (_reportPossibleCrUseOfgetAllItems({
            error: Error()
          }), getAllItems) : getAllItems)().then(res => {
            if (this.itemPrefab) {
              res.forEach(item => {
                var _this$itemListContain;

                const userNode = instantiate(this.itemPrefab);
                const starPriceNode = userNode.getChildByName("star-price");
                starPriceNode.getComponent(Label).string = item.startPrice + " Star";
                starPriceNode.addComponent(Button);
                starPriceNode.on(Button.EventType.CLICK, () => {
                  // console.log("buy item by star", item);
                  window.Telegram.WebApp && window.Telegram.WebApp.close();
                  this.handleBuyItem(item.id);
                });
                const strkPriceNode = userNode.getChildByName("strk-price");
                strkPriceNode.getComponent(Label).string = item.starknetPrice + " STRK";
                strkPriceNode.addComponent(Button);
                strkPriceNode.on(Button.EventType.CLICK, () => {
                  console.log("buy item by STRK", item);
                });

                if ((_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                  error: Error()
                }), colorMapping) : colorMapping)[item.color]) {
                  userNode.getChildByName("image").getComponent(Sprite).color = (_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                    error: Error()
                  }), colorMapping) : colorMapping)[item.color];
                }

                const userCount = (this == null || (_this$itemListContain = this.itemListContainer) == null || (_this$itemListContain = _this$itemListContain.children) == null ? void 0 : _this$itemListContain.length) || 0;
                const row = Math.floor(userCount / 2);
                const col = userCount % 2;
                const xOffset = 300;
                const yOffset = 200;
                const newPosition = new Vec3(-150 + col * xOffset, 150 + -row * yOffset, 0);
                userNode.setPosition(newPosition);
                this.itemListContainer.addChild(userNode);
              });
            }
          });
          (_crd && getMyItem === void 0 ? (_reportPossibleCrUseOfgetMyItem({
            error: Error()
          }), getMyItem) : getMyItem)().then(res => {
            if (this.activeItemPrefab) {
              const userNode = instantiate(this.activeItemPrefab);

              if ((_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                error: Error()
              }), colorMapping) : colorMapping)[res.color]) {
                userNode.getChildByName("image").getComponent(Sprite).color = (_crd && colorMapping === void 0 ? (_reportPossibleCrUseOfcolorMapping({
                  error: Error()
                }), colorMapping) : colorMapping)[res.color];
              }

              this.node.addChild(userNode);
            }
          });
          this.backBtn.node.on(Button.EventType.CLICK, () => {
            director.loadScene("menu");
          });
          this.audioSource.play();
        }

        start() {
          console.log("starttt");
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backBtn", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "activeItemPrefab", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "itemPrefab", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "itemListContainer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "audioSource", [_dec6], {
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
//# sourceMappingURL=6940f96946c01fa204bdd758283e34d632abb23a.js.map