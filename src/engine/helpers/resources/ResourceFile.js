;(function() {

	"use strict";

	define([
		'src/engine/EventSet'
	], function(EventSet) {

		var ResourceFile = function() {
			ResourceFile.super.constructor.call(this);

			this.resource 	= null;
			this.path 		= null;
		};

		ResourceFile.extend(EventSet);

		/**
		* This is abstract method
		*/
		ResourceFile.prototype.load = function() {};
		/**
		* This is abstract method
		*/
		ResourceFile.prototype.getResource = function() {
			return this.resource;
		};
		/**
		* This is abstract method
		*/
		ResourceFile.prototype.getPath = function() {
			return this.path;
		};

		return ResourceFile;
	});

})();