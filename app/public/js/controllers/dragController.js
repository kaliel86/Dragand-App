'use strict';

daw.controller('DragController',  function($document, $window, $q, $scope, config, fileInfosService, imdbService, subtitlesService) {

	$scope.view = 'drop';
	$scope.list = [];

	/*
	 * Return path of file or files in the first folder
	 */
	$scope.getFilesPath = function(entry, elPath, firstDirectoryChecked) {

		elPath = elPath || "";

		var item = entry.item;

		if (item.isFile && $scope.checkExtension(entry.name)) {

			console.log("------------- IS FILE -------------");
			item.file(function() {
				$scope.getSubtitles(entry.name, entry.path, entry.directory);
			});

		} else if (item.isDirectory && !firstDirectoryChecked) {

			console.log("------------- IS DIRECTORY -------------");
			// Get folder contents
			var dirReader = item.createReader();

			dirReader.readEntries(function(entries) {
				for (var i=0; i < entries.length; i++) {

					var fileEntry = {
						path : entry.path + path.sep + entries[i].name,
						name : entries[i].name,
						item : entries[i],
						directory : entry.path
					};

					$scope.getFilesPath(fileEntry, elPath + item.name + "/", true);
				}
			});

		}

	};
	
	/*
	 * Check Extension file from config
	 */
	$scope.checkExtension = function(filename){

		var ext = filename.substr(filename.lastIndexOf('.') + 1);

		// Check if ext is in the const array of the ext list
		if(config.acceptedFile.indexOf(ext) > -1) {
			return true;
		} else {
			return false;
		}

	};

	/*
	 * Get Subtitles and add it to the scope
	 */
	$scope.getSubtitles = function(name, path, directory) {

		// 0. We display page List
		$scope.view = 'list';

		// 1. We add item in SCOPE with status loading
		$scope.list[name] = {
			'status': 'loading'
		};

		fileInfosService.parse(name).then(function(result) {

			// 2. We add the name
			if(result['series']) {
				$scope.list[name]['type'] 	 = 'series';
				$scope.list[name]['name'] 	 = result['series'];
				$scope.list[name]['episode'] = result['episodeNumber'];
				$scope.list[name]['season']  = result['season'];
			} else {
				$scope.list[name]['type'] = 'movie';
				$scope.list[name]['name'] = result['title'];
			}

			imdbService.get((result['series']) ? result['series'] : result['title']).then(function(imdb) {

				// 3. We add the Poster
				$scope.list[name]['poster'] = imdb['Poster'];

				subtitlesService.find(imdb['imdbID'], result, name).then(function(url) {

					// 4. We add URL
					$scope.list[name]['url'] = url;

					if(url) {

						console.log('Subtitles finded : ', name);

						subtitlesService.download(name, url, directory).then(function(data){

							// 5. After download change the status to 'done'
							$scope.list[name]['status'] = 'done';

						});

					} else {

						console.log('Subtitles not find : ', name);

						// 5. No url so we change the status to 'fail'
						$scope.list[name]['status'] = 'fail';

					}

				}).catch(function() {

					// 4. Fail so we change the status to 'fail'
					$scope.list[name]['status'] = 'fail';

				});

			});

		});
	};


});
