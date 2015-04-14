/**
 * @ngdoc controller
 * @name settingsController
 * @requires $scope, $translate, settingsService, yifyService, configService
 * @module daw
 *
 * @description
 * Controller use for the view settings
 *
 */
daw.controller('settingsController', function($scope, $translate, settingsService, yifyService, configService) {

	/**
	 * @ngdoc property
	 * @name autoplay
	 */
	$scope.autoplay = settingsService.get('autoplay');

	$scope.$watch('autoplay', function(newVal) {
		settingsService.set('autoplay', newVal);
	});

	/**
	 * @ngdoc property
	 * @name notification
	 */
	$scope.notification = settingsService.get('notification');

	$scope.$watch('notification', function(newVal) {
		settingsService.set('notification', newVal);
	});

	/**
	 * @ngdoc property
	 * @name language
	 */
	$scope.language = settingsService.get('language');

	$scope.updateLanguage = function() {
		settingsService.set('language', $scope.language);
	};

	/**
	 * @ngdoc property
	 * @name countryCode
	 */
	$scope.countryCode = yifyService.languageMapping;

	/**
	 * @ngdoc property
	 * @name appLanguage
	 */
	$scope.appLanguage = settingsService.get('appLanguage');

	$scope.updateAppLanguage = function() {
		settingsService.set('appLanguage', $scope.appLanguage);
		$translate.use($scope.appLanguage);
	};

	/**
	 * @ngdoc property
	 * @name allAppLanguage
	 */
	$scope.allAppLanguage = configService.get('languages');

});