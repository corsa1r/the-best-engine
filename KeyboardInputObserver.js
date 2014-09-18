;(function() {

	"use strict";

	define([
		'src/engine/Observer',
	 	'src/engine/input/StateMap',
	 	'src/engine/input/KeyboardInput'

	 ], function(Observer, StateMap, KeyboardInput) {

		var KeyboardInputObserver = function(target) {
			KeyboardInputObserver.super.constructor.call(this);

			this.target = target;

			var stateMap = new StateMap();
			var keyboard = new KeyboardInput();

			keyboard.on('output', stateMap.feed(KeyboardInput.keyMap));
			
			stateMap.on('output', (function(event) {
				
				switch(event.which) {
					
					case 'SPACE' :
						this.fire('seen', 'healthPotion', event.state);
						break;

					case 'A' :
						this.fire('seen', 'move.left', event.state);
						break;

					case 'D' :
						this.fire('seen', 'move.right', event.state);
						break;
					
					case 'W' :
						this.fire('seen', 'move.up', event.state);
						break;
					
					case 'S' :
						this.fire('seen', 'move.down', event.state);
						break;
				}
			}).bind(this));

			target.on('updated', this.watch.bind(this));
		};

		KeyboardInputObserver.extend(Observer);

		return KeyboardInputObserver;
	});
})();