/**
 * @ngdoc directive
 * @name droppable
 * @requires $rootScope
 * @module daw
 *
 * @description
 * Directive manage drag zone
 *
 */
daw.directive('droppable', function($rootScope) {
	return {
		restrict: 'A',

		link: function($scope, element, attrs, DragController) {

			$rootScope.pressAlt = false;
			$scope.dragState    = 'waiting';

			var el 		 = element[0].getElementsByClassName('dropZone')[0];
			var dropZone = document.getElementById('drop');

			window.onkeydown = function(e) {
				if(e.keyCode === 18){
					$rootScope.pressAlt = true;
				}
			};
			
			el.ondragover = function(e) {
				e.preventDefault();
				if(attrs['droppable'] == 'drop'){
					dropZone.className = "dragOver";
					$scope.dragState   = 'dragOver';
					$rootScope.view    = 'drop';
				} else {
					$rootScope.view = 'list';
				}
				$scope.$apply();
			};

			el.ondragleave = function() {
				if(attrs['droppable'] =='drop'){
					dropZone.className  = "";
					$scope.dragState 	= 'waiting';
				}
				$scope.$apply();
			};

			el.ondrop = function(e) {
				e.preventDefault();

				var data  = e.dataTransfer;
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

				el.ondragleave();
				return false;
			};

			// Greensock animation
			var dropIconTl  = new TimelineMax();
			var arrow 		= document.getElementById('arrow');
			var box 		= document.getElementById('box');


			dropIconTl
				.set(arrow, {y:'-40vh', opacity :0 }, 0)
				.set(box, {y:'15vh'}, 0)
				.to(arrow, 0.6, {css:{y:0, opacity: 1, scale: 1}, ease: 'ease'})
				.to(box, 0.6, {css:{ y:0, opacity: 1, scaleX: 1}, ease: 'ease'}, -0.3)
		}
	}
});