'use strict';

// NPM Required
var open = require("open");

daw.service('playerService', function(settingsService) {

	var that = this;

	/*
	 * Function call in controller
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