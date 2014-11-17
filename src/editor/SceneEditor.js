;(function () {
	
	define([
		'src/engine/Container',
		'src/engine/helpers/AdvancedContainer'
	], function(Container, AdvancedContainer) {

		var SceneEditor = function(scene, inputRouter) {
			this.scene = scene;
			this.input = inputRouter.editor;

			this.selectedObjects = new Container();

            this.components = new AdvancedContainer();
            this.components.setAdvancedOnAdd('init', 'init', this);
            this.components.setAdvancedOnAdd('run', 'run');
		};

		return SceneEditor;
	});

})();