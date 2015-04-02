'use strict';

daw.service('checkUpdateService', function($rootScope, $translate, notificationService) {

	var that = this;

	$rootScope.newVersionAvailable = false;

	/*
	 * Check if new Version
	 */
	that.launch = function() {

		if(gui.App.argv.length) {

			copyPath = gui.App.argv[0];
			execPath = gui.App.argv[1];

			upd.install(copyPath, function(err) {
				if(!err) {
					upd.run(execPath, null);
					gui.App.quit();
				}
			});

		}
		else {

			upd.checkNewVersion(function(error, newVersionExists, manifest) {
				if (!error && newVersionExists) {
					$rootScope.newVersionAvailable = true;
				}
			});

		}
	};

	/*
	 * Update the app
	 */
	that.update = function() {
		upd.checkNewVersion(function(error, newVersionExists, manifest) {
			if (!error && newVersionExists && $rootScope.newVersionAvailable) {
				download(manifest);
			} else {
				notificationService.create($translate('NOTIFICATION.UPDATE.TITLE'), $translate('NOTIFICATION.UPDATE.CONTENT'));
			}
		});
	};

	/*
	 * Download new app
	 */
	var download = function(manifest) {
		upd.download(function(error, filename) {
			if (!error) {
				upd.unpack(filename, function(error, newAppPath) {
					if (!error) {
						upd.runInstaller(newAppPath, [upd.getAppPath(), upd.getAppExec()],{});
						gui.App.quit();
					}
				}, manifest);
			}
		}, manifest);
	};

});