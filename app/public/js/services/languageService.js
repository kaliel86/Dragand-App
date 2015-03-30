'use strict';

daw.service('languageService', function(configService) {

	var that 			= this;
	var defaultLanguage = configService.get('defaultLanguage');
	var languages 		= configService.get('languages');

	/*
	 * Check if we have language preference user, if not we use default language
	 */
	that.getDefault = function() {

		for(var i in languages) {
			if(languages[i] == navigator.language){
				return languages[i];
			}
		}

		return defaultLanguage;

	};

});