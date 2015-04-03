'use strict';

daw.service('openSubtitlesService', function($q) {

	var that = this;

	/*
	 * Get Subtitles link from openSubtitles
	 */
	that.get = function(information) {
		var deferred = $q.defer();

		opensubtitles.searchEpisode(information, 'OSTestUserAgent')
			.then(function(result) {
				deferred.resolve(result);
			}).catch(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	};

	/*
	 * Service for download file and put in good folder
	 */
	that.download = function(name, subUrl, path) {

		var deferred = $q.defer();
		var regex = /(.*)\.[^.]+$/;

		var file = fs.createWriteStream(path + pathNode.sep + regex.exec(name)[1] + '.srt');

		http.get({
			host: url.parse(subUrl).host,
			port: 80,
			path: url.parse(subUrl).pathname
		}, function(res) {
			res.on('data', function(data) {
				deferred.resolve(file.write(data));
			}).on('end', function() {
				deferred.reject(file.end());
			});
		});

		return deferred.promise;

	};

});