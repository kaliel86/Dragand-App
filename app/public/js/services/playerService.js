'use strict';

/**
 * @ngdoc service
 * @name playerService
 * @requires settingsService
 * @module daw
 *
 * @description
 * Service use for the player (VLC)
 *
 */
daw.service('playerService', function(settingsService) {

	var that = this;


	/**
	 * @ngdoc method
	 * @name play
	 *
	 * @description
	 * Open the movie with a player (VLC)
	 *
	 * @param {string} path - Path of the file
	 *
	 */
	that.play = function(path) {

		var player = settingsService.get('player');

		if(!player) {
			open(encodeURI(path));
		} else {
			open(encodeURI(path), player);
		}

	};

});