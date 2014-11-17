;(function () {
	
	define(['src/engine/GameObjectComponent', 'src/engine/physics/Vector'], function(GameObjectComponent, Vector) {

		var CenterComponent = function() {
			CenterComponent.super.constructor.call(this);
		};

		CenterComponent.extend(GameObjectComponent);

		CenterComponent.prototype.get = function() {
			return new Vector(this.gameObject.position.x + (this.gameObject.size.x / 2), this.gameObject.position.y + (this.gameObject.size.y / 2));
		};

		return CenterComponent;
	});

})();