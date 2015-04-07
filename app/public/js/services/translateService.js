'use strict';

/**
 * @ngdoc service
 * @name translateService
 * @requires $translate, configService
 * @module daw
 *
 * @description
 * Service use for the translation of the app
 *
 */
daw.service('translateService', function($translate, configService) {

	var that 		= this;
	var languages 	= configService.get('languages');

	/**
	 * @ngdoc method
	 * @name init
	 *
	 * @description
	 * Check the language of the navigator and if we have this language, use it else we use default language
	 *
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