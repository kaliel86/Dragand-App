'use strict';

/**
 * @ngdoc service
 * @name rulesService
 * @requires settingsService
 * @module daw
 *
 * @description
 * Check if user accept the Rules before use the app
 *
 */
daw.service('rulesService', function($rootScope, $state, settingsService, logService, configService) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name check
	 *
	 * @description
	 * Check if user accept the rules
	 *
	 */
	that.check = function() {

		if(configService.get('rules')){
			$rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

				var requireRules = toState['requireRules'];
				var userAccepted = settingsService.get('rules');

				if(requireRules && userAccepted == 'notAccepted') {
					logService.alert('You must be accept the rules for acces to this pages');
					// TODO Show pages or modal with rules and user must be Accepted
				}

			});
		}

	};

});