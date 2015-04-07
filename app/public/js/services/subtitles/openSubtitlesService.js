'use strict';

/**
 * @ngdoc service
 * @name openSubtitlesService
 * @requires $q
 * @module daw
 *
 * @description
 * Service use for manipulate OpenSubtitles API
 *
 */
daw.service('openSubtitlesService', function($q) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from opensubtitles.org
	 *
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

	/**
	 * @ngdoc method
	 * @name download
	 *
	 * @description
	 * Download a subtitle, if the file is a zip we unzip it and rename the file for VLC
	 *
	 * @param {string} filename  - File name (Exemple : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} url 		 - URL of the subtitle (Exemple : http://google.com/flash.srt)
	 * @param {string} directory - Path to the directory where the file drag is
	 *
	 * @returns {Promise}
	 *
	 */
	that.download = function (filename, url, directory) {

		var deferred 	= $q.defer();
		var regex 		= /(.*)\.[^.]+$/;

		new download({mode: '755', extract: true})
			.get(url)
			.dest(directory)
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