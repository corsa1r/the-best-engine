;(function () {
	
	define(['src/engine/physics/PhysicsWorld'], function(PhysicsWorld) {

		var Physics = function(scene) {
			this.world = new PhysicsWorld(scene.objects);
		};

		return Physics;
	});

})();