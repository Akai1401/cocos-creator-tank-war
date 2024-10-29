System.register(["__unresolved_0", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var speedometer, throttle, utils, progressEventReducer, progressEventDecorator, asyncDecorator;
  return {
    setters: [function (_unresolved_) {
      speedometer = _unresolved_.default;
    }, function (_unresolved_2) {
      throttle = _unresolved_2.default;
    }, function (_unresolved_3) {
      utils = _unresolved_3.default;
    }],
    execute: function () {
      _export("progressEventReducer", progressEventReducer = function progressEventReducer(listener, isDownloadStream, freq) {
        if (freq === void 0) {
          freq = 3;
        }

        var bytesNotified = 0;

        var _speedometer = speedometer(50, 250);

        return throttle(e => {
          var loaded = e.loaded;
          var total = e.lengthComputable ? e.total : undefined;
          var progressBytes = loaded - bytesNotified;

          var rate = _speedometer(progressBytes);

          var inRange = loaded <= total;
          bytesNotified = loaded;
          var data = {
            loaded,
            total,
            progress: total ? loaded / total : undefined,
            bytes: progressBytes,
            rate: rate ? rate : undefined,
            estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
            event: e,
            lengthComputable: total != null,
            [isDownloadStream ? 'download' : 'upload']: true
          };
          listener(data);
        }, freq);
      });

      _export("progressEventDecorator", progressEventDecorator = (total, throttled) => {
        var lengthComputable = total != null;
        return [loaded => throttled[0]({
          lengthComputable,
          total,
          loaded
        }), throttled[1]];
      });

      _export("asyncDecorator", asyncDecorator = fn => function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return utils.asap(() => fn(...args));
      });
    }
  };
});
//# sourceMappingURL=87bf85af35c54020fad995050c9b289ac070e499.js.map