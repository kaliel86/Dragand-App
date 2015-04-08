'use strict';

/**
 * @ngdoc service
 * @name subtitlesV2Service
 * @requires $rootScope, $q, fileInfosService, imdbService, settingsService, openSubtitlesService, yifyService, theTvDbService
 * @module daw
 *
 * @description
 * Service manage subtitles download
 *
 */
daw.service('subtitlesV2Service', function($rootScope, $q, fileInfosService, imdbService, settingsService, openSubtitlesService, yifyService, theTvDbService, logService) {

	var that = this;
	var languageSubtitles;

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get information and go works
	 *
	 * @param {string} name 			- File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} path 			- Path of the file (Exemple : Users/desktop/The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} directory 		- Directory where the file drag is
	 * @param {string} idCurrentList 	- Id of the current ID in the list ($rootScope.list)
	 *
	 */
	that.get = function(name, path, directory, idCurrentList) {

		var deferred = $q.defer();

		that.consoleEntry(name, path, directory);

		$rootScope.view = 'list';

		// 0. We display page List
		languageSubtitles = settingsService.get('language');

		// 1. We add item in SCOPE with status loading
		$rootScope.list[idCurrentList] = {
			'status'	: 'loading',
			'filename'	: name,
			'path'		: path
		};

		fileInfosService.parse(name).then(function(result) {

			// 2. Check type and go to the good function
			if(result['series']) {
				that.informationSeries(name, path, directory, result, idCurrentList).then(function() {
					that.getSubtitlesSeries(name, path, directory, result, $rootScope.list[idCurrentList]['imdbId'], idCurrentList).then(function(){
						deferred.resolve();
					});
				});
			} else {
				that.movies(name, path, directory, result, idCurrentList).then(function() {
					deferred.resolve();
				});
			}

		});

		return deferred.promise;

	};

	/**
	 * @ngdoc method
	 * @name movies
	 *
	 * @description
	 * Get the subtitles for a movie in Yify
	 *
	 * @param {string} name 			- File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} path 			- Path of the file (Exemple : Users/desktop/The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} directory 		- Directory where the file drag is
	 * @param {string} fileInfos 		- All infos of the file parse with guessit
	 * @param {int} idCurrentList 		- Id of the current ID in the list ($rootScope.list)
	 *
	 */
	that.movies = function(name, path, directory, fileInfos, idCurrentList) {

		var deferred = $q.defer();

		$rootScope.list[idCurrentList]['type'] = 'movie';
		$rootScope.list[idCurrentList]['name'] = fileInfos['title'];

		imdbService.get(fileInfos['title']).then(function(imdb) {

			$rootScope.list[idCurrentList]['poster'] = imdb['Poster'];
			$rootScope.list[idCurrentList]['imdbId'] = imdb['imdbID'];

			yifyService.get(imdb['imdbID'], languageSubtitles, name, directory).then(function(){

				logService.success('Subtitles found on Yify');

				$rootScope.list[idCurrentList]['status'] = 'done';

				deferred.resolve();

			}).catch(function() {

				logService.error('Subtitles not found on Yify');

				$rootScope.list[idCurrentList]['status'] = 'fail';

				deferred.resolve();

			});

		}).catch(function() {

			logService.error('Movie not found on IMDB');

			$rootScope.list[idCurrentList]['status'] = 'fail';

			deferred.resolve();

		});

		return deferred.promise;
	};

	/**
	 * @ngdoc method
	 * @name informationSeries
	 *
	 * @description
	 * Add in the RootScope.list information of the episode
	 *
	 * @param {string} name 			- File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} path 			- Path of the file (Exemple : Users/desktop/The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} directory 		- Directory where the file drag is
	 * @param {string} fileInfos 		- All infos of the file parse with guessit
	 * @param {int} idCurrentList 		- Id of the current ID in the list ($rootScope.list)
	 *
	 */
	that.informationSeries = function(name, path, directory, fileInfos, idCurrentList) {

		var deferred = $q.defer();

		$rootScope.list[idCurrentList]['type']    = 'series';
		$rootScope.list[idCurrentList]['name']    = fileInfos['series'];
		$rootScope.list[idCurrentList]['episode'] = (fileInfos['episodeNumber'] < 10) ? '0' + fileInfos['episodeNumber'] : fileInfos['episodeNumber'];
		$rootScope.list[idCurrentList]['season']  = (fileInfos['season'] < 10) ? '0' + fileInfos['season'] : fileInfos['season'];

		imdbService.get(fileInfos['series']).then(function(imdb) {

			if(typeof(imdb['Response']) !== 'undefined' && imdb['Response'] === "False") {


				logService.error('Serie not found on IMDB');

				theTvDbService.getImdbIdAndPoster(fileInfos['series']).then(function(result){

					logService.success('Serie found on TheTvDB');

					$rootScope.list[idCurrentList]['poster'] = (result['Poster']) ? result['Poster'] : null;
					$rootScope.list[idCurrentList]['imdbId'] = (result['IMDB_ID']) ? result['IMDB_ID'] : null;

					deferred.resolve();

				});

			} else {

				logService.success('Serie found on IMDB');

				$rootScope.list[idCurrentList]['poster'] = imdb['Poster'];
				$rootScope.list[idCurrentList]['imdbId'] = imdb['imdbID'];

				deferred.resolve();

			}

		});

		return deferred.promise;

	};

	/**
	 * @ngdoc method
	 * @name getSubtitlesSeries
	 *
	 * @description
	 * Get on OpenSubtitles and download the subtitle
	 *
	 * @param {string} name 			- File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} path 			- Path of the file (Exemple : Users/desktop/The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} directory 		- Directory where the file drag is
	 * @param {string} fileInfos 		- All infos of the file parse with guessit
	 * @param {int} imdbId				- Id of the IMDB
	 * @param {int} idCurrentList 		- Id of the current ID in the list ($rootScope.list)
	 *
	 */
	that.getSubtitlesSeries = function(name, path, directory, fileInfos, imdbId, idCurrentList) {

		var deferred = $q.defer();

		openSubtitlesService.get(imdbId, fileInfos['season'], fileInfos['episodeNumber'], name, languageSubtitles, directory).then(function() {

			logService.success('Subtitles found on OpenSubtitles');

			// 5. After download change the status to 'done'
			$rootScope.list[idCurrentList]['status'] = 'done';

			deferred.resolve();

		}).catch(function(){

			logService.error('Subtitles not found on OpenSubtitles');

			// 5. After download change the status to 'done'
			$rootScope.list[idCurrentList]['status'] = 'fail';

			deferred.resolve();

		});

		return deferred.promise;

	};

	/**
	 * @ngdoc method
	 * @name consoleEntry
	 *
	 * @description
	 * Console Entry parameters
	 *
	 * @param {string} name 			- File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} path 			- Path of the file (Exemple : Users/desktop/The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} directory 		- Directory where the file drag is
	 *
	 */
	that.consoleEntry = function(name, path, directory) {

		logService.info('Name : '+ name);
		logService.info('Path : '+ path);
		logService.info('Directory : '+ directory);

	};

});