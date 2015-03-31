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
				console.log(this.value);
			}, false);

		}
	}
});