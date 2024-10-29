System.register(["__unresolved_0", "tty", "util", "supports-color", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _req, _req0, _req1, _req2, _cjsExports, _init, _log, _formatArgs, _save, _load, _useColors, _destroy, _colors, _inspectOpts, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }, function (_tty) {
      _req = _tty.__cjsMetaURL;
    }, function (_util) {
      _req0 = _util.__cjsMetaURL;
    }, function (_supportsColor) {
      _req1 = _supportsColor.__cjsMetaURL;
    }, function (_unresolved_2) {
      _req2 = _unresolved_2.__cjsMetaURL;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE

        /**
         * Module dependencies.
         */
        var tty = require('tty');

        var util = require('util');
        /**
         * This is the Node.js implementation of `debug()`.
         */


        exports.init = init;
        exports.log = log;
        exports.formatArgs = formatArgs;
        exports.save = save;
        exports.load = load;
        exports.useColors = useColors;
        exports.destroy = util.deprecate(() => {}, 'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        /**
         * Colors.
         */

        exports.colors = [6, 2, 3, 4, 5, 1];

        try {
          // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
          // eslint-disable-next-line import/no-extraneous-dependencies
          var supportsColor = require('supports-color');

          if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
            exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
          }
        } catch (error) {// Swallow - we only care if `supports-color` is available; it doesn't have to be.
        }
        /**
         * Build up the default `inspectOpts` object from the environment variables.
         *
         *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
         */


        exports.inspectOpts = Object.keys(process.env).filter(key => {
          return /^debug_/i.test(key);
        }).reduce((obj, key) => {
          // Camel-case
          var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
            return k.toUpperCase();
          }); // Coerce string value into JS value

          var val = process.env[key];

          if (/^(yes|on|true|enabled)$/i.test(val)) {
            val = true;
          } else if (/^(no|off|false|disabled)$/i.test(val)) {
            val = false;
          } else if (val === 'null') {
            val = null;
          } else {
            val = Number(val);
          }

          obj[prop] = val;
          return obj;
        }, {});
        /**
         * Is stdout a TTY? Colored output is enabled when `true`.
         */

        function useColors() {
          return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
        }
        /**
         * Adds ANSI color escape codes if enabled.
         *
         * @api public
         */


        function formatArgs(args) {
          var {
            namespace: name,
            useColors
          } = this;

          if (useColors) {
            var c = this.color;
            var colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
            var prefix = "  " + colorCode + ";1m" + name + " \x1B[0m";
            args[0] = prefix + args[0].split('\n').join('\n' + prefix);
            args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
          } else {
            args[0] = getDate() + name + ' ' + args[0];
          }
        }

        function getDate() {
          if (exports.inspectOpts.hideDate) {
            return '';
          }

          return new Date().toISOString() + ' ';
        }
        /**
         * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
         */


        function log() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
        }
        /**
         * Save `namespaces`.
         *
         * @param {String} namespaces
         * @api private
         */


        function save(namespaces) {
          if (namespaces) {
            process.env.DEBUG = namespaces;
          } else {
            // If you set a process.env field to null or undefined, it gets cast to the
            // string 'null' or 'undefined'. Just delete instead.
            delete process.env.DEBUG;
          }
        }
        /**
         * Load `namespaces`.
         *
         * @return {String} returns the previously persisted debug modes
         * @api private
         */


        function load() {
          return process.env.DEBUG;
        }
        /**
         * Init logic for `debug` instances.
         *
         * Create a new `inspectOpts` object in case `useColors` is set
         * differently for a particular `debug` instance.
         */


        function init(debug) {
          debug.inspectOpts = {};
          var keys = Object.keys(exports.inspectOpts);

          for (var i = 0; i < keys.length; i++) {
            debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
          }
        }

        module.exports = require('./common')(exports);
        var {
          formatters
        } = module.exports;
        /**
         * Map %o to `util.inspect()`, all on a single line.
         */

        formatters.o = function (v) {
          this.inspectOpts.colors = this.useColors;
          return util.inspect(v, this.inspectOpts).split('\n').map(str => str.trim()).join(' ');
        };
        /**
         * Map %O to `util.inspect()`, allowing multiple lines if needed.
         */


        formatters.O = function (v) {
          this.inspectOpts.colors = this.useColors;
          return util.inspect(v, this.inspectOpts);
        }; // #endregion ORIGINAL CODE


        _export("default", _cjsExports = module.exports);

        _init = module.exports.init;
        _log = module.exports.log;
        _formatArgs = module.exports.formatArgs;
        _save = module.exports.save;
        _load = module.exports.load;
        _useColors = module.exports.useColors;
        _destroy = module.exports.destroy;
        _colors = module.exports.colors;
        _inspectOpts = module.exports.inspectOpts;
      }, () => ({
        'tty': _req,
        'util': _req0,
        'supports-color': _req1,
        './common': _req2
      }));
    }
  };
});
//# sourceMappingURL=9a05ae27d72c6d18e28cf0b50dadac5fef1c03b3.js.map