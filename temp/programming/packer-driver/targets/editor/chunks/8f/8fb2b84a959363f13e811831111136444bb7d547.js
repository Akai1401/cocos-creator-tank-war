System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var platform, utils, isURLSameOrigin, cookies, buildFullPath, mergeConfig, AxiosHeaders, buildURL;
  return {
    setters: [function (_unresolved_) {
      platform = _unresolved_.default;
    }, function (_unresolved_2) {
      utils = _unresolved_2.default;
    }, function (_unresolved_3) {
      isURLSameOrigin = _unresolved_3.default;
    }, function (_unresolved_4) {
      cookies = _unresolved_4.default;
    }, function (_unresolved_5) {
      buildFullPath = _unresolved_5.default;
    }, function (_unresolved_6) {
      mergeConfig = _unresolved_6.default;
    }, function (_unresolved_7) {
      AxiosHeaders = _unresolved_7.default;
    }, function (_unresolved_8) {
      buildURL = _unresolved_8.default;
    }],
    execute: function () {
      _export("default", config => {
        const newConfig = mergeConfig({}, config);
        let {
          data,
          withXSRFToken,
          xsrfHeaderName,
          xsrfCookieName,
          headers,
          auth
        } = newConfig;
        newConfig.headers = headers = AxiosHeaders.from(headers);
        newConfig.url = buildURL(buildFullPath(newConfig.baseURL, newConfig.url), config.params, config.paramsSerializer); // HTTP basic authentication

        if (auth) {
          headers.set('Authorization', 'Basic ' + btoa((auth.username || '') + ':' + (auth.password ? unescape(encodeURIComponent(auth.password)) : '')));
        }

        let contentType;

        if (utils.isFormData(data)) {
          if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
            headers.setContentType(undefined); // Let the browser set it
          } else if ((contentType = headers.getContentType()) !== false) {
            // fix semicolon duplication issue for ReactNative FormData implementation
            const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
            headers.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
          }
        } // Add xsrf header
        // This is only done if running in a standard browser environment.
        // Specifically not if we're in a web worker, or react-native.


        if (platform.hasStandardBrowserEnv) {
          withXSRFToken && utils.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(newConfig));

          if (withXSRFToken || withXSRFToken !== false && isURLSameOrigin(newConfig.url)) {
            // Add xsrf header
            const xsrfValue = xsrfHeaderName && xsrfCookieName && cookies.read(xsrfCookieName);

            if (xsrfValue) {
              headers.set(xsrfHeaderName, xsrfValue);
            }
          }
        }

        return newConfig;
      });
    }
  };
});
//# sourceMappingURL=8fb2b84a959363f13e811831111136444bb7d547.js.map