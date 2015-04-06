'use strict';

daw.controller('DragController', function($document, $window, $q, $scope, $rootScope, $filter, config, playerService, notificationService, subtitlesV2Service) {

	$rootScope.view = 'drop';
	$rootScope.list = [];

	$scope.count = 0;

	/*
	 * Return path of file or files in the first folder
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
	 * Remove item in list
	 */
	$scope.removeItem = function(array, index) {
		array.splice(index, 1);
		if(array.length < 1) {
			$rootScope.view = 'drop';
		}
	};

	/*
	 * Show item to imdb
	 */
	$scope.goToImdb = function(imdbId) {
		if(imdbId){
			open('http://www.imdb.com/showtimes/title/'+imdbId);
		}
	};

	/*
	 * Play movie/series with player in preferences
	 */
	$scope.play = function(path) {
		playerService.play(path);
	};

	/*
	 * Seed notification when all movies/series are done
	 */
	$scope.$watch('count', function() {
		if($rootScope.list.length === $scope.count && $rootScope.list.length > 0) {
			notificationService.create($filter('translate')('NOTIFICATION.SUB_DONE.TITLE'), $filter('translate')('NOTIFICATION.SUB_DONE.CONTENT'));
		}
	});

});
