'use strict';

daw.directive('bottomWindow', function($window, $rootScope) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/bottomWindow.html',

		link: function($scope, element, attrs) {
			$scope.clearAll = function() {
				$rootScope.view = 'drop';
				$rootScope.list = [];
			};
		}
	}
});