'use strict';

daw.service('configService', function(config) {

	var that = this;

	/*
	 * Set a value in Constant Config
	 */
	that.set = function(key, value) {
		config[key] = value;
	};

	/*
	 * Get a value in Constant Config
	 */
	that.get = function(key) {
		return config[key];
	};

});