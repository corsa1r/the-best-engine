;(function () {
	
	define(['src/engine/GameObject'], function(GameObject) {

		var SelectionMarker = function(target) {
			SelectionMarker.super.constructor.call(this);

			this.setTarget(target);

			this.w = 3;
		};

		SelectionMarker.extend(GameObject);

		SelectionMarker.prototype.setTarget = function(targetGameObject) {
			
			if(targetGameObject.instanceofGameObject === true && !(targetGameObject instanceof SelectionMarker)) {
				this.target = targetGameObject;
				this.position = this.target.position;
				this.size = this.target.size;
			}
		};

		SelectionMarker.prototype.update = function(delta, scene) {
			if(!this.target) {
				scene.objects.remove(this);
				return;
			}

			this.target.position = this.position;
			this.target.size = this.size;
		};

		SelectionMarker.prototype.draw = function(screen, camera) {
			screen.context.save();
			screen.context.fillStyle = 'green';
			screen.context.fillRect(this.position.x - this.w - camera.x, this.position.y - this.w * 2 - camera.y, this.size.x + this.w * 2, this.w);
			screen.context.fillRect(this.position.x - this.w - camera.x, this.position.y + this.size.y + this.w - camera.y, this.size.x + this.w * 2, this.w);
			screen.context.fillRect(this.position.x - this.w * 2 - camera.x, this.position.y - this.w * 2 - camera.y, this.w, this.size.y + this.w * 4);
			screen.context.fillRect(this.position.x + this.size.x + this.w - camera.x, this.position.y - this.w * 2 - camera.y, this.w, this.size.y + this.w * 4);
			screen.context.restore();
		};

		return SelectionMarker;
	});

})();