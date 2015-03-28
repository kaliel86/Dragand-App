'use strict';

daw.directive('topWindow', function($window) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/topWindow.html',

		link: function($scope, element, attrs) {

		}
	}
});