'use strict';

daw.directive('open', function() {

	return {
		restrict: 'A',
		link: function($scope, element, attr) {

			/*
			 * Add Cursor Pointer
			 */
			element.css('cursor', 'pointer');

			/*
			 * When user click on it, check value and open navigator
			 */
			element.bind('click', function(event) {

				var value = this.innerHTML;

				if(value.indexOf('@') === 0) {
					open('https://twitter.com/'+value);
				} else {
					open('http://'+value);
				}

			});
		}
	}

});