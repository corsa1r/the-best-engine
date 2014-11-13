;(function () {
	

	define([
		'src/editor/helpers/MouseSelection',
		'src/editor/helpers/CameraController',
		'src/engine/Container',
		'src/editor/helpers/SelectionMarker'
	], function(MouseSelection, CameraController, Container, SelectionMarker) {
		
		var Editor = function(scene, inputRouter) {
			this.scene = scene;
			this.inputRouter = inputRouter;

			this.initMouseSelection();
			this.initCameraController();

			this.scene.gameLoop.on('test', (function() {
				//console.log(this.scene.findObjectsByClass(SelectionMarker).len());
			}).bind(this));

			this.mouse = {x: 0, y: 0};

			this.inputRouter.editor.mouse.on('move', (function() {
				this.mouse.x = event.x;
				this.mouse.y = event.y;
			}).bind(this));
		};

		Editor.prototype.initCameraController = function() {
			this.cameraController = new CameraController(this.scene, this.inputRouter);
		};

		Editor.prototype.initMouseSelection = function() {
			this.selectedObjects = new Container();
			this.mouseSelection = new MouseSelection(this.scene, this.inputRouter);

			this.mouseSelection.on('selected', (function(selectedObjects, range) {
				if(range === 0) {
					this.deselectAllSelected();
				}

				this.selectedObjects = selectedObjects;

				selectedObjects.each((function(selectedObject) {
					this.deselectByTarget(selectedObject);
					var marker = this.mouseSelection.createMarkerFor(selectedObject);
					this.scene.objects.add(marker);
				}).bind(this));
			}).bind(this));

			this.mouseSelection.on('selected.nothing', (function() {
				this.deselectAllSelected();
			}).bind(this));

			this.mouseSelection.on('selection.resize', (function() {
				this.deselectAllSelected();
			}).bind(this));

			this.inputRouter.editor.keyboard.on('output', (function(event) {
				if(event.state && event.which === 'ESCAPE') {
					this.deselectAllSelected();
				}
			}).bind(this));
		};

		Editor.prototype.deselectByTarget = function(target) {
			this.scene.findObjectsByClass(SelectionMarker).each((function(marker) {
				//console.log('asd')

				//console.log(this.scene.objects.get(target));
			}).bind(this));
		};

		Editor.prototype.deselectAllSelected = function() {
			this.selectedObjects.empty();
			this.scene.findObjectsByClass(SelectionMarker).each((function(marker) {
				this.scene.objects.remove(marker);
			}).bind(this));
		};

		return Editor;
	});

})();