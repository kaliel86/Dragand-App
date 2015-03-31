'use strict';

daw.directive('bottomWindow', function($window, $rootScope, $state) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/bottomWindow.html',

		link: function($scope, element, attrs) {

			/*
			 * Seed in scope the current state
			 */
			$rootScope.$on('$stateChangeSuccess', function() {
				$scope.currentState = $state.current.name;
			});

			/*
			 * If state home so we clear list, else we go to the home state
			 */
			$scope.homeOrTrash = function() {
				if($scope.currentState === 'home') {
					$rootScope.view = 'drop';
					$rootScope.list = [];
				} else {
					$state.go('home');
				}
			};

		}
	}
});