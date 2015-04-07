'use strict';

/**
 * @ngdoc service
 * @name settingsService
 * @module daw
 *
 * @description
 * Service for manage information in localStorage (Use for user's settings)
 *
 */
daw.service('settingsService', function(){

	var that = this;

	/**
	 * @ngdoc method
	 * @name init
	 *
	 * @description
	 * Init in the localStorage the default value
	 *
	 */
	that.init = function() {

		if(!localStorage['autoplay'] && !localStorage['player'] && !localStorage['language']) {
			that.set('autoplay', false);
			that.set('player', 'vlc');
			that.set('language', 'fr');
		}

	};

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get Value from Database
	 *
	 */
	that.get = function(key) {
		return localStorage[key];
	};

	/**
	 * @ngdoc method
	 * @name set
	 *
	 * @description
	 * Set Value in Database
	 *
	 * @param {string} key 		- Key
	 * @param {string} value 	- Value
	 *
	 */
	that.set = function(key, value) {
		localStorage[key] = value;
	};

});