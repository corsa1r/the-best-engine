;(function () {
	
	"use strict";

	define([
		'src/engine/GameObject',
		'KeyboardInputObserver',
		'PlayerHealthObserver',
		'PlayerDeadPointObserver',
		'src/engine/Volume2d'
	], function(GameObject, KeyboardInputObserver, PlayerHealthObserver, PlayerDeadPointObserver, Volume2d) {

		var TestPlayer = function() {
			TestPlayer.super.constructor.call(this);

			this.subject.subscribe(new KeyboardInputObserver(this));
			this.subject.subscribe(new PlayerHealthObserver(this));
			this.subject.subscribe(new PlayerDeadPointObserver(this));

			this.health = 100;
			this.position = new Volume2d(0, 0);
			this.size = new Volume2d(100, 100);

			this.position.on('change', function(x, y) {
				console.info(x, y);
			});
		};

		TestPlayer.extend(GameObject);

		TestPlayer.prototype.update = function(delta, scene) {


			if(this.states.has('healthPotion')) {
				this.health += 4;
			}

			if(!this.states.has('dead')) {
				if(this.states.has('move.up')) {
					this.position.y -= 0.3 * delta;
				}

				if(this.states.has('move.down')) {
					this.position.y += 0.3 * delta;
				}

				if(this.states.has('move.left')) {
					this.position.x -= 0.3 * delta;
				}
				
				if(this.states.has('move.right')) {
					this.position.x += 0.3 * delta;
				}
			}

			if(this.states.has('deadPoint')) {
				this.health--;
			}

			if(this.health <= 0) {
				this.health = 0;
			}
		};

		TestPlayer.prototype.draw = function(screen, delta) {
			screen.context.beginPath();
			screen.context.fillStyle = 'black';
			screen.context.rect(this.position.x, this.position.y, this.size.x, this.size.y);
			screen.context.fill();
			screen.context.beginPath();
			screen.context.font="20px Georgia";
			screen.context.fillStyle = 'red';
			screen.context.fillText("Health", this.position.x + 20, this.position.y + 40);
			screen.context.fillText(this.health, this.position.x + 20, this.position.y + 60);
			screen.context.fillText(this.states.has('dead') ? 'DEAD' : '', this.position.x + 20, this.position.y + 80);
			screen.context.fill();
		};

		return TestPlayer;
	});

})();