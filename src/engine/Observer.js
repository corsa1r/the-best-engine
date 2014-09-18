;(function() {

	"use strict";

	define(['src/engine/EventSet', 'src/engine/GameObject'], function(EventSet, GameObject) {

		//Extendable class
		var Observer = function() {
			Observer.super.constructor.call(this);

			this.on('seen', (function(state, starting) {
				this.fire('notify', state, Boolean(starting));
			}).bind(this));
		};

		Observer.extend(EventSet);

		//Abstract method, called in update
		Observer.prototype.watch = function() {};

		return Observer;
	});
})();