(function() {
    define(['engine/EventSet'], function(EventSet) {

        function GameObject() {
            GameObject.super.constructor.call(this);
        }
        
        GameObject.extend(EventSet);
        

        GameObject.prototype.repr = function(repr) {
            for (var x in repr) {
                this[x] = repr[x];
            }

            return this;
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