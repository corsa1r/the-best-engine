;
(function() {

    "use strict";

    define([
        'src/engine/Container',
        'src/engine/EventSet'
    ], function(Container, EventSet) {

        var Resources = function() {
            Resources.super.constructor.call(this);

            this.folders = new Container();

            this.$loadedFolderFiles = 0;
        };

        Resources.extend(EventSet);

        Resources.prototype.load = function() {
            var $max = 0;

            this.folders.each((function(resourceFolder) {
                $max += resourceFolder.files.items.length;
            }).bind(this));
            
            this.fire('load.start', $max);
            
            if($max < 1) {
                this.fire('load.end', 0);
            }

            this.folders.each((function(resourceFolder) {
                resourceFolder.on('load.one', (function(loadedResource) {

                    ++this.$loadedFolderFiles;

                    this.fire('load.one', loadedResource, this.$loadedFolderFiles, this.folders.items.length, 100 * this.$loadedFolderFiles / $max);

                    if (this.$loadedFolderFiles === $max) {
                        this.fire('load.end', $max);
                    }
                }).bind(this));

                resourceFolder.load();
            }).bind(this));
        };

        return Resources;
    });

})();