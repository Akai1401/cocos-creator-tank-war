System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var platform, utils, AxiosError, composeSignals, trackStream, AxiosHeaders, progressEventReducer, progressEventDecorator, asyncDecorator, resolveConfig, settle, isFetchSupported, isReadableStreamSupported, encodeText, test, supportsRequestStream, DEFAULT_CHUNK_SIZE, supportsResponseStream, resolvers, getBodyLength, resolveBodyLength;
  return {
    setters: [function (_unresolved_) {
      platform = _unresolved_.default;
    }, function (_unresolved_2) {
      utils = _unresolved_2.default;
    }, function (_unresolved_3) {
      AxiosError = _unresolved_3.default;
    }, function (_unresolved_4) {
      composeSignals = _unresolved_4.default;
    }, function (_unresolved_5) {
      trackStream = _unresolved_5.trackStream;
    }, function (_unresolved_6) {
      AxiosHeaders = _unresolved_6.default;
    }, function (_unresolved_7) {
      progressEventReducer = _unresolved_7.progressEventReducer;
      progressEventDecorator = _unresolved_7.progressEventDecorator;
      asyncDecorator = _unresolved_7.asyncDecorator;
    }, function (_unresolved_8) {
      resolveConfig = _unresolved_8.default;
    }, function (_unresolved_9) {
      settle = _unresolved_9.default;
    }],
    execute: function () {
      isFetchSupported = typeof fetch === 'function' && typeof Request === 'function' && typeof Response === 'function';
      isReadableStreamSupported = isFetchSupported && typeof ReadableStream === 'function'; // used only inside the fetch adapter

      encodeText = isFetchSupported && (typeof TextEncoder === 'function' ? (encoder => str => encoder.encode(str))(new TextEncoder()) : async str => new Uint8Array(await new Response(str).arrayBuffer()));

      test = (fn, ...args) => {
        try {
          return !!fn(...args);
        } catch (e) {
          return false;
        }
      };

      supportsRequestStream = isReadableStreamSupported && test(() => {
        let duplexAccessed = false;
        const hasContentType = new Request(platform.origin, {
          body: new ReadableStream(),
          method: 'POST',

          get duplex() {
            duplexAccessed = true;
            return 'half';
          }

        }).headers.has('Content-Type');
        return duplexAccessed && !hasContentType;
      });
      DEFAULT_CHUNK_SIZE = 64 * 1024;
      supportsResponseStream = isReadableStreamSupported && test(() => utils.isReadableStream(new Response('').body));
      resolvers = {
        stream: supportsResponseStream && (res => res.body)
      };
      isFetchSupported && (res => {
        ['text', 'arrayBuffer', 'blob', 'formData', 'stream'].forEach(type => {
          !resolvers[type] && (resolvers[type] = utils.isFunction(res[type]) ? res => res[type]() : (_, config) => {
            throw new AxiosError(`Response type '${type}' is not supported`, AxiosError.ERR_NOT_SUPPORT, config);
          });
        });
      })(new Response());

      getBodyLength = async body => {
        if (body == null) {
          return 0;
        }

        if (utils.isBlob(body)) {
          return body.size;
        }

        if (utils.isSpecCompliantForm(body)) {
          const _request = new Request(platform.origin, {
            method: 'POST',
            body
          });

          return (await _request.arrayBuffer()).byteLength;
        }

        if (utils.isArrayBufferView(body) || utils.isArrayBuffer(body)) {
          return body.byteLength;
        }

        if (utils.isURLSearchParams(body)) {
          body = body + '';
        }

        if (utils.isString(body)) {
          return (await encodeText(body)).byteLength;
        }
      };

      resolveBodyLength = async (headers, body) => {
        const length = utils.toFiniteNumber(headers.getContentLength());
        return length == null ? getBodyLength(body) : length;
      };

      _export("default", isFetchSupported && (async config => {
        let {
          url,
          method,
          data,
          signal,
          cancelToken,
          timeout,
          onDownloadProgress,
          onUploadProgress,
          responseType,
          headers,
          withCredentials = 'same-origin',
          fetchOptions
        } = resolveConfig(config);
        responseType = responseType ? (responseType + '').toLowerCase() : 'text';
        let composedSignal = composeSignals([signal, cancelToken && cancelToken.toAbortSignal()], timeout);
        let request;

        const unsubscribe = composedSignal && composedSignal.unsubscribe && (() => {
          composedSignal.unsubscribe();
        });

        let requestContentLength;

        try {
          if (onUploadProgress && supportsRequestStream && method !== 'get' && method !== 'head' && (requestContentLength = await resolveBodyLength(headers, data)) !== 0) {
            let _request = new Request(url, {
              method: 'POST',
              body: data,
              duplex: "half"
            });

            let contentTypeHeader;

            if (utils.isFormData(data) && (contentTypeHeader = _request.headers.get('content-type'))) {
              headers.setContentType(contentTypeHeader);
            }

            if (_request.body) {
              const [onProgress, flush] = progressEventDecorator(requestContentLength, progressEventReducer(asyncDecorator(onUploadProgress)));
              data = trackStream(_request.body, DEFAULT_CHUNK_SIZE, onProgress, flush);
            }
          }

          if (!utils.isString(withCredentials)) {
            withCredentials = withCredentials ? 'include' : 'omit';
          } // Cloudflare Workers throws when credentials are defined
          // see https://github.com/cloudflare/workerd/issues/902


          const isCredentialsSupported = ("credentials" in Request.prototype);
          request = new Request(url, { ...fetchOptions,
            signal: composedSignal,
            method: method.toUpperCase(),
            headers: headers.normalize().toJSON(),
            body: data,
            duplex: "half",
            credentials: isCredentialsSupported ? withCredentials : undefined
          });
          let response = await fetch(request);
          const isStreamResponse = supportsResponseStream && (responseType === 'stream' || responseType === 'response');

          if (supportsResponseStream && (onDownloadProgress || isStreamResponse && unsubscribe)) {
            const options = {};
            ['status', 'statusText', 'headers'].forEach(prop => {
              options[prop] = response[prop];
            });
            const responseContentLength = utils.toFiniteNumber(response.headers.get('content-length'));
            const [onProgress, flush] = onDownloadProgress && progressEventDecorator(responseContentLength, progressEventReducer(asyncDecorator(onDownloadProgress), true)) || [];
            response = new Response(trackStream(response.body, DEFAULT_CHUNK_SIZE, onProgress, () => {
              flush && flush();
              unsubscribe && unsubscribe();
            }), options);
          }

          responseType = responseType || 'text';
          let responseData = await resolvers[utils.findKey(resolvers, responseType) || 'text'](response, config);
          !isStreamResponse && unsubscribe && unsubscribe();
          return await new Promise((resolve, reject) => {
            settle(resolve, reject, {
              data: responseData,
              headers: AxiosHeaders.from(response.headers),
              status: response.status,
              statusText: response.statusText,
              config,
              request
            });
          });
        } catch (err) {
          unsubscribe && unsubscribe();

          if (err && err.name === 'TypeError' && /fetch/i.test(err.message)) {
            throw Object.assign(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request), {
              cause: err.cause || err
            });
          }

          throw AxiosError.from(err, err && err.code, config, request);
        }
      }));
    }
  };
});
//# sourceMappingURL=4f705eb9e214ce16513805f731cbe127fc5685a5.js.map