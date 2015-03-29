'use strict';

daw.directive('bottomWindow', function($window) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/bottomWindow.html',

		link: function($scope, element, attrs) {

		}
	}
});