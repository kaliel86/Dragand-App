'use strict';

// NPM Required
var open = require("open");

daw.service('playerService', function(settingsService) {

	var that = this;

	/*
	 * Function call in controller
	 */
	that.play = function(path) {
		settingsService.get('player').then(function(result) {
			if(!result) {
				open(encodeURI(path));
			} else {
				open(encodeURI(path), result);
			}
		});

	};

});