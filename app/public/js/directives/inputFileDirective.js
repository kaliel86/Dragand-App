'use strict';
var pathNode = require('path');
daw.directive('file', function(subtitlesV2Service, $rootScope) {
	return {
		restrict: 'E',
		scope	: {
			text	: '@text',
			multiple: '@multiple'
		},
		template: "<span id='textTypeFile'>{{text}}</span>" +
		"<input id='inputTypeFile' type='file' {{multiple}}>",

		link: function($scope, element, attr, controller) {

			var textTypeFile  = document.querySelector('#textTypeFile');
			var inputTypeFile = document.querySelector('#inputTypeFile');
			var evObj 		  = document.createEvent('MouseEvents');
			

			/*
			 * Trigger click on input type File
			 */
			textTypeFile.addEventListener("click", function() {
				evObj.initEvent('click', true, false);
				inputTypeFile.dispatchEvent(evObj);
			});

			/* 
			 * Paths to files selected
			 */
			inputTypeFile.addEventListener("change", function() {
				// Check if the format of the file is good
				if($scope.$parent.checkExtension(this.value)) {
					var path, name, dir = '';
					path = this.value;

					dir = this.value.split(pathNode.sep);
					name = dir[dir.length-1];
					dir.pop();
					dir = dir.join(pathNode.sep);

					subtitlesV2Service.get(name, path, dir, $rootScope.list.length).then(function() {
						$scope.$parent.count++;
					});

				}

			}, false);

		}
	}
});