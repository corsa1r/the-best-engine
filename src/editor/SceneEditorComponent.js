;(function () {
	
	define(['src/engine/EventSet'], function(EventSet) {

		var SceneEditorComponent = function() {
			SceneEditorComponent.super.constructor.call(this);
		};

		SceneEditorComponent.extend(EventSet);

		SceneEditorComponent.prototype.init = function(sceneEditor) {
			this.sceneEditor = sceneEditor;
		};

		SceneEditorComponent.prototype.run = function() {};

		return SceneEditorComponent;
	});

})();