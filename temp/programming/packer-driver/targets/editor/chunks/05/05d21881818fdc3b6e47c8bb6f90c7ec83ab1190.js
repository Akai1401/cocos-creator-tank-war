System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_unresolved_2) {
      _req = _unresolved_2.__cjsMetaURL;
    }, function (_unresolved_3) {
      _req0 = _unresolved_3.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        var async = require('./async.js'),
            abort = require('./abort.js'); // API


        module.exports = iterate;
        /**
         * Iterates over each job object
         *
         * @param {array|object} list - array or object (named list) to iterate over
         * @param {function} iterator - iterator to run
         * @param {object} state - current job status
         * @param {function} callback - invoked when all elements processed
         */

        function iterate(list, iterator, state, callback) {
          // store current index
          var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;
          state.jobs[key] = runJob(iterator, key, list[key], function (error, output) {
            // don't repeat yourself
            // skip secondary callbacks
            if (!(key in state.jobs)) {
              return;
            } // clean up jobs


            delete state.jobs[key];

            if (error) {
              // don't process rest of the results
              // stop still active jobs
              // and reset the list
              abort(state);
            } else {
              state.results[key] = output;
            } // return salvaged results


            callback(error, state.results);
          });
        }
        /**
         * Runs iterator over provided job element
         *
         * @param   {function} iterator - iterator to invoke
         * @param   {string|number} key - key/index of the element in the list of jobs
         * @param   {mixed} item - job description
         * @param   {function} callback - invoked after iterator is done with the job
         * @returns {function|mixed} - job abort function or something else
         */


        function runJob(iterator, key, item, callback) {
          var aborter; // allow shortcut if iterator expects only two arguments

          if (iterator.length == 2) {
            aborter = iterator(item, async(callback));
          } // otherwise go with full three arguments
          else {
            aborter = iterator(item, key, async(callback));
          }

          return aborter;
        } // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);
      }, () => ({
        './async.js': _req,
        './abort.js': _req0
      }));
    }
  };
});
//# sourceMappingURL=05d21881818fdc3b6e47c8bb6f90c7ec83ab1190.js.map