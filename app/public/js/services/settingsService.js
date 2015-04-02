'use strict';

daw.service('settingsService', function(){

	var that = this;

	/*
	 * init StoreDB
	 */
	that.init = function() {

		if(!localStorage['autoplay'] && !localStorage['player'] && !localStorage['language']) {
			that.set('autoplay', false);
			that.set('player', 'vlc');
			that.set('language', 'fr');
		}

	};

	/*
	 * Get Value from Database
	 */
	that.get = function(key) {
		return localStorage[key];
	};

	/*
	 * Set Value in Database
	 */
	that.set = function(key, value) {
		localStorage[key] = value;
	};

});