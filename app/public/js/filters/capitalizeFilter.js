'use strict';

/**
 * @ngdoc filter
 * @name capitalize
 * @module daw
 *
 * @description
 * Capitalize a text
 *
 */
daw.filter('capitalize', function() {
	return function (string){
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
});