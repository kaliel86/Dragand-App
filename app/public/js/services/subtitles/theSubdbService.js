'use strict';

/**
 * @ngdoc service
 * @name theSubdbService
 * @requires $q
 * @module daw
 *
 * @description
 * Service use for manipulate TheSubDB API
 *
 */
daw.service('theSubdbService', function($q) {

	var that = this;

	var subdb = new SubDb();

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from opensubtitles.org
	 * Download a subtitle, if the file is a zip we unzip it and rename the file for VLC
	 *
	 * @param {string} path  	 - Path of the file (Exemple : Users/desktop/The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} filename  - Path of the subtitle (Exemple : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} directory - Path to the directory where the file drag is
	 * @param {string} language  - Wanted language
	 *
	 */
	that.get = function(path, directory, filename, language) {

		var deferred 	= $q.defer();
		var regex 		= /(.*)\.[^.]+$/;

		subdb.computeHash(path, function(err, res) {

			if(err) {
				deferred.reject();
			}

			var hash = res;
			subdb.api.search_subtitles(hash, function(err, res){

				if(err) {
					deferred.reject();
				}

				subdb.api.download_subtitle(hash, language, directory + pathNode.sep + regex.exec(filename)[1]+'.srt', function(err, res) {

					if(err || !res) {
						deferred.reject();
					} else {
						deferred.resolve();
					}

				});

			});
		});

		return deferred.promise;

	};

});