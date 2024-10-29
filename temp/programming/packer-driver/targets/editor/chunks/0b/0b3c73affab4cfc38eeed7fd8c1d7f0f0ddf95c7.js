System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var utils, httpAdapter, xhrAdapter, fetchAdapter, AxiosError, knownAdapters, renderReason, isResolvedHandle;
  return {
    setters: [function (_unresolved_) {
      utils = _unresolved_.default;
    }, function (_unresolved_2) {
      httpAdapter = _unresolved_2.default;
    }, function (_unresolved_3) {
      xhrAdapter = _unresolved_3.default;
    }, function (_unresolved_4) {
      fetchAdapter = _unresolved_4.default;
    }, function (_unresolved_5) {
      AxiosError = _unresolved_5.default;
    }],
    execute: function () {
      knownAdapters = {
        http: httpAdapter,
        xhr: xhrAdapter,
        fetch: fetchAdapter
      };
      utils.forEach(knownAdapters, (fn, value) => {
        if (fn) {
          try {
            Object.defineProperty(fn, 'name', {
              value
            });
          } catch (e) {// eslint-disable-next-line no-empty
          }

          Object.defineProperty(fn, 'adapterName', {
            value
          });
        }
      });

      renderReason = reason => `- ${reason}`;

      isResolvedHandle = adapter => utils.isFunction(adapter) || adapter === null || adapter === false;

      _export("default", {
        getAdapter: adapters => {
          adapters = utils.isArray(adapters) ? adapters : [adapters];
          const {
            length
          } = adapters;
          let nameOrAdapter;
          let adapter;
          const rejectedReasons = {};

          for (let i = 0; i < length; i++) {
            nameOrAdapter = adapters[i];
            let id;
            adapter = nameOrAdapter;

            if (!isResolvedHandle(nameOrAdapter)) {
              adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

              if (adapter === undefined) {
                throw new AxiosError(`Unknown adapter '${id}'`);
              }
            }

            if (adapter) {
              break;
            }

            rejectedReasons[id || '#' + i] = adapter;
          }

          if (!adapter) {
            const reasons = Object.entries(rejectedReasons).map(([id, state]) => `adapter ${id} ` + (state === false ? 'is not supported by the environment' : 'is not available in the build'));
            let s = length ? reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0]) : 'as no adapter specified';
            throw new AxiosError(`There is no suitable adapter to dispatch the request ` + s, 'ERR_NOT_SUPPORT');
          }

          return adapter;
        },
        adapters: knownAdapters
      });
    }
  };
});
//# sourceMappingURL=0b3c73affab4cfc38eeed7fd8c1d7f0f0ddf95c7.js.map