/**
 * @ngdoc service
 * @name playerService
 * @requires settingsService
 * @module daw
 *
 * @description
 * Service use for the player (VLC)
 *
 */
daw.service('playerService', function(notificationService) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name play
	 *
	 * @description
	 * Open the movie with a player (VLC)
	 *
	 * @param {string} path - Path of the file
	 *
	 */
	that.play = function(path) {

		var platform = process.platform;
		var vlcArgs  = '-q --play-and-exit';

		if(platform === "darwin") { // MAC

			var root 	 = '/Applications/VLC.app/Contents/MacOS/VLC';
			var home 	 = (process.env.HOME || '') + root;

			var vlc = childProcess.exec('vlc ' + vlcArgs + ' ' + path + ' || ' + root + ' ' + vlcArgs + ' ' + path + ' || ' + home + ' ' + vlcArgs + ' ' + path, function (error, stdout, stderror) {
				if (error) {
					notificationService.create($filter('translate')('NOTIFICATION.NOT_VLC.TITLE'), $filter('translate')('NOTIFICATION.NOT_VLC.CONTENT'));
					process.exit(0)
				}
			});

		} else if(platform === "win32") { // WIN

			var key;

			if (process.arch === 'x64') {
				try {
					key = registry('HKLM/Software/Wow6432Node/VideoLAN/VLC')
				} catch (e) {
					try {
						key = registry('HKLM/Software/VideoLAN/VLC')
					} catch (err) {}
				}
			} else {
				try {
					key = registry('HKLM/Software/VideoLAN/VLC')
				} catch (err) {
					try {
						key = registry('HKLM/Software/Wow6432Node/VideoLAN/VLC')
					} catch (e) {}
				}
			}

			if (key) {
				var vlcPath = key['InstallDir'].value + pathNode.sep + 'vlc';
				vlcArgs 	= vlcArgs.split(' ');
				vlcArgs.unshift(path);
				childProcess.execFile(vlcPath, vlcArgs);
			} else {
				notificationService.create($filter('translate')('NOTIFICATION.NOT_VLC.TITLE'), $filter('translate')('NOTIFICATION.NOT_VLC.CONTENT'));
			}

		} else {
			// TODO Support Linux ? :)
		}

	}
});