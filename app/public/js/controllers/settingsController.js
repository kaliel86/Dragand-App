'use strict';

daw.controller('settingsController', function($scope, settingsService) {

	/*
	 * AutoPlay
	 */
	$scope.autoplay = settingsService.get('autoplay');

	$scope.updateAutoplay = function() {
		settingsService.set('autoplay', $scope.autoplay);
	};

	/*
	 * Languages
	 */
	$scope.language = settingsService.get('language');

	$scope.updateLanguage = function() {
		settingsService.set('language', $scope.language);
	};

});