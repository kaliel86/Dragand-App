/**
 * @ngdoc filter
 * @name number
 * @requires $filter
 * @module daw
 *
 * @description
 * Add a 0 if number is < to 9
 *
 */
daw.filter('number', function() {
	return function(input) {

		if(input < 10) {
			return '0'+input;
		} else {
			return input;
		}

	};
});