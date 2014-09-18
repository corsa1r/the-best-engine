;
(function() {

    "use strict";

    define(['src/lib/q'], function(q) {

        var http = function() {
            this.request = null;
        };

        http.prototype.task = function() {

            if (this.request === null) {
                this.request = new XMLHttpRequest();
            }

            return this.request;
        };

        http.prototype.get = function(path) {
            return this.create(this.task(), 'GET', path, new String());
        };

        http.prototype.post = function(path, params) {
            return this.create(this.task(), 'POST', path, this.parseParams(params));
        };

        http.prototype.parseParams = function(objectParams) {
            var result = [];

            for (var property in objectParams) {
                if (objectParams.hasOwnProperty(property)) {
                    result.push(property + "=" + objectParams[property]);
                }
            }

            return result.join("&");
        };

        http.prototype.create = function(task, method, path, params) {
            var defer = q.defer();

            task.open(method, path, true);
            task.send(params);

            task.onreadystatechange = (function() {
                switch (task.readyState) {
                    case 0 :
                    case 1 :
                    case 2 :
                    case 3 :
                        defer.notify(task.readyState);
                        break;
                    case 4 :
                        switch (task.status) {
                            case 200 :
                                defer.resolve(task.responseText);
                            default :
                                defer.reject();
                        }
                        break;
                    default :
                        defer.reject();
                }
            }).bind(this);

            return defer.promise;
        };

        return http;
    });
})();