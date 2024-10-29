System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, Bullet;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d1a24Ymt3xC4YhUAeq6vERt", "bullet", undefined);

      __checkObsolete__(['_decorator', 'Component']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Bullet", Bullet = (_dec = ccclass("Bullet"), _dec(_class = class Bullet extends Component {
        start() {}

        update(deltaTime) {
          let pos = this.node.getPosition();
          let speed = this.node.up.multiplyScalar(10);
          pos.add(speed);
          this.node.setPosition(pos);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=29dac688ba053cd24b444038128f696467ae6a30.js.map