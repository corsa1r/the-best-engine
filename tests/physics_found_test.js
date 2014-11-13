require.config({
	baseUrl: "./"
});

define([
	'src/engine/Scene',
	'src/engine/input/InputRouter',
	'src/engine/GameObject',
	'src/engine/physics/Vector',
	'src/editor/helpers/MouseSelection',
	'src/editor/helpers/CameraController',
	'src/editor/Editor'
	], function(Scene, InputRouter, GameObject, Vector, MouseSelection, CameraController, Editor) {

	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	var Cube = function() {
		Cube.super.constructor.call(this);

		this.position.x = getRandomInt(0, 400);
		this.position.y = getRandomInt(0, 400);
		this.size.x = getRandomInt(40, 100);
		this.size.y = getRandomInt(40, 100);

		this.c = '#'+Math.floor(Math.random()*16777215).toString(16);
	};

	Cube.extend(GameObject);

	Cube.prototype.draw = function(screen, camera) {
		screen.context.beginPath();
		screen.context.fillStyle = this.c;
		screen.context.fillRect(this.position.x - camera.x, this.position.y - camera.y, this.size.x, this.size.y);
	};

	var canvas = document.getElementById('canvas');
	var scene = new Scene(canvas, 500, 500);
	var inputRouter = new InputRouter(scene);

	scene.objects.addSort(new Cube());
	scene.objects.addSort(new Cube());
	scene.objects.addSort(new Cube());
	scene.objects.addSort(new Cube());
	scene.objects.addSort(new Cube());

	scene.gameLoop.start();

	var editor = new Editor(scene, inputRouter);

	/*

	var selection = new MouseSelection(scene, inputRouter);
	new CameraController(scene, inputRouter)

	selection.on('selected', function(selectedObjects) {
		
		console.warn('--------------------------------------------------');

		selectedObjects.each(function(object) {
			console.info(object);
		});
	});

	*/
});