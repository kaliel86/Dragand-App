"use strict";

daw.directive('droppable', function() {
	return {
		restrict: 'A',

		link: function($scope, element, attrs) {

			console.log('test');
			// :::: Prevent drag / drop auto opening file issues
			window.ondragover = function(e) {
				e.preventDefault();
				return false;
			};
			window.ondrop = window.ondragover;

			// :::: Drag and drop auto opening file issues
			element.onDragOver = function() {
				this.className = "hover";
				this.innerHTML = "PRESS alt and DROP to open files in VLC"
			}
			element.onDragLeave = function() {
				this.classNAme = "";
				this.innerHTML = "Drop your files here";
			}
			element.ondrop = function(e) {
				e.preventDefault();
				for(var i = 0; i < e.dataTransfer.files.length; i++) {
					var file = e.dataTransfer.files[i].path;
					console.log('file dropped');
				}
			}
		}
	}
});