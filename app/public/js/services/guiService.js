'use strict';

// NPM Required
var nw = require('nw.gui');

daw.service('guiService', function() {

	var that = this;

	var win 			= nw.Window.get();
	var nativeMenuBar 	= new nw.Menu({ type: "menubar" });

	/*
	 * Init GUI
	 */
	that.init = function() {
		nativeMenuBar.createMacBuiltin("Dragand");
		win.menu = nativeMenuBar;
	};

});