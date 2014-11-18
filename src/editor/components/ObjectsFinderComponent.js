;(function () {
	
	define([
		'src/editor/SceneEditorComponent',
		'src/engine/physics/Vector',
		'src/engine/Container',
		'src/editor/components/TopObjectComponent'
		], function(SceneEditorComponent, Vector, Container, TopObjectComponent) {

		var ObjectsFinderComponent = function() {
			ObjectsFinderComponent.super.constructor.call(this);

			this.controllDown = false;
		};

		ObjectsFinderComponent.extend(SceneEditorComponent);

		ObjectsFinderComponent.prototype.run = function() {
			this.sceneEditor.input.keyboard.on('output', (function(event) {
				if(event.which === 'CONTROL') {
					this.controllDown = event.state;
				}
			}).bind(this));

			this.sceneEditor.components.attach(new TopObjectComponent(), 'TopObjectComponent');

			this.sceneEditor.input.touch.on('output', (function(event) {

				if(event.type === 'tap') {
					var eventPos = event.position.clone();
					var cameraPos = this.sceneEditor.scene.camera.position.clone();

					var found = this.sceneEditor.scene.physics.world.findObjects(eventPos.append(cameraPos));

					if(found.len()) {
						if(!this.controllDown) {
							this.sceneEditor.components.get('ObjectSelectorComponent').deselectAll();
						}

						this.sceneEditor.components.get('TopObjectComponent').fire('found', found);
					}
				}

			}).bind(this));
		};

		return ObjectsFinderComponent;
	});
			
})();