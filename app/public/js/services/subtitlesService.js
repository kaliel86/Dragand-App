'use strict';

// NPM Required
var opensubtitles = require("popcorn-opensubtitles");

daw.service('subtitlesService', function($q, settingsService) {

	var that = this;

	/*
	 * Common search
	 * 1. OpenSubtitles
	 * 2. SubtitleSeeker
	 */
	that.find = function(imdbId, information, filename) {

		var deferred = $q.defer();

		if(information['series']) { // SERIE
			that.openSubtitles({
				imdbid	: imdbId,
				season	: information['season'],
				episode	: information['episodeNumber'],
				filename: filename
			}).then(function(result) {
				settingsService.get('language').then(function(language){
					deferred.resolve(result[language]['url']);
				});
			}).catch(function(error) {
				deferred.reject(error);
				// TODO Call subtitleSeeker
			});
		} else { // MOVIE
			// TODO Call YifySubtitles
		}

		return deferred.promise;

	};

	/*
	 * Search in OpenSubtitles.org
	 */
	that.openSubtitles = function(information) {

		var deferred = $q.defer();

		console.log('Information Seed at OpenSubtitles.org : ', information);

		opensubtitles.searchEpisode(information, 'OSTestUserAgent')
			.then(function(result) {
				deferred.resolve(result);
			}).catch(function(error) {
				deferred.reject(error);
			});

		return deferred.promise;

	};

	/*
	 * Search in SubtitleSeeker
	 */
	that.subtitleSeeker = function(information) {
		// TODO Wait API KEY
	};

});