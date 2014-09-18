;
(function() {

    "use strict";

    define([
        'src/engine/Container',
        'src/engine/EventSet'
    ], function(Container, EventSet) {

        var ResourceFolder = function() {
            ResourceFolder.super.constructor.call(this);

            this.files = new Container();

            this.$loadedFiles = 0;
        };

        ResourceFolder.extend(EventSet);

        ResourceFolder.prototype.load = function() {
            this.fire('load.start');
            
            if(this.files.items.length < 1) {
                this.fire('load.end', 0);
            }

            this.files.each((function(resourceFile) {

                resourceFile.load().then((function () {
                    
                    ++this.$loadedFiles;

                    this.fire('load.one', resourceFile, this.$loadedFiles, this.files.items.length, 100 * this.currentLoaded / this.files.items.length);
                    
                    if (this.$loadedFiles === this.files.items.length) {
                        this.fire('load.end', this.files.items.length);
                    }
                }).bind(this));
            }).bind(this));
        };

        return ResourceFolder;
    });

})();