System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _cjsExports, _ascending, _descending, __cjsMetaURL;

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


        module.exports = serialOrdered; // sorting helpers

        module.exports.ascending = ascending;
        module.exports.descending = descending;
        /**
         * Runs iterator over provided sorted array elements in series
         *
         * @param   {array|object} list - array or object (named list) to iterate over
         * @param   {function} iterator - iterator to run
         * @param   {function} sortMethod - custom sort function
         * @param   {function} callback - invoked when all elements processed
         * @returns {function} - jobs terminator
         */

        function serialOrdered(list, iterator, sortMethod, callback) {
          var state = initState(list, sortMethod);
          iterate(list, iterator, state, function iteratorHandler(error, result) {
            if (error) {
              callback(error, result);
              return;
            }

            state.index++; // are we there yet?

            if (state.index < (state['keyedList'] || list).length) {
              iterate(list, iterator, state, iteratorHandler);
              return;
            } // done here


            callback(null, state.results);
          });
          return terminator.bind(state, callback);
        }
        /*
         * -- Sort methods
         */

        /**
         * sort helper to sort array elements in ascending order
         *
         * @param   {mixed} a - an item to compare
         * @param   {mixed} b - an item to compare
         * @returns {number} - comparison result
         */


        function ascending(a, b) {
          return a < b ? -1 : a > b ? 1 : 0;
        }
        /**
         * sort helper to sort array elements in descending order
         *
         * @param   {mixed} a - an item to compare
         * @param   {mixed} b - an item to compare
         * @returns {number} - comparison result
         */


        function descending(a, b) {
          return -1 * ascending(a, b);
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _ascending = module.exports.ascending;
        _descending = module.exports.descending;
      }, () => ({
        './lib/iterate.js': _req,
        './lib/state.js': _req0,
        './lib/terminator.js': _req1
      }));
    }
  };
});
//# sourceMappingURL=e3903f548d02c5995e5888e730402f80ffa558a9.js.map