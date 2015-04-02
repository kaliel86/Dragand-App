'use strict';

daw.service('guiService', function() {

	var that = this;

	var win 			= gui.Window.get();
	var nativeMenuBar 	= new gui.Menu({ type: "menubar" });

	/*
	 * Init GUI
	 */
	that.init = function() {
		nativeMenuBar.createMacBuiltin("Dragand");
		win.menu = nativeMenuBar;
	};

});