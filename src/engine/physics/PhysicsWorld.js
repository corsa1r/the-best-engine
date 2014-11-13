;(function () {
	
	define(['src/engine/Container', 'src/engine/physics/Vector'], function(Container, Vector) {

		var PhysicsWorld = function(objects) {
			this.$objects = objects || new Container();
		};

		PhysicsWorld.prototype.step = function(delta) {

		};

		/**
		* This method search for objects in rect
		* @param {Vector} from - top left point of rect
		* @param {[Vector]} to - bottom right point of rect
		*
		*/
		PhysicsWorld.prototype.findObjects = function(from, to) {

			if(!(from instanceof Vector)) {
				throw new Error('findObjects: from must be Vector');
			}

			if(to && !(to instanceof Vector)) {
				throw new Error('findObjects: to must be Vector');	
			}

			if(!to) {
				to = new Vector();
				to.copy(from);
			}

			if(to.x < from.x) {
				var temp_x = from.x;
				from.x = to.x;
				to.x = temp_x;
			}

			if(to.y < from.y) {
				var temp_y = from.y;
				from.y = to.y;
				to.y = temp_y;
			}

			var found = new Container();

			this.$objects.each(function(gameObject, id, name) {
				var c1 = gameObject.position.x + gameObject.size.x > from.x;
				var c2 = gameObject.position.x < from.x + (to.x - from.x);
				var c3 = gameObject.position.y + gameObject.size.y > from.y;
				var c4 = gameObject.position.y < from.y + (to.y - from.y);

				if(c1 && c2 && c3 && c4) {
					found.add(gameObject, name);
				}
			});

			return found;
		};

		return PhysicsWorld;
	});

})();