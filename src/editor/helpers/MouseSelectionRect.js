;(function () {

	define(['src/engine/physics/Vector', 'src/engine/GameObject'], function(Vector, GameObject) {
		
		var MouseSelectionRect = function(position) {
			MouseSelectionRect.super.constructor.call(this);

			this.position = position;
			this.size = new Vector(1, 1);
		};

		MouseSelectionRect.extend(GameObject);

		MouseSelectionRect.prototype.draw = function(screen, camera) {
			screen.context.save();
			screen.context.beginPath();
			screen.context.globalAlpha = 0.5;
			screen.context.globalCompositeOperation = 'xor';
			screen.context.fillStyle = 'green';
			screen.context.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
			screen.context.restore();
		};

		return MouseSelectionRect;
	});

})();