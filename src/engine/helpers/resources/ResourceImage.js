;
(function() {

    "use strict";

    define(['src/engine/helpers/resources/ResourceFile', 'src/lib/q'], function(ResourceFile, q) {

        var ResourceImage = function(path) {
            ResourceFile.super.constructor.call(this);
            this.resource = new Image();
            this.path = path || null;
        };
        
        ResourceImage.extend(ResourceFile);

        ResourceImage.prototype.load = function() {
            var defer = q.defer();
            this.fire('load.start');
            
            this.resource.onload = (function() {
                defer.resolve();
            }).bind(this);

            this.resource.src = this.getPath();
            
            return defer.promise;
        };

        return ResourceImage;
    });

})();