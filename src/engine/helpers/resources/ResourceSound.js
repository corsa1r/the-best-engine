;
(function() {

    "use strict";

    define(['src/engine/helpers/resources/ResourceFile', 'src/lib/q'], function(ResourceFile, q) {

        var ResourceSound = function(path) {
            ResourceSound.super.constructor.call(this);

            this.resource = document.createElement('audio');
            this.path = path || null;
        };

        ResourceSound.extend(ResourceFile);

        ResourceSound.prototype.load = function() {
            var defer = q.defer();
            this.fire('load.start');
            
            this.resource.oncanplay = (function () {
                defer.resolve();
            }).bind(this);
            
            this.resource.src = this.path;
            
            return defer.promise;
        };

        return ResourceSound;
    });

})();