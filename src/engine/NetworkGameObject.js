;
(function() {

    "use strict";

    define(['src/engine/GameObject'], function(GameObject) {

        var NetworkGameObject = function() {
            NetworkGameObject.super.constructor.call(this);
        };

        NetworkGameObject.extend(GameObject);


        NetworkGameObject.prototype.repr = function(repr) {
            for (var x in repr) {
                this[x] = repr[x];
            }

            return this;
        };

        NetworkGameObject.prototype.getRepr = function() {
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

        NetworkGameObject.prototype.setNetworkDependenciesAsset = function(asset) {
            this.networkDependenciesAsset = asset;
            return this;
        };

        NetworkGameObject.prototype.networkDependenciesAsset = [];

        return NetworkGameObject;
    });
})();