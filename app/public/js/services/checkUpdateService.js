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
daw.service('checkUpdateService', function($rootScope, $http, $filter, $timeout, notificationService) {

	var that = this;

	$rootScope.newVersionAvailable = false;

	/**
	 * @ngdoc method
	 * @name launch
	 *
	 * @description
	 * If update available, change the icon in the top bar
	 *
	 */
	that.launch = function() {

		if(testIfNewVersion()) {
			$rootScope.newVersionAvailable = true;
		}

	};

	/**
	 * @ngdoc method
	 * @name update
	 *
	 * @description
	 * If update availble, go to the website and send notification
	 *
	 */
	that.update = function() {

		if(testIfNewVersion()) {
			notificationService.create($filter('translate')('NOTIFICATION.UPDATE_ON.TITLE'), $filter('translate')('NOTIFICATION.UPDATE_ON.CONTENT'));
			$timeout(function(){
				open('http://dragand.watch');
			}, 2000);
		} else {
			notificationService.create($filter('translate')('NOTIFICATION.UPDATE_OFF.TITLE'), $filter('translate')('NOTIFICATION.UPDATE_OFF.CONTENT'));
		}

	};

	/**
	 * @ngdoc method
	 * @name testIfNewVersion
	 *
	 * @description
	 * Return true if update are available
	 *
	 */
	var testIfNewVersion = function() {
		var currentVersion = pkg['version'];

		$http.get(pkg['manifestUrl']).then(function(result) {
			var gitVersion = result['data']['version'];

			if(semver.compare(currentVersion, gitVersion) == -1){
				return true;
			} else {
				return false;
			}

		});
	};

});