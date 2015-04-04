'use strict';

daw.service('subtitlesV2Service', function($rootScope, $q, fileInfosService, imdbService, settingsService, theSubdbService, openSubtitlesService, yifyService) {

	var that = this;
	var idCurrentList;
	var languageSubtitles;

	/*
	 * Get information and go works
	 *
	 * @param string name (FileName)
	 * @param string path (Path with fileName)
	 * @param string directory (Directory where the file is)
	 */
	that.get = function(name, path, directory) {

		that.consoleEntry(name, path, directory);

		$rootScope.view = 'list';

		// 0. We display page List
		idCurrentList 		= $rootScope.list.length;
		languageSubtitles 	= settingsService.get('language');

		// 1. We add item in SCOPE with status loading
		$rootScope.list[idCurrentList] = {
			'status': 'loading'
		};

		fileInfosService.parse(name).then(function(result) {

			// 2. Check type and go to the good function
			if (result['series']) {
				that.series(name, path, directory, result);
			} else {
				that.movies(name, path, directory, result);
			}

		});

	};

	/*
	 *
	 */
	that.movies = function(name, path, directory, fileInfos) {

		$rootScope.list[idCurrentList]['type'] = 'movie';
		$rootScope.list[idCurrentList]['name'] = fileInfos['title'];

		imdbService.get(fileInfos['title']).then(function(imdb) {

			$rootScope.list[idCurrentList]['poster'] = imdb['Poster'];
			$rootScope.list[idCurrentList]['imdbId'] = imdb['imdbID'];

			yifyService.get(imdb['imdbID'], languageSubtitles, name, directory).then(function(){

				console.log('Subtitles found on Yify');

				$rootScope.list[idCurrentList]['status'] = 'done';

			}).catch(function() {

				$rootScope.list[idCurrentList]['status'] = 'fail';

			});

		}).catch(function() {

			$rootScope.list[id]['status'] = 'fail';

		});
	};

	/*
	 *
	 */
	that.series = function(name, path, directory, fileInfos) {

		$rootScope.list[idCurrentList]['type']    = 'series';
		$rootScope.list[idCurrentList]['name']    = fileInfos['series'];
		$rootScope.list[idCurrentList]['episode'] = (fileInfos['episodeNumber'] < 10) ? '0' + fileInfos['episodeNumber'] : fileInfos['episodeNumber'];
		$rootScope.list[idCurrentList]['season']  = (fileInfos['season'] < 10) ? '0' + fileInfos['season'] : fileInfos['season'];

		imdbService.get(fileInfos['series']).then(function(imdb) {

			$rootScope.list[idCurrentList]['poster'] = imdb['Poster'];
			$rootScope.list[idCurrentList]['imdbId'] = imdb['imdbID'];

			if (typeof(imdb['imdbID']) !== 'undefined') {

				openSubtitlesService.get(imdb['imdbID'], fileInfos['season'], fileInfos['episodeNumber'], name, languageSubtitles, directory).then(function() {

					console.log('Subtitles found on OpenSubtitles');

					// 5. After download change the status to 'done'
					$rootScope.list[idCurrentList]['status'] = 'done';

				}).catch(function() {

					theSubdbService.get(path, directory, name, languageSubtitles).then(function() {

						console.log('Subtitles found on TheSubDB');

						// 5. After download change the status to 'done'
						$rootScope.list[idCurrentList]['status'] = 'done';

					}).catch(function(){

						// 5. After download change the status to 'done'
						$rootScope.list[idCurrentList]['status'] = 'fail';

					});

				});

			} else { // We can not use First API because we haven't IMDBID SO we use second API

				theSubdbService.get(path, directory, name, languageSubtitles).then(function() {

					console.log('Subtitles found on TheSubDB');

					// 5. After download change the status to 'done'
					$rootScope.list[idCurrentList]['status'] = 'done';

				}).catch(function(){

					// 5. After download change the status to 'done'
					$rootScope.list[id]['status'] = 'fail';

				});

			}

		});

	};

	/*
	 * Console Entry parameters
	 */
	that.consoleEntry = function(name, path, directory) {

		console.log('Name : ', name);
		console.log('Path : ', path);
		console.log('Directory : ', directory);

	};

});