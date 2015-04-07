'use strict';

/**
 * @ngdoc service
 * @name fileInfosService
 * @requires $q
 * @module daw
 *
 * @description
 * Service for manage Guissit API
 *
 */
daw.service('fileInfosService', function($q) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name parse
	 *
	 * @description
	 * Parse the name file and return information in object
	 *
	 * SERIE :
	 *
	 * @return string 	type (episode)
	 * @return string 	series (The originals)
	 * @return int 		episodeNumber (15)
	 * @return int 		season (2)
	 * @return string 	format (HTDV)
	 * @return string 	releaseGroup (LOL)
	 *
	 * MOVIE :
	 *
	 * @return string	type (movie)
	 * @return string	title (The Equalizer)
	 * @return int		years (2014)
	 *
	 */
	that.parse = function(path) {

		var deferred = $q.defer();

		guessit.parseName(path, true).then(function (data) {
			deferred.resolve(data);
		});

		return deferred.promise;
	};

});