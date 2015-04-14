/**
 * @ngdoc service
 * @name notificationService
 * @module daw
 *
 * @description
 * Service use for notification
 *
 */
daw.service('notificationService', function($timeout, settingsService, logService) {

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

			var notification = new Notification(title, {body: message});

			notification.onshow = function () {
				$timeout(function(){
					notification.close();
				}, 1000);
			};

			logService.success('Notification sended');

			
		} else {
			logService.error('Try to send notification');
		}

	};

});