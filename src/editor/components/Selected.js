;(function () {
	
	define([
		'src/engine/GameObjectComponent',
		'src/engine/components/CenterComponent'
		], function(GameObjectComponent, CenterComponent) {

		var Selected = function() {
			Selected.super.constructor.call(this);

			this.w = 2;
		};

		Selected.extend(GameObjectComponent);

		Selected.prototype.draw = function(screen, camera) {

			if(!this.gameObject.components.has('CenterComponent')) {
				this.gameObject.components.attach(new CenterComponent(), 'CenterComponent');
			}

			screen.context.save();
			screen.context.fillStyle = 'green';
			screen.context.globalCompositeOperation = 'xor';
			screen.context.fillRect(this.gameObject.position.x - 2 * this.w, this.gameObject.position.y - this.w * 2, this.w, this.gameObject.size.y + this.w * 4);
			screen.context.fillRect(this.gameObject.position.x + this.gameObject.size.x + this.w, this.gameObject.position.y - this.w * 2, this.w, this.gameObject.size.y + this.w * 4);
			screen.context.fillRect(this.gameObject.position.x - 2 * this.w, this.gameObject.position.y - this.w * 2, this.gameObject.size.x + 4 * this.w, this.w);
			screen.context.fillRect(this.gameObject.position.x - 2 * this.w, this.gameObject.position.y + this.gameObject.size.y + this.w, this.gameObject.size.x + 4 * this.w, this.w);
			
			var center = this.gameObject.components.get('CenterComponent').get();
			screen.context.arc(center.x, center.y, (center.x - this.gameObject.position.x) / 5, Math.PI * 2, false);
			screen.context.fill();
			screen.context.restore();
		};
		
		return Selected;
	});
			
})();