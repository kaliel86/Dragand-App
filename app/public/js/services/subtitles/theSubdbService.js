'use strict';

daw.service('theSubdbService', function($q) {

	var that = this;

	var subdb = new SubDb();

	/*
	 * Get Subtitles from TheSubdb, download it and rename it
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