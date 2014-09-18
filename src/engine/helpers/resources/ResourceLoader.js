;
(function() {

    "use strict";

    define([
        'src/engine/EventSet',
        'src/engine/Container',
        'src/lib/q',
        'src/engine/helpers/resources/Resources',
        'src/engine/helpers/resources/ResourceFolder',
        'src/engine/helpers/http',
        'src/engine/helpers/resources/ResourceImage',
        'src/engine/helpers/resources/ResourceSound'
    ], function(EventSet, Container, q, Resources, ResourceFolder, http, ResourceImage, ResourceSound) {

        var ResourceLoader = function() {
            ResourceLoader.super.constructor.call(this);

            this.http = new http();

            this.resources = null;
            
            this.$resources = new Resources();
        };

        ResourceLoader.extend(EventSet);

        ResourceLoader.prototype.requestResources = function() {
            this.fire('request');
            
            var defer = q.defer();

            this.http.get('./src/resources.json').then((function(resourcesString) {
                this.resources = JSON.parse(resourcesString);
                defer.resolve();
            }).bind(this), defer.reject, defer.notify);

            return defer.promise;
        };
        
        ResourceLoader.prototype.load = function () {
            var defer = q.defer();
            
            this.requestResources().then((function () {
                
                if(!this.resources) {
                    defer.reject();
                }

                for(var folderName in this.resources.folders) {
                    this.$resources.folders.add(new ResourceFolder(), folderName);

                    for(var i in this.resources.folders[folderName]) {

                        switch (folderName) {
                            case 'images' :
                                this.$resources.folders.get(folderName).files.add(new ResourceImage(this.resources.folders[folderName][i].src), this.resources.folders[folderName][i].name);
                                break;
                            case 'sounds' :
                                this.$resources.folders.get(folderName).files.add(new ResourceSound(this.resources.folders[folderName][i].src), this.resources.folders[folderName][i].name);
                                break;
                        }
                    }
                }

                this.$resources.on('load.start', (function () {
                    this.fire('load.start');
                }).bind(this));

                this.$resources.on('load.one', (function (resourceFile, current, max, percents) {
                    this.fire('load.one', resourceFile, parseFloat(percents.toFixed(2)));
                }).bind(this));

                this.$resources.on('load.end', (function () {
                    defer.resolve(this.$resources);
                }).bind(this));

                this.$resources.load();
            }).bind(this));
            
            return defer.promise;
        };
        
        return ResourceLoader;
    });
})();