/**
 * @ngdoc service
 * @name guiService
 * @requires $rootScope
 * @module daw
 *
 * @description
 * Service for manage GUI of Node-Webkit
 *
 */
daw.service('guiService', function($rootScope) {

	var that = this;

	var win 			= gui.Window.get();
	var nativeMenuBar 	= new gui.Menu({ type: "menubar" });

	/**
	 * @ngdoc method
	 * @name init
	 *
	 * @description
	 * Init Menu of the GUI
	 *
	 */
	that.init = function() {
		if(process.platform === "darwin") {
			nativeMenuBar.createMacBuiltin("Dragand");
		}
		win.menu = nativeMenuBar;
		that.listenResize();
	};

	/**
	 * @ngdoc method
	 * @name listenResize
	 *
	 * @description
	 * Listen Resize and add new Width in RootScope
	 * So for exemple Width : 400px -> 21.25 -> 21 characters
	 *
	 */
	that.listenResize = function() {
		$rootScope.limit = 15;
		window.addEventListener("resize", function() {
			$rootScope.limit = window.Math.floor((win.width * 15) / 320);
			$rootScope.$apply();
		});
	};

});