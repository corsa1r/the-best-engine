;(function () {
	
	define([
		'src/editor/SceneEditorComponent',
		'src/engine/physics/Vector',
		'src/engine/Container',
		'src/editor/components/TopObjectComponent'
		], function(SceneEditorComponent, Vector, Container, TopObjectComponent) {

		var MouseObjectsFinderComponent = function() {
			MouseObjectsFinderComponent.super.constructor.call(this);

			this.controllDown = false;
		};

		MouseObjectsFinderComponent.extend(SceneEditorComponent);

		MouseObjectsFinderComponent.prototype.run = function() {
			this.sceneEditor.input.keyboard.on('output', (function(event) {
				if(event.which === 'CONTROL') {
					this.controllDown = event.state;
				}
			}).bind(this));

			this.sceneEditor.components.attach(new TopObjectComponent(), 'TopObjectComponent');

			this.sceneEditor.input.mouse.on('output', (function(event) {

				if(!event.state && event.which === 'LMB') {
					var found = this.sceneEditor.scene.physics.world.findObjects(new Vector(event.x, event.y));

					if(found.len()) {
						if(!this.controllDown) {
							this.sceneEditor.components.get('ObjectSelectorComponent').deselectAll();
						}

						this.sceneEditor.components.get('TopObjectComponent').fire('found', found);
					}
				}

			}).bind(this));
		};

		return MouseObjectsFinderComponent;
	});
			
})();