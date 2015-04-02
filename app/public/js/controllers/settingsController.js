'use strict';

daw.controller('settingsController', function($scope, settingsService) {

	/*
	 * AutoPlay
	 */
	$scope.autoplay = settingsService.get('autoplay');

	$scope.$watch('autoplay', function(newVal) {
		settingsService.set('autoplay', newVal);
	});

	/*
	 * Languages
	 */
	$scope.language = settingsService.get('language');

	$scope.updateLanguage = function() {
		settingsService.set('language', $scope.language);
	};

});