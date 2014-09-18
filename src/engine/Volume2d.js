;(function() {

	"use strict";

	define(['src/engine/EventSet'], function(EventSet) {

		var Volume2d = function(byX, byY, useSimpleInt) {
			Volume2d.super.constructor.call(this);

			//TODO use Simple Int

			this.x = byY || 0;
			this.y = byY || 0;

			//Change this to ChangeListener

			this.on('_change', (function(field, value) {
				this.fire('change.' + field, value);
				this.fire('change', this.x, this.y);
			}).bind(this));

			var lX = this.x;
			var lY = this.y;

			setInterval((function() {
				if(this.lX !== this.x) {
					this.fire('_change', 'x', this.x);
					this.lX = this.x;
				}

				if(this.lY !== this.y) {
					this.fire('_change', 'y', this.y);
					this.lY = this.y;
				}
			}).bind(this), 1000 / 60);
		};

		Volume2d.extend(EventSet);

		return Volume2d;
	});
})();