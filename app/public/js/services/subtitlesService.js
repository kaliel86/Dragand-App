'use strict';

daw.service('subtitlesService', function($q, settingsService, yifyService, openSubtitlesService) {

	var that = this;

	/*
	 * Common search
	 * 1. OpenSubtitles
	 */
	that.find = function(imdbId, information, filename) {

		var deferred = $q.defer();
		var language = settingsService.get('language');

		if(information['series']) { // SERIE

			openSubtitlesService.get({
				imdbid	: imdbId,
				season	: information['season'],
				episode	: information['episodeNumber'],
				filename: filename
			}).then(function(result) {

				if(result && typeof(result[language]) !== 'undefined'){
					deferred.resolve(result[language]['url']);
				} else {
					deferred.reject();
				}
				
			}).catch(function() {
				deferred.reject();
			});

		} else { // MOVIE

			yifyService.get(imdbId, language).then(function(url){
				deferred.resolve(url);
			}).catch(function() {
				deferred.reject();
			});

		}

		return deferred.promise;

	};

});