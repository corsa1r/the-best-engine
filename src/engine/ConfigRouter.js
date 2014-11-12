;(function() {

	"use strict";

	define(['src/lib/q', 'src/engine/helpers/http'], function(q, http) {

		var CONFIG_PATH = "./src/config.json";

		var ConfigLoader = function() {
			
		};

		ConfigLoader.prototype.load = function() {
			var defer = q.defer();

			http.get(CONFIG_PATH).then(function(response) {
				defer.resolve(JSON.parse(response));
			}, defer.reject);

			return defer.primise;
		};

		return ConfigLoader;
	});
})();