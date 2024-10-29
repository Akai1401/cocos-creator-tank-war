System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        // API
        module.exports = state;
        /**
         * Creates initial state object
         * for iteration over list
         *
         * @param   {array|object} list - list to iterate over
         * @param   {function|null} sortMethod - function to use for keys sort,
         *                                     or `null` to keep them as is
         * @returns {object} - initial state object
         */

        function state(list, sortMethod) {
          var isNamedList = !Array.isArray(list),
              initState = {
            index: 0,
            keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
            jobs: {},
            results: isNamedList ? {} : [],
            size: isNamedList ? Object.keys(list).length : list.length
          };

          if (sortMethod) {
            // sort array keys based on it's values
            // sort object's keys just on own merit
            initState.keyedList.sort(isNamedList ? sortMethod : function (a, b) {
              return sortMethod(list[a], list[b]);
            });
          }

          return initState;
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=c54207b7b2468cbbe24228001b7e236fc65b164c.js.map