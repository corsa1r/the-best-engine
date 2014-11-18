;(function () {
	require.config({
		baseUrl : './'
	});

	define([
		'src/engine/Scene',
		'src/engine/input/InputRouter',
		'src/engine/GameObject',
		'src/engine/physics/Vector'
		], function(Scene, InputRouter, GameObject) {

		var canvas = document.getElementById('canvas');
		var scene = new Scene(canvas, 500, 500);
		var inputRouter = new InputRouter(scene);

		var Cube = function () {
			Cube.super.constructor.call(this);

			this.position.x = 100;
			this.position.y = 100;

			this.size.x = 100;
			this.size.y = 100;
		};

		Cube.extend(GameObject);

		Cube.prototype.draw = function (screen, camera) {
			screen.context.beginPath();
			screen.context.fillStyle = 'black';
			screen.context.fillRect(this.position.x - camera.x, this.position.y - camera.y, this.size.x, this.size.y);
		};

		scene.gameLoop.start();

		scene.objects.add(new Cube(), 'cube');

		var inDragState = false;

		inputRouter.editor.touch.on('output', function(event) {
			if(event.type === 'tap') {
				
			}

			if(event.type === 'panstart') {
				var found = scene.physics.world.findObjects(event.position);
				
				if(found.len()) {
					inDragState = true;
					gap = event.position.diffXY(scene.objects.get('cube').position);
				}
			}

			if(event.type === 'panmove' && inDragState) {
				var cube = scene.objects.get('cube');
				cube.position = event.position.append(gap);
			}

			if(event.type === 'panend') {
				inDragState = false;
			}
		});
	});

})();