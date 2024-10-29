'use strict';

System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "proxy-from-env", "http", "https", "util", "follow-redirects", "zlib", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8", "__unresolved_9", "stream", "__unresolved_10", "__unresolved_11", "events", "__unresolved_12", "__unresolved_13", "__unresolved_14", "__unresolved_15", "__unresolved_16"], function (_export, _context) {
  "use strict";

  var utils, settle, buildFullPath, buildURL, getProxyForUrl, http, https, util, followRedirects, zlib, VERSION, transitionalDefaults, AxiosError, CanceledError, platform, fromDataURI, stream, AxiosHeaders, AxiosTransformStream, EventEmitter, formDataToStream, readBlob, ZlibHeaderTransformStream, callbackify, progressEventReducer, progressEventDecorator, asyncDecorator, zlibOptions, brotliOptions, isBrotliSupported, httpFollow, httpsFollow, isHttps, supportedProtocols, flushOnFinish, isHttpAdapterSupported, wrapAsync, resolveFamily, buildAddressEntry, __setProxy;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  /**
   * If the proxy or config beforeRedirects functions are defined, call them with the options
   * object.
   *
   * @param {Object<string, any>} options - The options object that was passed to the request.
   *
   * @returns {Object<string, any>}
   */
  function dispatchBeforeRedirect(options, responseDetails) {
    if (options.beforeRedirects.proxy) {
      options.beforeRedirects.proxy(options);
    }

    if (options.beforeRedirects.config) {
      options.beforeRedirects.config(options, responseDetails);
    }
  }
  /**
   * If the proxy or config afterRedirects functions are defined, call them with the options
   *
   * @param {http.ClientRequestArgs} options
   * @param {AxiosProxyConfig} configProxy configuration from Axios options object
   * @param {string} location
   *
   * @returns {http.ClientRequestArgs}
   */


  function setProxy(options, configProxy, location) {
    var proxy = configProxy;

    if (!proxy && proxy !== false) {
      var proxyUrl = getProxyForUrl(location);

      if (proxyUrl) {
        proxy = new URL(proxyUrl);
      }
    }

    if (proxy) {
      // Basic proxy authorization
      if (proxy.username) {
        proxy.auth = (proxy.username || '') + ':' + (proxy.password || '');
      }

      if (proxy.auth) {
        // Support proxy auth object form
        if (proxy.auth.username || proxy.auth.password) {
          proxy.auth = (proxy.auth.username || '') + ':' + (proxy.auth.password || '');
        }

        var base64 = Buffer.from(proxy.auth, 'utf8').toString('base64');
        options.headers['Proxy-Authorization'] = 'Basic ' + base64;
      }

      options.headers.host = options.hostname + (options.port ? ':' + options.port : '');
      var proxyHost = proxy.hostname || proxy.host;
      options.hostname = proxyHost; // Replace 'host' since options is not a URL object

      options.host = proxyHost;
      options.port = proxy.port;
      options.path = location;

      if (proxy.protocol) {
        options.protocol = proxy.protocol.includes(':') ? proxy.protocol : proxy.protocol + ":";
      }
    }

    options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
      // Configure proxy for redirected request, passing the original config proxy to apply
      // the exact same logic as if the redirected request was performed by axios directly.
      setProxy(redirectOptions, configProxy, redirectOptions.href);
    };
  }

  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      settle = _unresolved_2.default;
    }, function (_unresolved_3) {
      buildFullPath = _unresolved_3.default;
    }, function (_unresolved_4) {
      buildURL = _unresolved_4.default;
    }, function (_proxyFromEnv) {
      getProxyForUrl = _proxyFromEnv.getProxyForUrl;
    }, function (_http) {
      http = _http.default;
    }, function (_https) {
      https = _https.default;
    }, function (_util) {
      util = _util.default;
    }, function (_followRedirects) {
      followRedirects = _followRedirects.default;
    }, function (_zlib) {
      zlib = _zlib.default;
    }, function (_unresolved_5) {
      VERSION = _unresolved_5.VERSION;
    }, function (_unresolved_6) {
      transitionalDefaults = _unresolved_6.default;
    }, function (_unresolved_7) {
      AxiosError = _unresolved_7.default;
    }, function (_unresolved_8) {
      CanceledError = _unresolved_8.default;
    }, function (_unresolved_9) {
      platform = _unresolved_9.default;
    }, function (_unresolved_10) {
      fromDataURI = _unresolved_10.default;
    }, function (_stream) {
      stream = _stream.default;
    }, function (_unresolved_11) {
      AxiosHeaders = _unresolved_11.default;
    }, function (_unresolved_12) {
      AxiosTransformStream = _unresolved_12.default;
    }, function (_events) {
      EventEmitter = _events.EventEmitter;
    }, function (_unresolved_13) {
      formDataToStream = _unresolved_13.default;
    }, function (_unresolved_14) {
      readBlob = _unresolved_14.default;
    }, function (_unresolved_15) {
      ZlibHeaderTransformStream = _unresolved_15.default;
    }, function (_unresolved_16) {
      callbackify = _unresolved_16.default;
    }, function (_unresolved_17) {
      progressEventReducer = _unresolved_17.progressEventReducer;
      progressEventDecorator = _unresolved_17.progressEventDecorator;
      asyncDecorator = _unresolved_17.asyncDecorator;
    }],
    execute: function () {
      zlibOptions = {
        flush: zlib.constants.Z_SYNC_FLUSH,
        finishFlush: zlib.constants.Z_SYNC_FLUSH
      };
      brotliOptions = {
        flush: zlib.constants.BROTLI_OPERATION_FLUSH,
        finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH
      };
      isBrotliSupported = utils.isFunction(zlib.createBrotliDecompress);
      ({
        http: httpFollow,
        https: httpsFollow
      } = followRedirects);
      isHttps = /https:?/;
      supportedProtocols = platform.protocols.map(protocol => {
        return protocol + ':';
      });

      flushOnFinish = (stream, _ref) => {
        var [throttled, flush] = _ref;
        stream.on('end', flush).on('error', flush);
        return throttled;
      };

      isHttpAdapterSupported = typeof process !== 'undefined' && utils.kindOf(process) === 'process'; // temporary hotfix

      wrapAsync = asyncExecutor => {
        return new Promise((resolve, reject) => {
          var onDone;
          var isDone;

          var done = (value, isRejected) => {
            if (isDone) return;
            isDone = true;
            onDone && onDone(value, isRejected);
          };

          var _resolve = value => {
            done(value);
            resolve(value);
          };

          var _reject = reason => {
            done(reason, true);
            reject(reason);
          };

          asyncExecutor(_resolve, _reject, onDoneHandler => onDone = onDoneHandler).catch(_reject);
        });
      };

      resolveFamily = _ref2 => {
        var {
          address,
          family
        } = _ref2;

        if (!utils.isString(address)) {
          throw TypeError('address must be a string');
        }

        return {
          address,
          family: family || (address.indexOf('.') < 0 ? 6 : 4)
        };
      };

      buildAddressEntry = (address, family) => resolveFamily(utils.isObject(address) ? address : {
        address,
        family
      });
      /*eslint consistent-return:0*/


      _export("default", isHttpAdapterSupported && function httpAdapter(config) {
        return wrapAsync( /*#__PURE__*/function () {
          var _dispatchHttpRequest = _asyncToGenerator(function* (resolve, reject, onDone) {
            var {
              data,
              lookup,
              family
            } = config;
            var {
              responseType,
              responseEncoding
            } = config;
            var method = config.method.toUpperCase();
            var isDone;
            var rejected = false;
            var req;

            if (lookup) {
              var _lookup = callbackify(lookup, value => utils.isArray(value) ? value : [value]); // hotfix to support opt.all option which is required for node 20.x


              lookup = (hostname, opt, cb) => {
                _lookup(hostname, opt, (err, arg0, arg1) => {
                  if (err) {
                    return cb(err);
                  }

                  var addresses = utils.isArray(arg0) ? arg0.map(addr => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];
                  opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
                });
              };
            } // temporary internal emitter until the AxiosRequest class will be implemented


            var emitter = new EventEmitter();

            var onFinished = () => {
              if (config.cancelToken) {
                config.cancelToken.unsubscribe(abort);
              }

              if (config.signal) {
                config.signal.removeEventListener('abort', abort);
              }

              emitter.removeAllListeners();
            };

            onDone((value, isRejected) => {
              isDone = true;

              if (isRejected) {
                rejected = true;
                onFinished();
              }
            });

            function abort(reason) {
              emitter.emit('abort', !reason || reason.type ? new CanceledError(null, config, req) : reason);
            }

            emitter.once('abort', reject);

            if (config.cancelToken || config.signal) {
              config.cancelToken && config.cancelToken.subscribe(abort);

              if (config.signal) {
                config.signal.aborted ? abort() : config.signal.addEventListener('abort', abort);
              }
            } // Parse url


            var fullPath = buildFullPath(config.baseURL, config.url);
            var parsed = new URL(fullPath, platform.hasBrowserEnv ? platform.origin : undefined);
            var protocol = parsed.protocol || supportedProtocols[0];

            if (protocol === 'data:') {
              var convertedData;

              if (method !== 'GET') {
                return settle(resolve, reject, {
                  status: 405,
                  statusText: 'method not allowed',
                  headers: {},
                  config
                });
              }

              try {
                convertedData = fromDataURI(config.url, responseType === 'blob', {
                  Blob: config.env && config.env.Blob
                });
              } catch (err) {
                throw AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config);
              }

              if (responseType === 'text') {
                convertedData = convertedData.toString(responseEncoding);

                if (!responseEncoding || responseEncoding === 'utf8') {
                  convertedData = utils.stripBOM(convertedData);
                }
              } else if (responseType === 'stream') {
                convertedData = stream.Readable.from(convertedData);
              }

              return settle(resolve, reject, {
                data: convertedData,
                status: 200,
                statusText: 'OK',
                headers: new AxiosHeaders(),
                config
              });
            }

            if (supportedProtocols.indexOf(protocol) === -1) {
              return reject(new AxiosError('Unsupported protocol ' + protocol, AxiosError.ERR_BAD_REQUEST, config));
            }

            var headers = AxiosHeaders.from(config.headers).normalize(); // Set User-Agent (required by some servers)
            // See https://github.com/axios/axios/issues/69
            // User-Agent is specified; handle case where no UA header is desired
            // Only set header if it hasn't been set in config

            headers.set('User-Agent', 'axios/' + VERSION, false);
            var {
              onUploadProgress,
              onDownloadProgress
            } = config;
            var maxRate = config.maxRate;
            var maxUploadRate = undefined;
            var maxDownloadRate = undefined; // support for spec compliant FormData objects

            if (utils.isSpecCompliantForm(data)) {
              var userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);
              data = formDataToStream(data, formHeaders => {
                headers.set(formHeaders);
              }, {
                tag: "axios-" + VERSION + "-boundary",
                boundary: userBoundary && userBoundary[1] || undefined
              }); // support for https://www.npmjs.com/package/form-data api
            } else if (utils.isFormData(data) && utils.isFunction(data.getHeaders)) {
              headers.set(data.getHeaders());

              if (!headers.hasContentLength()) {
                try {
                  var knownLength = yield util.promisify(data.getLength).call(data);
                  Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
                  /*eslint no-empty:0*/
                } catch (e) {}
              }
            } else if (utils.isBlob(data)) {
              data.size && headers.setContentType(data.type || 'application/octet-stream');
              headers.setContentLength(data.size || 0);
              data = stream.Readable.from(readBlob(data));
            } else if (data && !utils.isStream(data)) {
              if (Buffer.isBuffer(data)) {// Nothing to do...
              } else if (utils.isArrayBuffer(data)) {
                data = Buffer.from(new Uint8Array(data));
              } else if (utils.isString(data)) {
                data = Buffer.from(data, 'utf-8');
              } else {
                return reject(new AxiosError('Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream', AxiosError.ERR_BAD_REQUEST, config));
              } // Add Content-Length header if data exists


              headers.setContentLength(data.length, false);

              if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
                return reject(new AxiosError('Request body larger than maxBodyLength limit', AxiosError.ERR_BAD_REQUEST, config));
              }
            }

            var contentLength = utils.toFiniteNumber(headers.getContentLength());

            if (utils.isArray(maxRate)) {
              maxUploadRate = maxRate[0];
              maxDownloadRate = maxRate[1];
            } else {
              maxUploadRate = maxDownloadRate = maxRate;
            }

            if (data && (onUploadProgress || maxUploadRate)) {
              if (!utils.isStream(data)) {
                data = stream.Readable.from(data, {
                  objectMode: false
                });
              }

              data = stream.pipeline([data, new AxiosTransformStream({
                maxRate: utils.toFiniteNumber(maxUploadRate)
              })], utils.noop);
              onUploadProgress && data.on('progress', flushOnFinish(data, progressEventDecorator(contentLength, progressEventReducer(asyncDecorator(onUploadProgress), false, 3))));
            } // HTTP basic authentication


            var auth = undefined;

            if (config.auth) {
              var username = config.auth.username || '';
              var password = config.auth.password || '';
              auth = username + ':' + password;
            }

            if (!auth && parsed.username) {
              var urlUsername = parsed.username;
              var urlPassword = parsed.password;
              auth = urlUsername + ':' + urlPassword;
            }

            auth && headers.delete('authorization');
            var path;

            try {
              path = buildURL(parsed.pathname + parsed.search, config.params, config.paramsSerializer).replace(/^\?/, '');
            } catch (err) {
              var customErr = new Error(err.message);
              customErr.config = config;
              customErr.url = config.url;
              customErr.exists = true;
              return reject(customErr);
            }

            headers.set('Accept-Encoding', 'gzip, compress, deflate' + (isBrotliSupported ? ', br' : ''), false);
            var options = {
              path,
              method: method,
              headers: headers.toJSON(),
              agents: {
                http: config.httpAgent,
                https: config.httpsAgent
              },
              auth,
              protocol,
              family,
              beforeRedirect: dispatchBeforeRedirect,
              beforeRedirects: {}
            }; // cacheable-lookup integration hotfix

            !utils.isUndefined(lookup) && (options.lookup = lookup);

            if (config.socketPath) {
              options.socketPath = config.socketPath;
            } else {
              options.hostname = parsed.hostname.startsWith("[") ? parsed.hostname.slice(1, -1) : parsed.hostname;
              options.port = parsed.port;
              setProxy(options, config.proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
            }

            var transport;
            var isHttpsRequest = isHttps.test(options.protocol);
            options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

            if (config.transport) {
              transport = config.transport;
            } else if (config.maxRedirects === 0) {
              transport = isHttpsRequest ? https : http;
            } else {
              if (config.maxRedirects) {
                options.maxRedirects = config.maxRedirects;
              }

              if (config.beforeRedirect) {
                options.beforeRedirects.config = config.beforeRedirect;
              }

              transport = isHttpsRequest ? httpsFollow : httpFollow;
            }

            if (config.maxBodyLength > -1) {
              options.maxBodyLength = config.maxBodyLength;
            } else {
              // follow-redirects does not skip comparison, so it should always succeed for axios -1 unlimited
              options.maxBodyLength = Infinity;
            }

            if (config.insecureHTTPParser) {
              options.insecureHTTPParser = config.insecureHTTPParser;
            } // Create the request


            req = transport.request(options, function handleResponse(res) {
              if (req.destroyed) return;
              var streams = [res];
              var responseLength = +res.headers['content-length'];

              if (onDownloadProgress || maxDownloadRate) {
                var transformStream = new AxiosTransformStream({
                  maxRate: utils.toFiniteNumber(maxDownloadRate)
                });
                onDownloadProgress && transformStream.on('progress', flushOnFinish(transformStream, progressEventDecorator(responseLength, progressEventReducer(asyncDecorator(onDownloadProgress), true, 3))));
                streams.push(transformStream);
              } // decompress the response body transparently if required


              var responseStream = res; // return the last request in case of redirects

              var lastRequest = res.req || req; // if decompress disabled we should not decompress

              if (config.decompress !== false && res.headers['content-encoding']) {
                // if no content, but headers still say that it is encoded,
                // remove the header not confuse downstream operations
                if (method === 'HEAD' || res.statusCode === 204) {
                  delete res.headers['content-encoding'];
                }

                switch ((res.headers['content-encoding'] || '').toLowerCase()) {
                  /*eslint default-case:0*/
                  case 'gzip':
                  case 'x-gzip':
                  case 'compress':
                  case 'x-compress':
                    // add the unzipper to the body stream processing pipeline
                    streams.push(zlib.createUnzip(zlibOptions)); // remove the content-encoding in order to not confuse downstream operations

                    delete res.headers['content-encoding'];
                    break;

                  case 'deflate':
                    streams.push(new ZlibHeaderTransformStream()); // add the unzipper to the body stream processing pipeline

                    streams.push(zlib.createUnzip(zlibOptions)); // remove the content-encoding in order to not confuse downstream operations

                    delete res.headers['content-encoding'];
                    break;

                  case 'br':
                    if (isBrotliSupported) {
                      streams.push(zlib.createBrotliDecompress(brotliOptions));
                      delete res.headers['content-encoding'];
                    }

                }
              }

              responseStream = streams.length > 1 ? stream.pipeline(streams, utils.noop) : streams[0];
              var offListeners = stream.finished(responseStream, () => {
                offListeners();
                onFinished();
              });
              var response = {
                status: res.statusCode,
                statusText: res.statusMessage,
                headers: new AxiosHeaders(res.headers),
                config,
                request: lastRequest
              };

              if (responseType === 'stream') {
                response.data = responseStream;
                settle(resolve, reject, response);
              } else {
                var responseBuffer = [];
                var totalResponseBytes = 0;
                responseStream.on('data', function handleStreamData(chunk) {
                  responseBuffer.push(chunk);
                  totalResponseBytes += chunk.length; // make sure the content length is not over the maxContentLength if specified

                  if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
                    // stream.destroy() emit aborted event before calling reject() on Node.js v16
                    rejected = true;
                    responseStream.destroy();
                    reject(new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded', AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
                  }
                });
                responseStream.on('aborted', function handlerStreamAborted() {
                  if (rejected) {
                    return;
                  }

                  var err = new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded', AxiosError.ERR_BAD_RESPONSE, config, lastRequest);
                  responseStream.destroy(err);
                  reject(err);
                });
                responseStream.on('error', function handleStreamError(err) {
                  if (req.destroyed) return;
                  reject(AxiosError.from(err, null, config, lastRequest));
                });
                responseStream.on('end', function handleStreamEnd() {
                  try {
                    var responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);

                    if (responseType !== 'arraybuffer') {
                      responseData = responseData.toString(responseEncoding);

                      if (!responseEncoding || responseEncoding === 'utf8') {
                        responseData = utils.stripBOM(responseData);
                      }
                    }

                    response.data = responseData;
                  } catch (err) {
                    return reject(AxiosError.from(err, null, config, response.request, response));
                  }

                  settle(resolve, reject, response);
                });
              }

              emitter.once('abort', err => {
                if (!responseStream.destroyed) {
                  responseStream.emit('error', err);
                  responseStream.destroy();
                }
              });
            });
            emitter.once('abort', err => {
              reject(err);
              req.destroy(err);
            }); // Handle errors

            req.on('error', function handleRequestError(err) {
              // @todo remove
              // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
              reject(AxiosError.from(err, null, config, req));
            }); // set tcp keep alive to prevent drop connection by peer

            req.on('socket', function handleRequestSocket(socket) {
              // default interval of sending ack packet is 1 minute
              socket.setKeepAlive(true, 1000 * 60);
            }); // Handle request timeout

            if (config.timeout) {
              // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
              var timeout = parseInt(config.timeout, 10);

              if (Number.isNaN(timeout)) {
                reject(new AxiosError('error trying to parse `config.timeout` to int', AxiosError.ERR_BAD_OPTION_VALUE, config, req));
                return;
              } // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
              // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
              // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
              // And then these socket which be hang up will devouring CPU little by little.
              // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.


              req.setTimeout(timeout, function handleRequestTimeout() {
                if (isDone) return;
                var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
                var transitional = config.transitional || transitionalDefaults;

                if (config.timeoutErrorMessage) {
                  timeoutErrorMessage = config.timeoutErrorMessage;
                }

                reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, req));
                abort();
              });
            } // Send the request


            if (utils.isStream(data)) {
              var ended = false;
              var errored = false;
              data.on('end', () => {
                ended = true;
              });
              data.once('error', err => {
                errored = true;
                req.destroy(err);
              });
              data.on('close', () => {
                if (!ended && !errored) {
                  abort(new CanceledError('Request stream has been aborted', config, req));
                }
              });
              data.pipe(req);
            } else {
              req.end(data);
            }
          });

          function dispatchHttpRequest(_x, _x2, _x3) {
            return _dispatchHttpRequest.apply(this, arguments);
          }

          return dispatchHttpRequest;
        }());
      });

      _export("__setProxy", __setProxy = setProxy);
    }
  };
});
//# sourceMappingURL=61d58fa724e5aa994a71c535dc09bd0b021fe617.js.map