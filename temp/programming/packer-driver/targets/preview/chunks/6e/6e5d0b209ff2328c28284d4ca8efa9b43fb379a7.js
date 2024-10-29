'use strict';
/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */

System.register([], function (_export, _context) {
  "use strict";

  function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  }

  _export("default", spread);

  return {
    setters: [],
    execute: function () {}
  };
});
//# sourceMappingURL=6e5d0b209ff2328c28284d4ca8efa9b43fb379a7.js.map