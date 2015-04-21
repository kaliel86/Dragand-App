/**
 * @ngdoc directive
 * @name bottomWindow
 * @requires $window, $rootScope, $state, $timeout
 * @module daw
 *
 * @description
 * Directive manage menu of the application
 *
 */
daw.directive('bottomWindow', function($window, $rootScope, $state, $timeout) {
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
					var tabLength = $rootScope.list.length;
					$rootScope.list = [];

					$timeout(function(){
						$rootScope.view = 'drop';
					},0.25*tabLength*1000)

				} else {
					$state.go('home');
				}
			};

		}
	}
});