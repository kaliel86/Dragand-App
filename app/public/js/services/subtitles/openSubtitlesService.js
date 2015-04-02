'use strict';

daw.service('openSubtitlesService', function($q) {

	var that = this;

	/*
	 * Get Subtitles link from openSubtitles
	 */
	that.get = function(information) {
		var deferred = $q.defer();

		console.log('Information Seed at OpenSubtitles.org : ', information);

		opensubtitles.searchEpisode(information, 'OSTestUserAgent')
			.then(function(result) {
				deferred.resolve(result);
			}).catch(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;
	}

});