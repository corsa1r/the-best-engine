;(function() {

	"use strict";

	define([
		'src/engine/Scene',
		'TestPlayer',
		'DeadlyZone'
		], function(Scene, TestPlayer, DeadlyZone) {

		var scene = new Scene(document.getElementById('canvas'), 300, 300);

		scene.objects.add(new DeadlyZone(), 'deadlyZone');
		scene.objects.add(new TestPlayer());

		scene.gameLoop.start();
	});

})();