;(function () {
	
	define([
		'src/editor/SceneEditorComponent',
		'src/engine/physics/Vector'
		], function(SceneEditorComponent, Vector) {

		var CameraControllerComponent = function() {
			CameraControllerComponent.super.constructor.call(this);

			this.controllPoint = null;
			this.settings = {};
		};

		CameraControllerComponent.extend(SceneEditorComponent);

		CameraControllerComponent.prototype.run = function() {
			this.sceneEditor.input.mouse.on('output', this.input.bind(this));
			this.sceneEditor.input.mouse.on('move', this.move.bind(this));
			this.setup();
		};

		CameraControllerComponent.prototype.setup = function(options) {
			options = options || CameraControllerComponent.$defaults;
			this.settings = options;
		};

		CameraControllerComponent.prototype.input = function(event) {
			if(event.state && event.which === (this.settings.inputWhich || CameraControllerComponent.$defaults.inputWhich)) {
				this.controllPoint = {
					position : new Vector().copy(event.position),
					origins  : new Vector().copy(this.sceneEditor.scene.camera.position)
                };
			}

			if(!event.state && event.which === (this.settings.inputWhich || CameraControllerComponent.$defaults.inputWhich)) {
				this.controllPoint = null;
			}
		};

		CameraControllerComponent.prototype.move = function(event) {
			if(this.controllPoint) {
				/*
                this.camera.x = this.controllPoint.ox - (e.x - this.controllPoint.x);
                this.camera.y = this.controllPoint.oy - (e.y - this.controllPoint.y);
                */
                var x = this.controllPoint.origins.x - (event.position.x - this.controllPoint.position.x);
                var y = this.controllPoint.origins.y - (event.position.y - this.controllPoint.position.y);
                
                this.sceneEditor.scene.camera.position = new Vector(x, y);
			}
		};
		
		CameraControllerComponent.$defaults = {
			inputType : 'mouse',
			inputWhich: 'RMB'
		};

		return CameraControllerComponent;
	});
			
})();