'use strict';

/**
 * @ngdoc controller
 * @name DragController
 * @requires $document, $window, $q, $scope, $rootScope, $filter, config, playerService, notificationService, subtitlesV2Service
 * @module daw
 *
 * @description
 * Controller use for the view home
 *
 */
daw.controller('DragController', function($document, $window, $q, $scope, $rootScope, $filter, config, playerService, notificationService, subtitlesV2Service) {

	$rootScope.view = 'drop';
	$rootScope.list = [];
	$scope.count 	= 0;

	/**
	 * @ngdoc method
	 * @name getFilesPath
	 *
	 * @description
	 * Return path of file or files in the first folder
	 *
	 * @param {string} entry - EntryPath
	 * @param {string} elPath - Elpath
	 * @param {int} firstDirectoryChecked -- Directory
	 *
	 */
	$scope.getFilesPath = function(entry, elPath, firstDirectoryChecked) {

		elPath = elPath || "";

		var item = entry.item;

		if (item.isFile && $scope.checkExtension(entry.name)) {

			console.log("------------- IS FILE -------------");
			item.file(function() {
				subtitlesV2Service.get(entry.name, entry.path, entry.directory, $rootScope.list.length).then(function() {
					$scope.count++;
				});
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

	/**
	 * @ngdoc method
	 * @name checkExtension
	 *
	 * @description
	 * Check Extension file from config
	 *
	 * @param {bool} true | false
	 *
	 */
	$scope.checkExtension = function(filename){

		var ext = filename.substr(filename.lastIndexOf('.') + 1);

		// Check if ext is in the const array of the ext list
		if(config.acceptedFile.indexOf(ext) > -1) {
			return true;
		}

		return false;

	};

	/**
	 * @ngdoc method
	 * @name removeItem
	 *
	 * @description
	 * Remove item in list
	 *
	 * @param {array} array - List $rootScope.list
	 * @param {int} index - Id of the index to delete
	 *
	 */
	$scope.removeItem = function(array, index) {
		array.splice(index, 1);
		if(array.length < 1) {
			$rootScope.view = 'drop';
		}
	};

	/**
	 * @ngdoc method
	 * @name goToImdb
	 *
	 * @description
	 * Show item to imdb
	 *
	 * @param {int} imdbId - ID from imdbID (Example : tt453233)
	 *
	 */
	$scope.goToImdb = function(imdbId) {
		if(imdbId){
			open('http://www.imdb.com/showtimes/title/'+imdbId);
		}
	};

	/**
	 * @ngdoc method
	 * @name play
	 *
	 * @description
	 * Play movie/series with player in preferences
	 *
	 * @param {string} path - Path of the file drag
	 *
	 */
	$scope.play = function(path) {
		playerService.play(path);
	};

	/**
	 * @ngdoc method
	 *
	 * @description
	 * Seed notification when all movies/series drop are done
	 *
	 */
	$scope.$watch('count', function() {
		if($rootScope.list.length === $scope.count && $rootScope.list.length > 0) {
			notificationService.create($filter('translate')('NOTIFICATION.SUB_DONE.TITLE'), $filter('translate')('NOTIFICATION.SUB_DONE.CONTENT'));
		}
	});

});