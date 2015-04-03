'use strict';

daw.filter('cut', function($filter) {

	return function(input, limit) {
		if (! input) return;
		if (input.length <= limit) {
			return input;
		}

		return $filter('limitTo')(input, limit) + '...';
	};

});