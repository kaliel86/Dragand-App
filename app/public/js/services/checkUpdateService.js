'use strict';

// NPM Required
var pkg 	= require('../package.json');
var updater = require('node-webkit-updater');
var upd 	= new updater(pkg);
var copyPath, execPath;

daw.service('checkUpdateService', function() {

	var that = this;

	that.launch = function() {
		// TODO Do stuff
	};

});