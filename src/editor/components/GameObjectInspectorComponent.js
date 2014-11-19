;(function () {
	
	define([
		'src/editor/SceneEditorComponent',
		'src/engine/GameObject'
	], function(SceneEditorComponent, GameObject) {

		var GameObjectInspectorComponent = function() {
			GameObjectInspectorComponent.super.constructor.call(this);
		};

		GameObjectInspectorComponent.extend(SceneEditorComponent);

		GameObjectInspectorComponent.prototype.run = function() {
			
		};

		return GameObjectInspectorComponent;
	})
})();