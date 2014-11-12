;(function() {

	"use strict";

	define(['src/lib/q', 'src/engine/helpers/http'], function(q, Http) {

		var CONFIG_PATH = "./src/config.json";

		var ConfigLoader = function() {
			
		};

		ConfigLoader.prototype.load = function() {
			var defer = q.defer();
			var http = new Http();
			http.get(CONFIG_PATH).then(function(response) {
				defer.resolve(JSON.parse(response));
			}, defer.reject);

			return defer.promise;
		};

		return ConfigLoader;
	});
})();