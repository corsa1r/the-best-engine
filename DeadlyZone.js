;(function () {
	
	"use strict";

	define(['src/engine/GameObject'], function(GameObject) {

		var DeadlyZone = function() {
			DeadlyZone.super.constructor.call(this);

			this.position = {x: 200, y: 0};
			this.size = {x: 100, y: 100};

			this.directionY = 1;
		};

		DeadlyZone.extend(GameObject);

		DeadlyZone.prototype.update = function(delta) {
			if(this.position.y < 0) {
				this.directionY = 1;
			}

			if(this.position.y > 200) {
				this.directionY = -1;
			}

			this.position.y += 0.3 * delta * this.directionY;
		};

		DeadlyZone.prototype.draw = function(screen, delta) {
			screen.context.beginPath();
			screen.context.rect(this.position.x, this.position.y, this.size.x, this.size.y);
			screen.context.fillStyle = 'red';
			screen.context.fill();
		};

		return DeadlyZone;
	});

})();