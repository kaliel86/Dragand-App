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
daw.service('subtitlesV2Service', function($rootScope, $q, $filter, fileInfosService, imdbService, settingsService, openSubtitlesService, yifyService, theTvDbService, theSubdbService, logService, theTvSubsService, addic7edService) {

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

		that.consoleEntry(name, path, directory);

		return $q(function(resolve, reject) {

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
							resolve();
						}).catch(function(){
							reject();
						});
					});
				} else {
					that.movies(name, path, directory, result, idCurrentList).then(function() {
						resolve();
					});
				}

			});

		});

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

		$rootScope.list[idCurrentList]['type'] = 'movie';
		$rootScope.list[idCurrentList]['name'] = fileInfos['title'];

		return $q(function(resolve) {

			imdbService.get(fileInfos['title']).then(function(imdb) {

				$rootScope.list[idCurrentList]['poster'] = imdb['Poster'];
				$rootScope.list[idCurrentList]['imdbId'] = imdb['imdbID'];

				yifyService.get(imdb['imdbID'], languageSubtitles, name, directory).then(function(){

					logService.success('Subtitles found on Yify');

					$rootScope.list[idCurrentList]['status'] = 'done';
					$rootScope.list[idCurrentList]['api'] 	 = 'Yify';

					resolve();

				}).catch(function() {

					logService.error('Subtitles not found on Yify');

					$rootScope.list[idCurrentList]['status'] = 'fail';

					resolve();

				});

			}).catch(function() {

				logService.error('Movie not found on IMDB');

				$rootScope.list[idCurrentList]['status'] = 'fail';

				resolve();

			});

		});

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

		$rootScope.list[idCurrentList]['type']    = 'series';
		$rootScope.list[idCurrentList]['name']    = fileInfos['series'];
		$rootScope.list[idCurrentList]['episode'] = $filter('number')(fileInfos['episodeNumber']);
		$rootScope.list[idCurrentList]['season']  = $filter('number')(fileInfos['season']);

		return $q(function(resolve) {

			imdbService.get(fileInfos['series']).then(function(imdb) {

				if(typeof(imdb['Response']) !== 'undefined' && imdb['Response'] === "False") {

					logService.error('Serie not found on IMDB');

					theTvDbService.getImdbIdAndPoster(fileInfos['series']).then(function(result){

						logService.success('Serie found on TheTvDB');

						$rootScope.list[idCurrentList]['poster'] = (result['Poster']) ? result['Poster'] : null;
						$rootScope.list[idCurrentList]['imdbId'] = (result['IMDB_ID']) ? result['IMDB_ID'] : null;

						resolve();

					});

				} else {

					logService.success('Serie found on IMDB');

					$rootScope.list[idCurrentList]['poster'] = imdb['Poster'];
					$rootScope.list[idCurrentList]['imdbId'] = imdb['imdbID'];

					resolve();

				}

			});

		});

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

		return $q(function(resolve, reject) {

			openSubtitlesService.get(imdbId, fileInfos['season'], fileInfos['episodeNumber'], name, languageSubtitles, directory).then(function() {

				logService.success('Subtitles found on OpenSubtitles');

				// 5. After download change the status to 'done'
				$rootScope.list[idCurrentList]['status'] = 'done';
				$rootScope.list[idCurrentList]['api'] 	 = 'OpenSubtitles';

				resolve();

			}).catch(function(){

				logService.error('Subtitles not found on OpenSubtitles');

				theSubdbService.get(path, directory, name, languageSubtitles).then(function(){

					logService.success('Subtitles found on TheSubDB');

					$rootScope.list[idCurrentList]['status'] = 'done';
					$rootScope.list[idCurrentList]['api'] 	 = 'TheSubDB';

					resolve();

				}).catch(function(){

					logService.error('Subtitles not found on TheSubDB');

					theTvSubsService.get(name, fileInfos['series'], fileInfos['episodeNumber'], fileInfos['season'], languageSubtitles, fileInfos['releaseGroup'], directory).then(function() {

						logService.success('Subtitles found on TheTvSubs');

						$rootScope.list[idCurrentList]['status'] = 'done';
						$rootScope.list[idCurrentList]['api'] 	 = 'TheTvSubs';

						resolve();

					}).catch(function() {

						logService.error('Subtitles not found on TheTvSubs');

						addic7edService.get(fileInfos['series'], languageSubtitles, fileInfos['season'], fileInfos['episodeNumber'], fileInfos['releaseGroup'], name, directory).then(function(){

							logService.success('Subtitles found on Addic7ed');

							$rootScope.list[idCurrentList]['status'] = 'done';
							$rootScope.list[idCurrentList]['api'] 	 = 'Addic7ed';

							resolve();

						}).catch(function(){

							logService.error('Subtitles not found on Addic7ed');

							$rootScope.list[idCurrentList]['status'] = 'fail';

							reject();

						});

					});

				});

			});
		});

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