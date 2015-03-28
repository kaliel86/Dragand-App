'use strict';

// NPM Required
var imdb = require('node-movie');

daw.service('imdbService', function($q) {

	var that = this;

	/*
	 * Get IMDB Informations
	 *
	 * @return object imdbID
	 * @return object poster
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