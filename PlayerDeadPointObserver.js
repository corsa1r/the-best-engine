;(function() {

	"use strict";

	define(['src/engine/GameObject', 'src/engine/Observer'], function(GameObject, Observer) {

		var PlayerDeadPointObserver = function(target) {
			PlayerDeadPointObserver.super.constructor.call(this);

			this.target = target;

			this.target.on('updated', this.watch.bind(this));
		};

		PlayerDeadPointObserver.extend(Observer);

		PlayerDeadPointObserver.prototype.watch = function(delta, scene) {
			var playerDeadlyZoneObject = scene.objects.get('deadlyZone');

			var state = false;

			if(playerDeadlyZoneObject) {
				state = Boolean(this.target.position.x + 100 > playerDeadlyZoneObject.position.x && this.target.position.x < playerDeadlyZoneObject.position.x + 100 && this.target.position.y + 100 > playerDeadlyZoneObject.position.y && this.target.position.y < playerDeadlyZoneObject.position.y + 100);	
			}

			this.fire('seen', 'deadPoint', state);
		};

		return PlayerDeadPointObserver;
	});
})();