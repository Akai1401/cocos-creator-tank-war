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
      _export("progressEventReducer", progressEventReducer = (listener, isDownloadStream, freq = 3) => {
        let bytesNotified = 0;

        const _speedometer = speedometer(50, 250);

        return throttle(e => {
          const loaded = e.loaded;
          const total = e.lengthComputable ? e.total : undefined;
          const progressBytes = loaded - bytesNotified;

          const rate = _speedometer(progressBytes);

          const inRange = loaded <= total;
          bytesNotified = loaded;
          const data = {
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
        const lengthComputable = total != null;
        return [loaded => throttled[0]({
          lengthComputable,
          total,
          loaded
        }), throttled[1]];
      });

      _export("asyncDecorator", asyncDecorator = fn => (...args) => utils.asap(() => fn(...args)));
    }
  };
});
//# sourceMappingURL=87bf85af35c54020fad995050c9b289ac070e499.js.map