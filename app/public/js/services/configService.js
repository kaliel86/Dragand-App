'use strict';

daw.service('configService', function(config) {

	/*
	 * Set a value in Constant Config
	 */
	this.set = function(key, value) {
		config[key] = value;
	};

	/*
	 * Get a value in Constant Config
	 */
	this.get = function(key) {
		return config[key];
	};

});