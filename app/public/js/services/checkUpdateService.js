'use strict';

/**
 * @ngdoc service
 * @name checkUpdateService
 * @requires $rootScope, $filter, notificationService
 * @module daw
 *
 * @description
 * Service for manage update app
 *
 */
daw.service('checkUpdateService', function($rootScope, $filter, notificationService) {

	var that = this;

	$rootScope.newVersionAvailable = false;

	/**
	 * @ngdoc method
	 * @name launch
	 *
	 * @description
	 * Check if new Version
	 *
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

	/**
	 * @ngdoc method
	 * @name update
	 *
	 * @description
	 * Update the app
	 *
	 */
	that.update = function() {
		upd.checkNewVersion(function(error, newVersionExists, manifest) {
			if (!error && newVersionExists && $rootScope.newVersionAvailable) {
				download(manifest);
			} else {
				notificationService.create($filter('translate')('NOTIFICATION.UPDATE.TITLE'), $filter('translate')('NOTIFICATION.UPDATE.CONTENT'));
			}
		});
	};

	/**
	 * @ngdoc method
	 * @name download
	 *
	 * @description
	 * Download new app
	 *
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