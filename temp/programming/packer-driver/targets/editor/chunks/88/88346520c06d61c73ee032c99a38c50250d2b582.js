System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }, function (_unresolved_4) {
      _req1 = _unresolved_4.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var iterate = require('./lib/iterate.js'),
            initState = require('./lib/state.js'),
            terminator = require('./lib/terminator.js'); // Public API


        module.exports = parallel;
        /**
         * Runs iterator over provided array elements in parallel
         *
         * @param   {array|object} list - array or object (named list) to iterate over
         * @param   {function} iterator - iterator to run
         * @param   {function} callback - invoked when all elements processed
         * @returns {function} - jobs terminator
         */

        function parallel(list, iterator, callback) {
          var state = initState(list);

          while (state.index < (state['keyedList'] || list).length) {
            iterate(list, iterator, state, function (error, result) {
              if (error) {
                callback(error, result);
                return;
              } // looks like it's the last one


              if (Object.keys(state.jobs).length === 0) {
                callback(null, state.results);
                return;
              }
            });
            state.index++;
          }

          return terminator.bind(state, callback);
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './lib/iterate.js': _req,
        './lib/state.js': _req0,
        './lib/terminator.js': _req1
      }));
    }
  };
});
//# sourceMappingURL=88346520c06d61c73ee032c99a38c50250d2b582.js.map