/**
 * @ngdoc directive
 * @name topWindow
 * @module daw
 *
 * @description
 * Directive manage top of the application
 *
 */
daw.directive('topWindow', function($timeout) {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/topWindow.html',

		link: function($scope, element, attrs) {

			// Animation when user launch app
			$timeout(function() {
				angular.element(element[0]).addClass('loaded');
			}, 100);

			// Listen if window in Maximize or not
			win.on('maximize', function(){
	            win.isMaximized = true;
	        });

	        win.on('unmaximize', function(){
	            win.isMaximized = false;
	        });

	        // Control the Top BAR
			$scope.appWindow = {
				
				close : function() {
					win.close();
				},

				minimize : function() {
					win.minimize();
				},

				zoom : function() {
					if(win.isMaximized){
                		win.unmaximize();
					} else {
                		win.maximize();
            		}
				}

			}

		}
	}
});