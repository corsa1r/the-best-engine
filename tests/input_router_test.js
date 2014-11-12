require.config({
	baseUrl: "./"
});

define(['src/engine/input/InputRouter', 'src/engine/Scene'], function(InputRouter, Scene) {

	var scene = new Scene(document.getElementById('canvas'), 500, 500);
	var inputRouter = new InputRouter(scene);
	
	window.inputRouter = inputRouter;

	inputRouter.editor.keyboard.on('output', function(event) {
		console.log('EDITOR', event);
	});

	inputRouter.client.keyboard.on('output', function(event) {
		console.info('CLIENT', event);
	});
});