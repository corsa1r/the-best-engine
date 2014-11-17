;(function () {
	
	define(['src/engine/EventSet'], function(EventSet) {

		var GameObjectComponent = function() {
			GameObjectComponent.super.constructor.call(this);
		};

		GameObjectComponent.extend(EventSet);

		GameObjectComponent.prototype.init = function(gameObjectRef) {
			this.gameObject = gameObjectRef;

			this.gameObject.fire('componend.init', this);
		};

		GameObjectComponent.prototype.destroy = function() {
			this.gameObject.fire('componend.destory', this);
		};

		//Abstract methods
		GameObjectComponent.prototype.update = function() {};
		GameObjectComponent.prototype.draw = function() {};

		return GameObjectComponent;
	});

})();