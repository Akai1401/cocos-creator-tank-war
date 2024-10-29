System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9"], function (_export, _context) {
  "use strict";

  var utils, settle, transitionalDefaults, AxiosError, CanceledError, parseProtocol, platform, AxiosHeaders, progressEventReducer, resolveConfig, isXHRAdapterSupported;
  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      settle = _unresolved_2.default;
    }, function (_unresolved_3) {
      transitionalDefaults = _unresolved_3.default;
    }, function (_unresolved_4) {
      AxiosError = _unresolved_4.default;
    }, function (_unresolved_5) {
      CanceledError = _unresolved_5.default;
    }, function (_unresolved_6) {
      parseProtocol = _unresolved_6.default;
    }, function (_unresolved_7) {
      platform = _unresolved_7.default;
    }, function (_unresolved_8) {
      AxiosHeaders = _unresolved_8.default;
    }, function (_unresolved_9) {
      progressEventReducer = _unresolved_9.progressEventReducer;
    }, function (_unresolved_10) {
      resolveConfig = _unresolved_10.default;
    }],
    execute: function () {
      isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

      _export("default", isXHRAdapterSupported && function (config) {
        return new Promise(function dispatchXhrRequest(resolve, reject) {
          const _config = resolveConfig(config);

          let requestData = _config.data;
          const requestHeaders = AxiosHeaders.from(_config.headers).normalize();
          let {
            responseType,
            onUploadProgress,
            onDownloadProgress
          } = _config;
          let onCanceled;
          let uploadThrottled, downloadThrottled;
          let flushUpload, flushDownload;

          function done() {
            flushUpload && flushUpload(); // flush events

            flushDownload && flushDownload(); // flush events

            _config.cancelToken && _config.cancelToken.unsubscribe(onCanceled);
            _config.signal && _config.signal.removeEventListener('abort', onCanceled);
          }

          let request = new XMLHttpRequest();
          request.open(_config.method.toUpperCase(), _config.url, true); // Set the request timeout in MS

          request.timeout = _config.timeout;

          function onloadend() {
            if (!request) {
              return;
            } // Prepare the response


            const responseHeaders = AxiosHeaders.from('getAllResponseHeaders' in request && request.getAllResponseHeaders());
            const responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
            const response = {
              data: responseData,
              status: request.status,
              statusText: request.statusText,
              headers: responseHeaders,
              config,
              request
            };
            settle(function _resolve(value) {
              resolve(value);
              done();
            }, function _reject(err) {
              reject(err);
              done();
            }, response); // Clean up request

            request = null;
          }

          if ('onloadend' in request) {
            // Use onloadend if available
            request.onloadend = onloadend;
          } else {
            // Listen for ready state to emulate onloadend
            request.onreadystatechange = function handleLoad() {
              if (!request || request.readyState !== 4) {
                return;
              } // The request errored out and we didn't get a response, this will be
              // handled by onerror instead
              // With one exception: request that using file: protocol, most browsers
              // will return status as 0 even though it's a successful request


              if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
                return;
              } // readystate handler is calling before onerror or ontimeout handlers,
              // so we should call onloadend on the next 'tick'


              setTimeout(onloadend);
            };
          } // Handle browser request cancellation (as opposed to a manual cancellation)


          request.onabort = function handleAbort() {
            if (!request) {
              return;
            }

            reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request)); // Clean up request

            request = null;
          }; // Handle low level network errors


          request.onerror = function handleError() {
            // Real errors are hidden from us by the browser
            // onerror should only fire if it's a network error
            reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request)); // Clean up request

            request = null;
          }; // Handle timeout


          request.ontimeout = function handleTimeout() {
            let timeoutErrorMessage = _config.timeout ? 'timeout of ' + _config.timeout + 'ms exceeded' : 'timeout exceeded';
            const transitional = _config.transitional || transitionalDefaults;

            if (_config.timeoutErrorMessage) {
              timeoutErrorMessage = _config.timeoutErrorMessage;
            }

            reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request)); // Clean up request

            request = null;
          }; // Remove Content-Type if data is undefined


          requestData === undefined && requestHeaders.setContentType(null); // Add headers to the request

          if ('setRequestHeader' in request) {
            utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
              request.setRequestHeader(key, val);
            });
          } // Add withCredentials to request if needed


          if (!utils.isUndefined(_config.withCredentials)) {
            request.withCredentials = !!_config.withCredentials;
          } // Add responseType to request if needed


          if (responseType && responseType !== 'json') {
            request.responseType = _config.responseType;
          } // Handle progress if needed


          if (onDownloadProgress) {
            [downloadThrottled, flushDownload] = progressEventReducer(onDownloadProgress, true);
            request.addEventListener('progress', downloadThrottled);
          } // Not all browsers support upload events


          if (onUploadProgress && request.upload) {
            [uploadThrottled, flushUpload] = progressEventReducer(onUploadProgress);
            request.upload.addEventListener('progress', uploadThrottled);
            request.upload.addEventListener('loadend', flushUpload);
          }

          if (_config.cancelToken || _config.signal) {
            // Handle cancellation
            // eslint-disable-next-line func-names
            onCanceled = cancel => {
              if (!request) {
                return;
              }

              reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
              request.abort();
              request = null;
            };

            _config.cancelToken && _config.cancelToken.subscribe(onCanceled);

            if (_config.signal) {
              _config.signal.aborted ? onCanceled() : _config.signal.addEventListener('abort', onCanceled);
            }
          }

          const protocol = parseProtocol(_config.url);

          if (protocol && platform.protocols.indexOf(protocol) === -1) {
            reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
            return;
          } // Send the request


          request.send(requestData || null);
        });
      });
    }
  };
});
//# sourceMappingURL=f56602a5352d0e5c1f0c32222568399abd68cda9.js.map