'use strict';

/**
 * @ngdoc service
 * @name notificationService
 * @module daw
 *
 * @description
 * Service use for notification
 *
 */
daw.service('notificationService', function(settingsService) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name play
	 *
	 * @description
	 * Create a notification
	 *
	 * @param {string} title 	- Title of the notification
	 * @param {string} message 	- Message of the notification
	 *
	 */
	that.create = function(title, message) {

		if(settingsService.get('notification')) {
			// TODO Add 'icon'
			notifier.notify({
				'title'	 : title,
				'message': message,
				'wait'   : false
			});
		}

	};

});

