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
daw.service('checkUpdateService', function($rootScope, $q, $http, $filter, $timeout, notificationService) {

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


		that.testIfNewVersion().then(function() {
			$rootScope.newVersionAvailable = true;
		});

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

		that.testIfNewVersion().then(function() {
			notificationService.create($filter('translate')('NOTIFICATION.UPDATE_ON.TITLE'), $filter('translate')('NOTIFICATION.UPDATE_ON.CONTENT'));
			$timeout(function(){
				open('http://dragand.watch');
			}, 2000);
		}).catch(function() {
			notificationService.create($filter('translate')('NOTIFICATION.UPDATE_OFF.TITLE'), $filter('translate')('NOTIFICATION.UPDATE_OFF.CONTENT'));
		})

	};

	/**
	 * @ngdoc method
	 * @name testIfNewVersion
	 *
	 * @description
	 * Return true if update are available
	 *
	 */
	that.testIfNewVersion = function() {
		
		var currentVersion = pkg['version'];

		return $q(function(resolve, reject) {
			$http.get(pkg['manifestUrl']).then(function(result) {

				var gitVersion = result['data']['version'];

				if(semver.compare(currentVersion, gitVersion) == -1){
					resolve();
				} else {
					reject();
				}

			});
		});

	};

});