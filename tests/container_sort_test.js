require.config({
	baseUrl: "./"
});

define(['src/engine/Container'], function(Container) {

	var Player = function() {
		this.position = {x: 19, y: 399};
		this.zindex = 5;
	};

	var something = function(zindex) {
		this.zindex = zindex;
	};

	/*
	something.prototype.init = function(scene) {
		this.scene = scene;
	}

	something.prototype.setZindex = function(zindex) {
		this.zindex = zindex;
		this.scene.sort('zindex', true);
	}
	*/

	var c = new Container();
	var p = new Player();
	c.add(p, 'p');
	c.add(new something(3));
	c.add(new something(10));
	c.add(new something(1));

	c.each(function(a, b, v) {
		console.warn(a, b, v);
	});

	c.sort('zindex', true);
	console.log('------------------');

	c.each(function(a, b, v) {
		console.warn(a, b, v);
	});

	console.log(c.get(p), c.get('p'));
});