'use strict';

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
      _export("default", platform.hasStandardBrowserEnv ? // Standard browser envs have full support of the APIs needed to test
      // whether the request URL is of the same origin as current location.
      function standardBrowserEnv() {
        var msie = platform.navigator && /(msie|trident)/i.test(platform.navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;
        /**
        * Parse a URL to discover its components
        *
        * @param {String} url The URL to be parsed
        * @returns {Object}
        */

        function resolveURL(url) {
          var href = url;

          if (msie) {
            // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);
        /**
        * Determine if a URL shares the same origin as the current location
        *
        * @param {String} requestURL The URL to test
        * @returns {boolean} True if URL shares the same origin, otherwise false
        */

        return function isURLSameOrigin(requestURL) {
          var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
          return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
        };
      }() : // Non standard browser envs (web workers, react-native) lack needed support.
      function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      }());
    }
  };
});
//# sourceMappingURL=8124d08d4fa9cb02e782d929131f3f039ba7bad1.js.map