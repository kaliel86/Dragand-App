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
daw.service('translateService', function($translate, settingsService) {

	var that 		= this;
	var languageUse = settingsService.get('appLanguage');

	/**
	 * @ngdoc method
	 * @name init
	 *
	 * @description
	 * Check the language of the navigator and if we have this language, use it else we use default language
	 *
	 */
	that.init = function() {
		$translate.use(languageUse);
	};

});