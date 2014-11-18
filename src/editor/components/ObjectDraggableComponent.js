;(function () {
	
	define([
		'src/editor/SceneEditorComponent'
	], function(SceneEditorComponent) {

		var ObjectDraggableComponent = function() {
			ObjectDraggableComponent.super.constructor.call(this);
		};

		ObjectDraggableComponent.extend(SceneEditorComponent);

		ObjectDraggableComponent.prototype.run = function() {
			//this.sceneEditor.scene.camera.x += 100;
			var inDragState = false;
			var found;
			var selectedObjects;

			this.sceneEditor.input.touch.on('output', (function (event) {

				if(event.type === 'panstart') {
					var eventPos = event.position.clone();
					var cameraPos = this.sceneEditor.scene.camera.position.clone();

					found = this.filterSelected(this.sceneEditor.scene.physics.world.findObjects(eventPos.append(cameraPos)));

					if(found.len()) {
						inDragState = true;
						
						selectedObjects = this.sceneEditor.scene.findObjectsByComponent('Selected');

						selectedObjects.each(function (selectedGameObject) {
							selectedGameObject.$$point_gap = event.position.diffXY(selectedGameObject.position);
						});
					}
				}

				if(event.type === 'panmove' && inDragState) {
					
					selectedObjects.each(function (selectedGameObject) {
						var position = event.position.clone();
						position.append(selectedGameObject.$$point_gap);
						selectedGameObject.position = position;
					});
					
				}

				if(event.type === 'panend') {
					inDragState = false;
					if(selectedObjects) {
						selectedObjects.empty();
					}
				}
			}).bind(this));
		};

		ObjectDraggableComponent.prototype.filterSelected = function (objects) {
			objects.each(function (gameObject) {
				if(!gameObject.components.has('Selected')) {
					objects.remove(gameObject);
				}
			});

			return objects;
		};

		return ObjectDraggableComponent;
	});
			
})();