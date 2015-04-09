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
	 * string 	type (episode)
	 * string 	series (The originals)
	 * int 		episodeNumber (15)
	 * int 		season (2)
	 * string 	format (HTDV)
	 * string 	releaseGroup (LOL)
	 *
	 * MOVIE :
	 *
	 * string	type (movie)
	 * string	title (The Equalizer)
	 * int		years (2014)
	 *
	 */
	that.parse = function(path) {

		var deferred = $q.defer();

		guessit.parseName(path, true).then(function (data) {
			deferred.resolve(data);
		}).catch(function(){
			deferred.reject();
		});

		return deferred.promise;
	};

});