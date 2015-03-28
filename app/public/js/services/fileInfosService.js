'use strict';

daw.service('fileInfosService', function() {

	var that = this;
	var m;
	var regex =  {
		show  : /(.*?)\.S?(\d{1,2})E?(\d{2})\.(.*)/,
		movie : /(.*?)\((\d{4})\)(.*)/
	};

	/*
	 * Parse the name file and return information in object
	 */
	that.parse = function(path) {
		if((m = regex.show.exec(path)) !== null){
			return {
				name	: m[1],
				season	: m[2],
				episode	: m[3]
			};
		}
	};

});