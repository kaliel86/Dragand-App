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
	 * Check if new Version
	 *
	 */
	that.launch = function() {

		var currentVersion = pkg['version'];

		$http.get(pkg['manifestUrl']).then(function(result) {
			var gitVersion = result['data']['version'];
			
			if(semver.compare(currentVersion, gitVersion) == -1){
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

		var currentVersion = pkg['version'];

		$http.get(pkg['manifestUrl']).then(function(result) {
			var gitVersion = result['data']['version'];
			
			if(semver.compare(currentVersion, gitVersion) == -1){
				
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