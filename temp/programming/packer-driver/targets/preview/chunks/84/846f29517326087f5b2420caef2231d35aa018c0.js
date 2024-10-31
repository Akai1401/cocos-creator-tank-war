System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, Color, _crd, colorMapping;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      Color = _cc.Color;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7bad0M1VZtPqZJGcCUcXLcI", "index", undefined);

      __checkObsolete__(['Color']);

      _export("colorMapping", colorMapping = {
        red: new Color(255, 0, 0),
        black: null,
        purple: new Color(128, 0, 128),
        orange: new Color(255, 165, 0)
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=846f29517326087f5b2420caef2231d35aa018c0.js.map