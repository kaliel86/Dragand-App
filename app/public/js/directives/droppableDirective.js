"use strict";

daw.directive('droppable', function() {
	return {
		restrict: 'A',

		link: function($scope, element, attrs, DragController) {
			$scope.dragState = 'waiting';

			var el = element[0];

			// :::: Prevent drag / drop auto opening file issues
			window.ondragover = function(e) {
				e.preventDefault();
				return false;
			};

			window.ondrop = window.ondragover;

			el.ondragover = function() {
				this.className = "dragOver";
				$scope.dragState = 'dragOver';
				$scope.$apply();
			}
			el.ondragleave = function() {
				this.className = "";
				$scope.dragState = 'waiting';
				$scope.$apply();
			}

			el.ondrop = function(e) {
				e.preventDefault();

				var data = e.dataTransfer;
				var items = data.items;

				for (var i=0; i<items.length; i++) {
					var entry = {
						path : data.files[i].path,
						name : data.files[i].name,
						item : data.items[i].webkitGetAsEntry(),
						directory : path.dirname(data.files[i].path)
					}

					if (entry.item) {
						$scope.getFilesPath(entry);
					}
				}

				this.className = "";
				$scope.dragState = 'waiting';
				$scope.$apply();
				return false;
			}
			// Greensock animation
			var dropIconTl = new TimelineMax();
			var arrow = document.getElementById('arrow');
			var box = document.getElementById('box');


			dropIconTl
				.set(arrow, {y:'-40vh', opacity :0 }, 0)
				.set(box, {y:'15vh'}, 0)

				.to(arrow, 0.6, {css:{y:0, opacity: 1, scale: 1}, ease: 'ease'})
				.to(box, 0.6, {css:{ y:0, opacity: 1, scaleX: 1}, ease: 'ease'}, -0.3)
		}
	}
});