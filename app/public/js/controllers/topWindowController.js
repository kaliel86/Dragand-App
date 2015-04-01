'use strict';

daw.controller('topWindowController', function($scope, checkUpdateService) {

	/*
	 * If update available, launch update
	 */
	$scope.update = function() {
		checkUpdateService.update();
	};

});