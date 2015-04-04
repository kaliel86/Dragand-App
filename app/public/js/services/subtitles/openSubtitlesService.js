'use strict';

daw.service('openSubtitlesService', function($q) {

	var that = this;

	/*
	 * Get Subtitles link from openSubtitles
	 */
	that.get = function(imdbId, season, episode, filename, language, directory) {

		var deferred = $q.defer();

		opensubtitles.searchEpisode({
			imdbid	: imdbId,
			season	: season,
			episode	: episode,
			filename: filename
		}, 'OSTestUserAgent')
			.then(function(url) {

				if(url && typeof(url[language]) != 'undefined') {
					that.download(filename, url[language].url, directory).then(function() {
						deferred.resolve();
					}).catch(function() {
						deferred.reject();
					});
				} else {
					deferred.reject();
				}

			}).catch(function() {
				deferred.reject();
			});

		return deferred.promise;
	};

	/*
	 * Download and  rename file !
	 */
	that.download = function (filename, url, path) {

		var deferred 	= $q.defer();
		var regex 		= /(.*)\.[^.]+$/;

		new download({mode: '755', extract: true})
			.get(url)
			.dest(path)
			.rename(regex.exec(filename)[1] + '.srt')
			.run(function (err, files) {
				if(err !== 'null') {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			});

		return deferred.promise;
	};

});