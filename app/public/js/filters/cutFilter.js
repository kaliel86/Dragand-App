'use strict';

/**
 * @ngdoc filter
 * @name cut
 * @requires $filter
 * @module daw
 *
 * @description
 * Filter use for generate ... if length of the file is too long
 *
 */
daw.filter('cut', function($filter) {
	return function(input, limit) {
		if (! input) return;
		if (input.length <= limit) {
			return input;
		}

		return $filter('limitTo')(input, limit) + '...';
	};
});