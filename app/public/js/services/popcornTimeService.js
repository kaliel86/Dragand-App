/**
 * @ngdoc service
 * @name popcornTimeService
 * @module daw
 *
 * @description
 * Service for popcornTime
 *
 */
daw.service('popcornTimeService', function($rootScope, subtitlesV2Service, settingsService, logService) {

	var that 			  	 = this;
	var popcornTimeListen 	 = settingsService.get('popcorntime'); 
	var popcornTimeMacPath   = path.join(os.tmpDir(), 'Popcorn-Time');
	var directory			 = process.env['HOME']+pathNode.sep+'Desktop'+pathNode.sep+'Dragand';

	/**
	 * @ngdoc method
	 * @name startListen
	 *
	 * @description
	 * Check on start if user want to listen popcorntime folder and start it
	 *
	 */
	that.listen = function() {
		that.startListen();
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

		if(popcornTimeListen){
			logService.info('Listen popcorntime folder');
			console.log(popcornTimeMacPath);
			chokidar.watch(popcornTimeMacPath, {
				ignored: ['**/*.torrent', '**/*.srt', '**/*.vtt'],
				ignoreInitial: true
			}).on('add', function(path, event) {

				console.log(path, event);

				$rootScope.view = 'list';

				subtitlesV2Service.get(pathNode.basename(path), path, directory, $rootScope.list.length).then(function() {
					$rootScope.count++;
				}).catch(function() {
					$rootScope.count++;
				});

			});
		}
		
	};

});