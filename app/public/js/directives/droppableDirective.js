"use strict";

daw.directive('droppable', function() {
	return {
		restrict: 'A',

		link: function($scope, element, attrs) {
			console.log('element :: ', element);

			var el = element[0];

			// :::: Prevent drag / drop auto opening file issues
			window.ondragover = function(e) {
				e.preventDefault();
				return false;
			};

			window.ondrop = window.ondragover;

			el.ondragover = function() {
				this.className = "hover";
				this.innerHTML = "PRESS alt and DROP to open files in VLC"
			}
			el.ondragleave = function() {
				this.className = "";
				this.innerHTML = "Drop your files here";
			}

			el.ondrop = function(e) {
				e.preventDefault();

				var data = e.dataTransfer;
				var items = data.items;

				for (var i=0; i<items.length; i++) {
					// webkitGetAsEntry is where the magic happens
					var entry = {
						path : data.files[i].path,
						name : data.files[i].name,
						item : data.items[i].webkitGetAsEntry(),
						directory : path.dirname(data.files[i].path)
					}

					if (entry.item) {
						traverseFileTree(entry);
					}
				}

				this.className = "";
				this.innerHTML = "Drop your files here";
				return false;
			}


			// :::: Searching files in folders
			function traverseFileTree(entry, path) {
				path = path || "";

				var item = entry.item;

				console.log(entry);
				console.log(item.isFile);

				if (item.isFile) {
					item.file(function(file) {
						console.log("File: " +  entry.path);
						console.log("Directory: " +  entry.directory);
					});
				} else if (item.isDirectory) {
					// Get folder contents
					var dirReader = item.createReader();
					dirReader.readEntries(function(entries) {
						for (var i=0; i<entries.length; i++) {
							traverseFileTree(entries[i], path + item.name + "/");
						}
					});
				}
			}

		}
	}
});