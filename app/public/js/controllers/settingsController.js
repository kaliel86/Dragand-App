'use strict';

daw.controller('settingsController', function($scope, $translate, settingsService, yifyService, configService) {

	/*
	 * AutoPlay
	 */
	$scope.autoplay = settingsService.get('autoplay');

	$scope.$watch('autoplay', function(newVal) {
		settingsService.set('autoplay', newVal);
	});

	/*
	 * Notification
	 */
	$scope.notification = settingsService.get('notification');

	$scope.$watch('notification', function(newVal) {
		settingsService.set('notification', newVal);
	});

	/*
	 * Languages
	 */
	$scope.language = settingsService.get('language');

	$scope.updateLanguage = function() {
		settingsService.set('language', $scope.language);
	};

	$scope.countryCode = yifyService.languageMapping;

	/*
	 * App Languages
	 */
	$scope.appLanguage = settingsService.get('appLanguage');

	$scope.updateAppLanguage = function() {
		settingsService.set('appLanguage', $scope.appLanguage);
		$translate.use($scope.appLanguage);
	};

	$scope.allAppLanguage = configService.get('languages');

});