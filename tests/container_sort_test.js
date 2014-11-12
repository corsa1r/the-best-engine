require.config({
	baseUrl: "./"
});

define(['src/engine/Container'], function(Container) {

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
});