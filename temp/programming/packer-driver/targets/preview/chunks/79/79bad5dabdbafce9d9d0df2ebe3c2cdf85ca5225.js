System.register([], function (_export, _context) {
  "use strict";

  var CookieJar, nextTick, globalThisShim, defaultBinaryType;

  function createCookieJar() {
    return new CookieJar();
  }
  /**
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie
   */


  function parse(setCookieString) {
    var parts = setCookieString.split("; ");
    var i = parts[0].indexOf("=");

    if (i === -1) {
      return;
    }

    var name = parts[0].substring(0, i).trim();

    if (!name.length) {
      return;
    }

    var value = parts[0].substring(i + 1).trim();

    if (value.charCodeAt(0) === 0x22) {
      // remove double quotes
      value = value.slice(1, -1);
    }

    var cookie = {
      name,
      value
    };

    for (var j = 1; j < parts.length; j++) {
      var subParts = parts[j].split("=");

      if (subParts.length !== 2) {
        continue;
      }

      var key = subParts[0].trim();

      var _value = subParts[1].trim();

      switch (key) {
        case "Expires":
          cookie.expires = new Date(_value);
          break;

        case "Max-Age":
          var expiration = new Date();
          expiration.setUTCSeconds(expiration.getUTCSeconds() + parseInt(_value, 10));
          cookie.expires = expiration;
          break;

        default: // ignore other keys

      }
    }

    return cookie;
  }

  _export({
    createCookieJar: createCookieJar,
    parse: parse,
    CookieJar: void 0
  });

  return {
    setters: [],
    execute: function () {
      _export("nextTick", nextTick = process.nextTick);

      _export("globalThisShim", globalThisShim = global);

      _export("defaultBinaryType", defaultBinaryType = "nodebuffer");

      _export("CookieJar", CookieJar = class CookieJar {
        constructor() {
          this._cookies = new Map();
        }

        parseCookies(values) {
          if (!values) {
            return;
          }

          values.forEach(value => {
            var parsed = parse(value);

            if (parsed) {
              this._cookies.set(parsed.name, parsed);
            }
          });
        }

        get cookies() {
          var now = Date.now();

          this._cookies.forEach((cookie, name) => {
            var _a;

            if (((_a = cookie.expires) === null || _a === void 0 ? void 0 : _a.getTime()) < now) {
              this._cookies.delete(name);
            }
          });

          return this._cookies.entries();
        }

        addCookies(xhr) {
          var cookies = [];

          for (var [name, cookie] of this.cookies) {
            cookies.push(name + "=" + cookie.value);
          }

          if (cookies.length) {
            xhr.setDisableHeaderCheck(true);
            xhr.setRequestHeader("cookie", cookies.join("; "));
          }
        }

        appendCookies(headers) {
          for (var [name, cookie] of this.cookies) {
            headers.append("cookie", name + "=" + cookie.value);
          }
        }

      });
    }
  };
});
//# sourceMappingURL=79bad5dabdbafce9d9d0df2ebe3c2cdf85ca5225.js.map