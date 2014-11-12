;(function() {

	define([
		'src/engine/EventSet',
		'src/engine/input/KeyboardInput',
		'src/engine/input/MouseInput',
		'src/engine/input/StateMap',
		'src/engine/input/InputSet'
		], function(EventSet, KeyboardInput, MouseInput, StateMap, InputSet) {

		var InputRouter = function(scene) {
			InputRouter.super.constructor.call(this);

			this.editOn = true;
			this.initInputs(scene);
		};

		InputRouter.extend(EventSet);

		InputRouter.prototype.initInputs = function(scene) {
			var mouse = new MouseInput(scene.screen);
			var mouseStateMap = new StateMap();

			mouse.on('output', mouseStateMap.feed(MouseInput.buttonMap));

			var keyboard = new KeyboardInput();
			var keyboardStateMap = new StateMap();

			keyboard.on('output', keyboardStateMap.feed(KeyboardInput.keyMap));

			mouseStateMap.on('output', (function(event) {
				this.triggerEvent('mouse', event);
			}).bind(this));

			keyboardStateMap.on('output', (function(event) {
				this.triggerEvent('keyboard', event);
			}).bind(this));

			this.client = new InputSet();
			this.editor = new InputSet();
		};

		InputRouter.prototype.triggerEvent = function(inputType, event) {
			this[this.editOn ? 'editor' : 'client'][inputType].fire('output', event);
		};

		return InputRouter;
	});

})();