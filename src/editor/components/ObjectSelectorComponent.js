;(function () {
	
	define([
		'src/editor/SceneEditorComponent',
		'src/editor/components/Selected'
	], function(SceneEditorComponent, Selected) {

		var ObjectSelectorComponent = function() {
			ObjectSelectorComponent.super.constructor.call(this);
		};

		ObjectSelectorComponent.extend(SceneEditorComponent);

		ObjectSelectorComponent.prototype.run = function() {

			this.sceneEditor.input.keyboard.on('output', (function(event) {
				if(event.which === 'ESCAPE' && !event.state) {
					this.deselectAll();
				}
			}).bind(this));

			this.on('found', (function(object) {
				if(object.components.has('Selected')) {
					object.components.detach('Selected');
				} else {
					object.components.attach(new Selected(), 'Selected');
				}
			}).bind(this));
		};

		ObjectSelectorComponent.prototype.deselectAll = function() {
			this.sceneEditor.scene.objects.each((function(object) {
				if(object.components.has('Selected')) {
					object.components.detach('Selected');
				}
			}).bind(this));
		};

		return ObjectSelectorComponent;
	});
			
})();