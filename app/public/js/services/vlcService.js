'use strict';

// NPM Required
var open = require("open");

daw.service('vlcService', function(configService) {

	var that = this;

	/*
	 * Function call in controller
	 */
	that.play = function(path) {
		open(encodeURI(path), 'vlc');
	};

});