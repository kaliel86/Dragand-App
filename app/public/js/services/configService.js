/**
 * @ngdoc service
 * @name configService
 * @requires config
 * @module daw
 *
 * @description
 * Service for manage config of the app
 *
 */
daw.service('configService', function(config) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name set
	 *
	 * @description
	 * Set Value in config
	 *
	 * @param {string} key 		- Key
	 * @param {string} value 	- Value
	 *
	 */
	that.set = function(key, value) {
		config[key] = value;
	};

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get Value from Config
	 *
	 */
	that.get = function(key) {
		return config[key];
	};

});