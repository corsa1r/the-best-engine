;(function() {

	"use strict";

	define(['src/engine/Observer'], function(Observer) {

		var PlayerHealthObserver = function(target) {
			PlayerHealthObserver.super.constructor.call(this);

			this.target = target;
			target.on('updated', this.watch.bind(this));
		};

		PlayerHealthObserver.extend(Observer);

		PlayerHealthObserver.prototype.watch = function() {
			if(this.target.health || this.target.health === 0) {
				this.fire('seen', 'dead', this.target.health <= 0);
			}
		};

		return PlayerHealthObserver;
	});
})();