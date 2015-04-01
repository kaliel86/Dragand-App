'use strict';

// NPM Required
var notifier = require('node-notifier');

daw.service('notificationService', function() {

	var that = this;

	/*
	 * Create a notification
	 */
	that.create = function(title, message) {
		notifier.notify({
			'title': title,
			'message': message
		});
	};

});

