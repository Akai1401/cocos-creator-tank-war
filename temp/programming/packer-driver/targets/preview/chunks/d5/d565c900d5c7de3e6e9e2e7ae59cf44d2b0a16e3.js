System.register(["__unresolved_0", "ms"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_ms) {
      _req = _ms.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        /**
         * This is the common logic for both the Node.js and web browser
         * implementations of `debug()`.
         */
        function setup(env) {
          createDebug.debug = createDebug;
          createDebug.default = createDebug;
          createDebug.coerce = coerce;
          createDebug.disable = disable;
          createDebug.enable = enable;
          createDebug.enabled = enabled;
          createDebug.humanize = require('ms');
          createDebug.destroy = destroy;
          Object.keys(env).forEach(key => {
            createDebug[key] = env[key];
          });
          /**
          * The currently active debug mode names, and names to skip.
          */

          createDebug.names = [];
          createDebug.skips = [];
          /**
          * Map of special "%n" handling functions, for the debug "format" argument.
          *
          * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
          */

          createDebug.formatters = {};
          /**
          * Selects a color for a debug namespace
          * @param {String} namespace The namespace string for the debug instance to be colored
          * @return {Number|String} An ANSI color code for the given namespace
          * @api private
          */

          function selectColor(namespace) {
            var hash = 0;

            for (var i = 0; i < namespace.length; i++) {
              hash = (hash << 5) - hash + namespace.charCodeAt(i);
              hash |= 0; // Convert to 32bit integer
            }

            return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
          }

          createDebug.selectColor = selectColor;
          /**
          * Create a debugger with the given `namespace`.
          *
          * @param {String} namespace
          * @return {Function}
          * @api public
          */

          function createDebug(namespace) {
            var prevTime;
            var enableOverride = null;
            var namespacesCache;
            var enabledCache;

            function debug() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              // Disabled?
              if (!debug.enabled) {
                return;
              }

              var self = debug; // Set `diff` timestamp

              var curr = Number(new Date());
              var ms = curr - (prevTime || curr);
              self.diff = ms;
              self.prev = prevTime;
              self.curr = curr;
              prevTime = curr;
              args[0] = createDebug.coerce(args[0]);

              if (typeof args[0] !== 'string') {
                // Anything else let's inspect with %O
                args.unshift('%O');
              } // Apply any `formatters` transformations


              var index = 0;
              args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
                // If we encounter an escaped % then don't increase the array index
                if (match === '%%') {
                  return '%';
                }

                index++;
                var formatter = createDebug.formatters[format];

                if (typeof formatter === 'function') {
                  var val = args[index];
                  match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

                  args.splice(index, 1);
                  index--;
                }

                return match;
              }); // Apply env-specific formatting (colors, etc.)

              createDebug.formatArgs.call(self, args);
              var logFn = self.log || createDebug.log;
              logFn.apply(self, args);
            }

            debug.namespace = namespace;
            debug.useColors = createDebug.useColors();
            debug.color = createDebug.selectColor(namespace);
            debug.extend = extend;
            debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

            Object.defineProperty(debug, 'enabled', {
              enumerable: true,
              configurable: false,
              get: () => {
                if (enableOverride !== null) {
                  return enableOverride;
                }

                if (namespacesCache !== createDebug.namespaces) {
                  namespacesCache = createDebug.namespaces;
                  enabledCache = createDebug.enabled(namespace);
                }

                return enabledCache;
              },
              set: v => {
                enableOverride = v;
              }
            }); // Env-specific initialization logic for debug instances

            if (typeof createDebug.init === 'function') {
              createDebug.init(debug);
            }

            return debug;
          }

          function extend(namespace, delimiter) {
            var newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
            newDebug.log = this.log;
            return newDebug;
          }
          /**
          * Enables a debug mode by namespaces. This can include modes
          * separated by a colon and wildcards.
          *
          * @param {String} namespaces
          * @api public
          */


          function enable(namespaces) {
            createDebug.save(namespaces);
            createDebug.namespaces = namespaces;
            createDebug.names = [];
            createDebug.skips = [];
            var i;
            var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
            var len = split.length;

            for (i = 0; i < len; i++) {
              if (!split[i]) {
                // ignore empty strings
                continue;
              }

              namespaces = split[i].replace(/\*/g, '.*?');

              if (namespaces[0] === '-') {
                createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
              } else {
                createDebug.names.push(new RegExp('^' + namespaces + '$'));
              }
            }
          }
          /**
          * Disable debug output.
          *
          * @return {String} namespaces
          * @api public
          */


          function disable() {
            var namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
            createDebug.enable('');
            return namespaces;
          }
          /**
          * Returns true if the given mode name is enabled, false otherwise.
          *
          * @param {String} name
          * @return {Boolean}
          * @api public
          */


          function enabled(name) {
            if (name[name.length - 1] === '*') {
              return true;
            }

            var i;
            var len;

            for (i = 0, len = createDebug.skips.length; i < len; i++) {
              if (createDebug.skips[i].test(name)) {
                return false;
              }
            }

            for (i = 0, len = createDebug.names.length; i < len; i++) {
              if (createDebug.names[i].test(name)) {
                return true;
              }
            }

            return false;
          }
          /**
          * Convert regexp to namespace
          *
          * @param {RegExp} regxep
          * @return {String} namespace
          * @api private
          */


          function toNamespace(regexp) {
            return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
          }
          /**
          * Coerce `val`.
          *
          * @param {Mixed} val
          * @return {Mixed}
          * @api private
          */


          function coerce(val) {
            if (val instanceof Error) {
              return val.stack || val.message;
            }

            return val;
          }
          /**
          * XXX DO NOT USE. This is a temporary stub function.
          * XXX It WILL be removed in the next major release.
          */


          function destroy() {
            console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
          }

          createDebug.enable(createDebug.load());
          return createDebug;
        }

        module.exports = setup; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, () => ({
        'ms': _req
      }));
    }
  };
});
//# sourceMappingURL=d565c900d5c7de3e6e9e2e7ae59cf44d2b0a16e3.js.map