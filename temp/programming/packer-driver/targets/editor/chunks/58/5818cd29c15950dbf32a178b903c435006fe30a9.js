System.register(["__unresolved_0", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var utils, platform;
  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      platform = _unresolved_2.default;
    }],
    execute: function () {
      _export("default", platform.hasStandardBrowserEnv ? // Standard browser envs support document.cookie
      {
        write(name, value, expires, path, domain, secure) {
          const cookie = [name + '=' + encodeURIComponent(value)];
          utils.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());
          utils.isString(path) && cookie.push('path=' + path);
          utils.isString(domain) && cookie.push('domain=' + domain);
          secure === true && cookie.push('secure');
          document.cookie = cookie.join('; ');
        },

        read(name) {
          const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return match ? decodeURIComponent(match[3]) : null;
        },

        remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }

      } : // Non-standard browser env (web workers, react-native) lack needed support.
      {
        write() {},

        read() {
          return null;
        },

        remove() {}

      });
    }
  };
});
//# sourceMappingURL=5818cd29c15950dbf32a178b903c435006fe30a9.js.map