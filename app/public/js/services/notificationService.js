/**
 * @ngdoc service
 * @name notificationService
 * @module daw
 *
 * @description
 * Service use for notification
 *
 */
daw.service('notificationService', function(settingsService, logService) {

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

			logService.success('Notification sended');

			notifier.notify({
				title: title,
			  	message: message,
			  	icon: 'app/public/img/logoApp.png',
			  	sound: true,
			  	wait: false
			});
			
		} else {
			logService.error('Try to send notification');
		}

	};

});