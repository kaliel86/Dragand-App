/**
 * @ngdoc service
 * @name popcornTimeService
 * @module daw
 *
 * @description
 * Service for popcornTime
 *
 */
daw.service('popcornTimeService', function(settingsService, logService) {

	var that 			  	 = this;
	var popcornTimeListen 	 = settingsService.get('popcorntime'); 
	var popcornTimeMacPath   = '/var/folders/39/db8vdcs56q5ghy7d63clkbg00000gn/T/Popcorn-Time'; // Mac PATH

	/**
	 * @ngdoc method
	 * @name startListen
	 *
	 * @description
	 * Check on start if user want to listen popcorntime folder and start it
	 *
	 */
	that.listen = function() {

		if(popcornTimeListen){
			that.startListen();
		}

	};

	/**
	 * @ngdoc method
	 * @name startListen
	 *
	 * @description
	 * Listen popcornTime folder
	 *
	 */
	that.startListen = function() {
		logService.info('Dragand listen popcorntime folder');
		chokidar.watch(popcornTimeMacPath, {
			ignored: '**/*.torrent',
			ignoreInitial: true
		}).on('add', function(path, event) {
		  // Use Dragand Service
		});
	};

});