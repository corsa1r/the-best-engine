;(function () {

	define(['src/engine/physics/Vector', 'src/engine/EventSet', 'src/editor/helpers/MouseSelectionRect'], function(Vector, EventSet, MouseSelectionRect) {
		
		var MouseSelection = function(scene, inputRouter) {
			MouseSelection.super.constructor.call(this);

			this.inDragState = false;

			var from = null;
			var to = null;
				
			inputRouter.editor.mouse.on('output', (function(event) {

				if(event.state && event.which === 'LMB') {
					from = new Vector(event.x, event.y);
					this.inDragState = true;
					scene.objects.add(new MouseSelectionRect(from), '$editor.MouseSelectionRect');
				}

				if(!event.state && event.which === 'LMB') {
					this.inDragState = false;
					to = new Vector(event.x, event.y);

					var found = scene.physics.world.findObjects(from.appendClone(scene.camera.x, scene.camera.y), to.appendClone(scene.camera.x, scene.camera.y));

					found.remove('$editor.MouseSelectionRect');
					scene.objects.remove('$editor.MouseSelectionRect');

					console.log(found.len());
				}
			}).bind(this));

			inputRouter.editor.mouse.on('move', (function(event) {
				if(this.inDragState) {
					var mouseSelectionRect = scene.objects.get('$editor.MouseSelectionRect');
					mouseSelectionRect.size = new Vector(event.x - mouseSelectionRect.position.x, event.y - mouseSelectionRect.position.y);
				}
			}).bind(this));
		};

		MouseSelection.extend(EventSet);

		return MouseSelection;
	});

})();