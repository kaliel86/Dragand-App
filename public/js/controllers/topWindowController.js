/**
 * @ngdoc controller
 * @name topWindowController
 * @requires $scope, checkUpdateService
 * @module daw
 *
 * @description
 * Controller use for top window
 *
 */
daw.controller('topWindowController', function($scope, checkUpdateService) {

	/**
	 * @ngdoc method
	 * @name update
	 *
	 * @description
	 * Check if update is available
	 */
	$scope.update = function() {
		checkUpdateService.update();
	};

});