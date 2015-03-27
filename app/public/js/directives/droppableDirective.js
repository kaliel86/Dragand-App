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
				for(var i = 0; i < e.dataTransfer.files.length; i++) {
					var file = e.dataTransfer.files[i].path;
					console.log(path.dirname(file));
					console.log('file dropped');
				}

				this.className = "";
				this.innerHTML = "Drop your files here";
				return false;
			}
		}
	}
});