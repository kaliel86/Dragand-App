'use strict';

daw.directive('file', function() {
	return {
		restrict: 'E',
		scope	: {
			text	: '@text',
			multiple: '@multiple'
		},
		template: "<span id='textTypeFile'>{{text}}</span>" +
		"<input id='inputTypeFile' type='file' {{multiple}}>",

		link: function($scope, element, attr) {

			var inputTypeFile = document.getElementById('inputTypeFile');

			/*
			 * Trigger click on input type File
			 */
			angular.element(document.querySelector('#textTypeFile')).on('click', function() {

				var evObj = document.createEvent('MouseEvents');
				evObj.initEvent('click', true, false);
				inputTypeFile.dispatchEvent(evObj);

			});

			/*
			 * Paths to files selected
			 */
			inputTypeFile.addEventListener("change", function() {
				console.log(this.value);
			}, false);

		}
	}
});