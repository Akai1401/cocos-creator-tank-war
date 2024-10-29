'use strict';

System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var utils, ignoreDuplicateOf;
  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }],
    execute: function () {
      // RawAxiosHeaders whose duplicates are ignored by node
      // c.f. https://nodejs.org/api/http.html#http_message_headers
      ignoreDuplicateOf = utils.toObjectSet(['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent']);
      /**
       * Parse headers into an object
       *
       * ```
       * Date: Wed, 27 Aug 2014 08:58:49 GMT
       * Content-Type: application/json
       * Connection: keep-alive
       * Transfer-Encoding: chunked
       * ```
       *
       * @param {String} rawHeaders Headers needing to be parsed
       *
       * @returns {Object} Headers parsed into an object
       */

      _export("default", rawHeaders => {
        var parsed = {};
        var key;
        var val;
        var i;
        rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
          i = line.indexOf(':');
          key = line.substring(0, i).trim().toLowerCase();
          val = line.substring(i + 1).trim();

          if (!key || parsed[key] && ignoreDuplicateOf[key]) {
            return;
          }

          if (key === 'set-cookie') {
            if (parsed[key]) {
              parsed[key].push(val);
            } else {
              parsed[key] = [val];
            }
          } else {
            parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
          }
        });
        return parsed;
      });
    }
  };
});
//# sourceMappingURL=d62dabd661430e1c3aafa08f7fc9ac2b998b4dd0.js.map