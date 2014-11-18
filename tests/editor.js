require.config({
	baseUrl: "./"
});

define([
	'src/engine/Scene',
	'src/editor/SceneEditor',
	'src/engine/GameObject',
	'src/engine/GameObjectComponent',
	'src/engine/components/CenterComponent',
	'src/engine/input/InputRouter',
	'src/engine/physics/Vector',
	'src/engine/Container',
	'src/editor/components/ObjectsFinderComponent',
	'src/editor/components/ObjectDraggableComponent'
	], function(Scene, SceneEditor, GameObject, GameObjectComponent, CenterComponent, InputRouter, Vector, Container, ObjectsFinderComponent, ObjectDraggableComponent) {
		
	var canvas = document.getElementById('canvas');
	var scene = new Scene(canvas, 500, 500);
	var inputRouter = new InputRouter(scene);

	var editor = new SceneEditor(scene, inputRouter);

	editor.components.attach(new ObjectsFinderComponent(), 'ObjectsFinderComponent');
	editor.components.attach(new ObjectDraggableComponent(), 'ObjectDraggableComponent');

	
	var Cube = function(zindex, x, y) {
		Cube.super.constructor.call(this);

		this.position.x = x;
		this.position.y = y;

		this.size.x = 100;
		this.size.y = 100;

		this.d = -1;

		this.zindex = zindex || parseInt(Math.random() * 30);
		this.c = '#'+Math.floor(Math.random()*16777215).toString(16);
	};

	Cube.extend(GameObject);

	Cube.prototype.update = function(delta) {

	};

	Cube.prototype.draw = function(screen, camera) {
		// console.log('draw')
		//camera.position.x += 0.1;
		screen.context.save();
		screen.context.beginPath();
		screen.context.fillStyle = this.c;
		screen.context.fillRect(this.position.x - camera.position.x, this.position.y - camera.position.y, this.size.x, this.size.y);
		screen.context.font = '40pt Calibri';
		screen.context.fillStyle = 'red';
		screen.context.fillText(this.zindex || 0, this.position.x + 5 - camera.position.x, this.position.y + 45 - camera.position.y);
		screen.context.restore();
	};

	/*
	var SelectionBorders = function() {
		SelectionBorders.super.constructor.call(this);

		this.w = 2;
	};

	SelectionBorders.extend(GameObjectComponent);

	SelectionBorders.prototype.draw = function(screen, camera) {
		screen.context.save();
		screen.context.fillStyle = 'green';
		screen.context.fillRect(this.gameObject.position.x - 2 * this.w, this.gameObject.position.y - this.w * 2, this.w, this.gameObject.size.y + this.w * 4);
		screen.context.fillRect(this.gameObject.position.x + this.gameObject.size.x + this.w, this.gameObject.position.y - this.w * 2, this.w, this.gameObject.size.y + this.w * 4);
		screen.context.fillRect(this.gameObject.position.x - 2 * this.w, this.gameObject.position.y - this.w * 2, this.gameObject.size.x + 4 * this.w, this.w);
		screen.context.fillRect(this.gameObject.position.x - 2 * this.w, this.gameObject.position.y + this.gameObject.size.y + this.w, this.gameObject.size.x + 4 * this.w, this.w);
		
		var center = this.gameObject.components.get('center').get();
		screen.context.arc(center.x, center.y, (center.x - this.gameObject.position.x) / 5, Math.PI * 2, false);
		screen.context.fill();
		screen.context.restore();
	};

	var Gravity = function() {
		Gravity.super.constructor.call(this);
	};

	Gravity.extend(GameObjectComponent);

	Gravity.prototype.update = function() {
		this.gameObject.position.y += 1;

		if(this.gameObject.position.y + this.gameObject.size.y >= 400) {
			this.gameObject.position.y = 400 - this.gameObject.size.y;
		}
	};

	var dsa = false;

	function getMaxIndexes (container) {
		var maxs = new Container();
		var first = container.first();

		if(!first) {
			return maxs;
		}

		var maxIndex = first.zindex || 0;

		container.each(function(item, id, name) {
			if(!item.zindex) {
				item.zindex = 0;
			}

			if(item.zindex > maxIndex) {
				maxIndex = item.zindex;
				maxs.empty();
			}

			if(item.zindex === maxIndex) {
				maxs.add(item, name);
			}
		});

		return maxs;
	};

	inputRouter.editor.mouse.on('output', function(event) {
		if(event.state && event.which === 'LMB') {
			var found = scene.physics.world.findObjects(new Vector(event.x, event.y));
			var topObject = getMaxIndexes(found).last();

			if(topObject) {
				if(topObject.components.has('editor.selected')) {
					topObject.components.detach('editor.selected');
				} else {
					topObject.components.attach(new SelectionBorders(), 'editor.selected');
				}
			}
		}

		if(event.state && event.which === 'RMB') {
			//scene.objects.sorts('zindex', dsa);

			scene.objects.each(function(asd) {
				console.log(asd.zindex);
			});

			dsa = !dsa;
		}
	});

	var cube = new Cube(3, 10, 20);
	
	cube.components.attach(new CenterComponent(), 'center');
	scene.objects.addSort(cube);
	
	var cube = new Cube(2, 30, 40);
	
	cube.components.attach(new CenterComponent(), 'center');
	scene.objects.addSort(cube);

	var cube = new Cube(2, 50, 60);
	
	cube.components.attach(new CenterComponent(), 'center');
	scene.objects.addSort(cube);

	var cube = new Cube(1, 70, 80);

	cube.components.attach(new CenterComponent(), 'center');
	scene.objects.addSort(cube);
	*/

	scene.objects.add(new Cube(1, 100, 100));
	scene.objects.add(new Cube(2, 120, 120))

	scene.objects.add(new Cube(2, 320, 120))

	scene.gameLoop.start();
});