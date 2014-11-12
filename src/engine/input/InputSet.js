;(function() {


	define(['src/engine/EventSet'], function(EventSet) {

		var InputSet = function() {
			this.mouse = new EventSet();
			this.keyboard = new EventSet();
			this.touch = new EventSet();
		};

		return InputSet;
	});

})();