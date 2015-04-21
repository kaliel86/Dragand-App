/**
 * @ngdoc service
 * @name imdbService
 * @requires $q
 * @module daw
 *
 * @description
 * Service for manage imdb API
 *
 */
daw.service('imdbService', function($q) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get IMDB Informations
	 *
	 * @param {string} name - Name of the movie/series (Example : The flash)
	 *
	 */
	that.get = function(name) {

		return $q(function(resolve, reject) {
			imdb(name, function (err, data) {
				if(!err) {
					resolve(data);
				} else {
					reject(err);
				}
			});
		});

	};

});