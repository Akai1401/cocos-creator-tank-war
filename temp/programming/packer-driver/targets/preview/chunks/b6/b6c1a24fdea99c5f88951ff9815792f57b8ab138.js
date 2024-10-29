'use strict';

System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var utils, parseHeaders, AxiosHeaders, $internals, isValidHeaderName;

  function normalizeHeader(header) {
    return header && String(header).trim().toLowerCase();
  }

  function normalizeValue(value) {
    if (value === false || value == null) {
      return value;
    }

    return utils.isArray(value) ? value.map(normalizeValue) : String(value);
  }

  function parseTokens(str) {
    var tokens = Object.create(null);
    var tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
    var match;

    while (match = tokensRE.exec(str)) {
      tokens[match[1]] = match[2];
    }

    return tokens;
  }

  function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
    if (utils.isFunction(filter)) {
      return filter.call(this, value, header);
    }

    if (isHeaderNameFilter) {
      value = header;
    }

    if (!utils.isString(value)) return;

    if (utils.isString(filter)) {
      return value.indexOf(filter) !== -1;
    }

    if (utils.isRegExp(filter)) {
      return filter.test(value);
    }
  }

  function formatHeader(header) {
    return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
  }

  function buildAccessors(obj, header) {
    var accessorName = utils.toCamelCase(' ' + header);
    ['get', 'set', 'has'].forEach(methodName => {
      Object.defineProperty(obj, methodName + accessorName, {
        value: function value(arg1, arg2, arg3) {
          return this[methodName].call(this, header, arg1, arg2, arg3);
        },
        configurable: true
      });
    });
  }

  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      parseHeaders = _unresolved_2.default;
    }],
    execute: function () {
      $internals = Symbol('internals');

      isValidHeaderName = str => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

      AxiosHeaders = class AxiosHeaders {
        constructor(headers) {
          headers && this.set(headers);
        }

        set(header, valueOrRewrite, rewrite) {
          var self = this;

          function setHeader(_value, _header, _rewrite) {
            var lHeader = normalizeHeader(_header);

            if (!lHeader) {
              throw new Error('header name must be a non-empty string');
            }

            var key = utils.findKey(self, lHeader);

            if (!key || self[key] === undefined || _rewrite === true || _rewrite === undefined && self[key] !== false) {
              self[key || _header] = normalizeValue(_value);
            }
          }

          var setHeaders = (headers, _rewrite) => utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

          if (utils.isPlainObject(header) || header instanceof this.constructor) {
            setHeaders(header, valueOrRewrite);
          } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
            setHeaders(parseHeaders(header), valueOrRewrite);
          } else if (utils.isHeaders(header)) {
            for (var [key, value] of header.entries()) {
              setHeader(value, key, rewrite);
            }
          } else {
            header != null && setHeader(valueOrRewrite, header, rewrite);
          }

          return this;
        }

        get(header, parser) {
          header = normalizeHeader(header);

          if (header) {
            var key = utils.findKey(this, header);

            if (key) {
              var value = this[key];

              if (!parser) {
                return value;
              }

              if (parser === true) {
                return parseTokens(value);
              }

              if (utils.isFunction(parser)) {
                return parser.call(this, value, key);
              }

              if (utils.isRegExp(parser)) {
                return parser.exec(value);
              }

              throw new TypeError('parser must be boolean|regexp|function');
            }
          }
        }

        has(header, matcher) {
          header = normalizeHeader(header);

          if (header) {
            var key = utils.findKey(this, header);
            return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
          }

          return false;
        }

        delete(header, matcher) {
          var self = this;
          var deleted = false;

          function deleteHeader(_header) {
            _header = normalizeHeader(_header);

            if (_header) {
              var key = utils.findKey(self, _header);

              if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
                delete self[key];
                deleted = true;
              }
            }
          }

          if (utils.isArray(header)) {
            header.forEach(deleteHeader);
          } else {
            deleteHeader(header);
          }

          return deleted;
        }

        clear(matcher) {
          var keys = Object.keys(this);
          var i = keys.length;
          var deleted = false;

          while (i--) {
            var key = keys[i];

            if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
              delete this[key];
              deleted = true;
            }
          }

          return deleted;
        }

        normalize(format) {
          var self = this;
          var headers = {};
          utils.forEach(this, (value, header) => {
            var key = utils.findKey(headers, header);

            if (key) {
              self[key] = normalizeValue(value);
              delete self[header];
              return;
            }

            var normalized = format ? formatHeader(header) : String(header).trim();

            if (normalized !== header) {
              delete self[header];
            }

            self[normalized] = normalizeValue(value);
            headers[normalized] = true;
          });
          return this;
        }

        concat() {
          for (var _len = arguments.length, targets = new Array(_len), _key = 0; _key < _len; _key++) {
            targets[_key] = arguments[_key];
          }

          return this.constructor.concat(this, ...targets);
        }

        toJSON(asStrings) {
          var obj = Object.create(null);
          utils.forEach(this, (value, header) => {
            value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(', ') : value);
          });
          return obj;
        }

        [Symbol.iterator]() {
          return Object.entries(this.toJSON())[Symbol.iterator]();
        }

        toString() {
          return Object.entries(this.toJSON()).map(_ref => {
            var [header, value] = _ref;
            return header + ': ' + value;
          }).join('\n');
        }

        get [Symbol.toStringTag]() {
          return 'AxiosHeaders';
        }

        static from(thing) {
          return thing instanceof this ? thing : new this(thing);
        }

        static concat(first) {
          var computed = new this(first);

          for (var _len2 = arguments.length, targets = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            targets[_key2 - 1] = arguments[_key2];
          }

          targets.forEach(target => computed.set(target));
          return computed;
        }

        static accessor(header) {
          var internals = this[$internals] = this[$internals] = {
            accessors: {}
          };
          var accessors = internals.accessors;
          var prototype = this.prototype;

          function defineAccessor(_header) {
            var lHeader = normalizeHeader(_header);

            if (!accessors[lHeader]) {
              buildAccessors(prototype, _header);
              accessors[lHeader] = true;
            }
          }

          utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
          return this;
        }

      };
      AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']); // reserved names hotfix

      utils.reduceDescriptors(AxiosHeaders.prototype, (_ref2, key) => {
        var {
          value
        } = _ref2;
        var mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`

        return {
          get: () => value,

          set(headerValue) {
            this[mapped] = headerValue;
          }

        };
      });
      utils.freezeMethods(AxiosHeaders);

      _export("default", AxiosHeaders);
    }
  };
});
//# sourceMappingURL=b6c1a24fdea99c5f88951ff9815792f57b8ab138.js.map