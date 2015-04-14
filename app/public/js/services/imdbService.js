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

		var deferred = $q.defer();

		imdb(name, function (err, data) {
			if(!err) {
				deferred.resolve(data);
			} else {
				deferred.reject(err);
			}
		});

		return deferred.promise;
	};

});