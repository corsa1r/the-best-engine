/**
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * @author Apo <apomarinov@gmail.com>
 * 
 * @file implements InputRouter class
 * @requires Scene class
 * @description this class implements input source routing
 * @see 
 *  	var canvas = document.getElementById('canvas');
 * 		var scene = new Scene(canvas, 500, 500);
 * 		var inputRouter = new InputRouter(scene);
 * 
 * 		inputRouter.editor.mouse.on('output', function(event) {
 *			//Do something with mouse in editor
 *		});
 * 
 * 		inputRouter.client.mouse.on('output', function(event) {
 *			//Do something with mouse in game
 *		});
 * 
 * @version 12.11.2014a
 */
 ;(function() {
	
	define([
		'src/engine/input/KeyboardInput',
		'src/engine/input/MouseInput',
		'src/engine/input/StateMap',
		'src/engine/input/InputSet'
		], function(KeyboardInput, MouseInput, StateMap, InputSet) {
		
		var InputRouter = function(scene) {
			InputRouter.super.constructor.call(this);

			this.editOn = true;
			this.initInputs(scene);
		};
		
		/**
		 * This method initializes the input sources
		 * Then automaticly feeds them with StateMap
		 * Then triggers the correct event in the corrent place depends on editOn field
		 */
		InputRouter.prototype.initInputs = function(scene) {
			//Init input sources
			var mouse = new MouseInput(scene.screen);
			var keyboard = new KeyboardInput();
			
			//Init StateMaps
			var mouseStateMap = new StateMap();
			var keyboardStateMap = new StateMap();
	
			//Feeds maps
			mouse.on('output', mouseStateMap.feed(MouseInput.buttonMap));
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
		
		/**
		 * This method fires an event
		 * If this.editOn queals true, inputType is getted from 'editor' field which is InputSet
		 * 
		 * @param {String} inputType - 'mouse', 'keyboard' or 'touch'
		 * @param {Object} event - this is output event from the input source
		 * returns undefined
		 */
		InputRouter.prototype.triggerEvent = function(inputType, event) {
			this[this.editOn ? 'editor' : 'client'][inputType].fire('output', event);
		};

		return InputRouter;
	});

})();
