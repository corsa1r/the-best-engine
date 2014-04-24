(function() {
    define(['engine/EventSet', 'engine/Camera'], function(EventSet, Camera) {

        function GameObject() {
            GameObject.super.constructor.call(this);
            
            this.camera = { x: 0, y: 0 };
        }
        
        GameObject.extend(EventSet);
        

        GameObject.prototype.repr = function(repr) {
            for (var x in repr) {
                this[x] = repr[x];
            }

            return this;
        };
        
        GameObject.prototype.affectWithCamera = function (camera) {
            if(camera instanceof Camera) {
                this.camera = camera;
            }
        };

        GameObject.prototype.getRepr = function() {
            if (this.networkClassName) {
                var obj = {};

                obj.networkClassName = this.networkClassName;

                for (var x in this.networkDependenciesAsset) {
                    if (this.networkDependenciesAsset.hasOwnProperty(x)) {
                        obj[this.networkDependenciesAsset[x]] = this[this.networkDependenciesAsset[x]];
                    }
                }

                return obj;
            }

            return null;
        };

        GameObject.prototype.setNetworkDependenciesAsset = function(asset) {
            this.networkDependenciesAsset = asset;
            return this;
        };

        GameObject.prototype.networkDependenciesAsset = [];

        return GameObject;
    });
})();