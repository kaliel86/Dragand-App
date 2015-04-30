/**
 * @ngdoc service
 * @name settingsService
 * @module daw
 *
 * @description
 * Service for manage information in localStorage (Use for user's settings)
 *
 */
daw.service('settingsService', function(configService, logService){

	var that = this;

	/**
	 * @ngdoc method
	 * @name init
	 *
	 * @description
	 * Init in the localStorage the default value
	 *
	 */
	that.init = function() {

		if(typeof(that.get('version')) === 'undefined'
		||(typeof(that.get('version') !== 'undefined') && semver.compare(that.get('version'), pkg['version']) == -1)) { 
			localStorage.clear();
		}

		if(!localStorage['autoplay'] && !localStorage['language'] && !localStorage['notification'] && !localStorage['appLanguage'] && !localStorage['rules'] && !localStorage['popcorntime']) {
			that.set('autoplay', false);
			that.set('language', 'en');
			that.set('appLanguage', configService.get('defaultLanguage'));
			that.set('notification', true);
			that.set('rules', 'notAccepted');
			that.set('popcorntime', true);
			that.set('version', pkg['version']);
		}
		
		that.consoleSettings();

	};

	/**
	 * @ngdoc method
	 * @name consoleSettings
	 *
	 * @description
	 * Add in Console informations from settings
	 *
	 */
	that.consoleSettings = function() {
		logService.success('============[SETTINGS]============');
		logService.info('Autoplay : ' + that.get('autoplay'));
		logService.info('language : ' + that.get('language'));
		logService.info('AppLanguage : ' + that.get('appLanguage'));
		logService.info('Notification : ' + that.get('notification'));
		logService.info('PopcornTime : ' + that.get('popcorntime'));
		logService.info('Version : ' + that.get('version'));
		logService.info('Rules : ' + that.get('rules'));
		logService.success('==========[END SETTINGS]==========');
	}

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get Value from Database
	 *
	 */
	that.get = function(key) {
		if (localStorage.getItem(key)!=null) {
			return JSON.parse(localStorage.getItem(key));
		}
	};

	/**
	 * @ngdoc method
	 * @name set
	 *
	 * @description
	 * Set Value in Database
	 *
	 * @param {string} key 	 - Key
	 * @param {string} value - Value
	 *
	 */
	that.set = function(key, value) {
		localStorage.setItem(key, JSON.stringify(value));
	};

});