'use strict';

daw.service('translateService', function($translate, configService) {

	var that 		= this;
	var languages 	= configService.get('languages');

	/*
	 * Search the language navigator, if we have this language available we use it
	 */
	that.init = function() {

		for(var i in languages) {
			if(languages[i] == navigator.language){
				$translate.use(languages[i]);
			}
		}

		return false;

	};

});