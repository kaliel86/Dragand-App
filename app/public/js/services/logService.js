/**
 * @ngdoc service
 * @name logService
 * @module daw
 *
 * @description
 * Service for manage console.log
 *
 */
daw.service('logService', function(configService) {

	var that 	= this;
	var devMode = configService.get('devMode');

	that.success = function(text) {
		if(devMode) {
			console.log('%c '+text, 'color: #1ABC9C;');
		}
	};

	that.info = function(text) {
		if(devMode) {
			console.log('%c '+text, 'color: #2980B9;');
		}	
	};

	that.error = function(text) {
		if(devMode) {
			console.log('%c '+text, 'color: #C0392B;');
		}
	};

	that.alert = function(text) {
		if(devMode) {
			console.log('%c '+text, 'color: #F1C40F;');
		}
	};

});