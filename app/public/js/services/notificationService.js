'use strict';

daw.service('notificationService', function() {

	var that = this;

	/*
	 * Create a notification
	 */
	that.create = function(title, message) {
		// TODO Add 'icon'
		notifier.notify({
			'title': title,
			'message': message,
			'wait': false
		});
	};

});

