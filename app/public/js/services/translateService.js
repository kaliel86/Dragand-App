'use strict';

daw.service('translateService', function($translate, configService) {

	var that = this;
	var defaultLanguage = configService.get('defaultLanguage');
	var languages 		= configService.get('languages');

	that.init = function() {
		for(var i in languages) {
			if(languages[i] == navigator.language){
				$translate.use(languages[i]);
			}
		}

		return false;
	};

});