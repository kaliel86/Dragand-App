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
daw.service('checkUpdateService', function($rootScope, $filter, $timeout, notificationService) {

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

		upd.checkNewVersion(function(error, newVersionExists, manifest) {
			if (!error && newVersionExists) {
				$rootScope.newVersionAvailable = true;
			}
		});

	};

	/**
	 * @ngdoc method
	 * @name update
	 *
	 * @description
	 * If update availble, fo to the website and send notification
	 *
	 */
	that.update = function() {
		upd.checkNewVersion(function(error, newVersionExists, manifest) {
			if (!error && newVersionExists && $rootScope.newVersionAvailable) {
				notificationService.create($filter('translate')('NOTIFICATION.UPDATE_ON.TITLE'), $filter('translate')('NOTIFICATION.UPDATE_ON.CONTENT'));
				$timeout(function(){
					open('http://dragand.watch');
				}, 2000);
			} else {
				notificationService.create($filter('translate')('NOTIFICATION.UPDATE_OFF.TITLE'), $filter('translate')('NOTIFICATION.UPDATE_OFF.CONTENT'));
			}
		});
	};

});