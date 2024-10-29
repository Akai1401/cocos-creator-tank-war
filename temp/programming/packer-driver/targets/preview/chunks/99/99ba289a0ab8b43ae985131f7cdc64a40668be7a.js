System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, _dec, _class, _crd, ccclass, property, BulletCtrl;

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

      _cclegacy._RF.push({}, "d1a24Ymt3xC4YhUAeq6vERt", "bulletCtrl", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'view']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BulletCtrl", BulletCtrl = (_dec = ccclass("BulletCtrl"), _dec(_class = class BulletCtrl extends Component {
        start() {}

        update(deltaTime) {
          var pos = this.node.getPosition();
          var speed = this.node.up.multiplyScalar(10);
          pos.add(speed);
          this.node.setPosition(pos);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=99ba289a0ab8b43ae985131f7cdc64a40668be7a.js.map