'use strict';

daw.directive('topWindow', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/topWindow.html',

		link: function($scope, element, attrs) {
			$timeout(function() {
				angular.element(element[0]).addClass('loaded');
			}, 100);


			$scope.win = gui.Window.get();
			$scope.appWindow = {
				close : function() {
					$scope.win.close();
				},

				minimize : function() {
					$scope.win.minimize();
				},

				zoom : function() {
					$scope.win.show();
					$scope.win.maximize();
				}
			}
		}
	}
});