'use strict';

daw.controller('DragController',  function($document, $window, $q, $scope, config) {
	// :::: Return path of file or files in the first folder
	$scope.getFilesPath = function(entry, elPath, firstDirectoryChecked) {
		elPath = elPath || "";

		var item = entry.item;
		if (item.isFile && $scope.checkExtension(entry.name)) {
			console.log("------------- IS FILE -------------");
			item.file(function(file) {
				console.log("Name: " +  entry.name);
				console.log("File Path: " +  entry.path);
				console.log("Directory Path: " +  entry.directory);
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
					}

					$scope.getFilesPath(fileEntry, elPath + item.name + "/", true);
				}
			});
		}
	}
	
	// Check extension file
	$scope.checkExtension = function(filename){
		var ext = filename.substr(filename.lastIndexOf('.') + 1);

		// Check if ext is in the const array of the ext list
		if(config.acceptedFile.indexOf(ext) > -1) {
			return true;
		} else {
			return false;
		}

		return false;
	}

});
