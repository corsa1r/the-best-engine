require.config({
	baseUrl: "./"
});

define(['src/engine/helpers/ConfigLoader'], function(ConfigLoader) {

	var cl = new ConfigLoader();

	cl.load();
});