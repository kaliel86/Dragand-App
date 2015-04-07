'use strict';

/**
 * @ngdoc service
 * @name betaSeriesService
 * @requires $q
 * @module daw
 *
 * @description
 * Service use for manipulate BetaSeries API
 *
 */
daw.service('betaSeriesService', function($q) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from Betaseries.com
	 *
	 */
	that.get = function() {
		// TODO Do stuff
	};

	/**
	 * @ngdoc method
	 * @name download
	 *
	 * @description
	 * Download a subtitle, if the file is a zip we unzip it and rename the file for VLC
	 *
	 * @param {string} filename  - File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} url 		 - URL of the subtitle (Example : http://google.com/flash.srt)
	 * @param {string} directory - Path to the directory where the file drag is
     *
	 * @returns {Promise}
	 *
	 */
	that.download = function (filename, url, directory) {

		var deferred 	= $q.defer();
		var regex 		= /(.*)\.[^.]+$/;

		new download({mode: '755', extract: true})
			.get(url)
			.dest(directory)
			.rename(regex.exec(filename)[1] + '.srt')
			.run(function (err, files) {
				if(err !== 'null') {
					deferred.resolve();
				} else {
					deferred.reject();
				}
			});

		return deferred.promise;
	};

	/**
	 * @ngdoc properties
	 * @name languageMapping
	 *
	 * @description
	 * Little mapping use by BetaSeries,
	 * Us we use en/fr and BetaSeries use VO/VF
	 *
	 */
	that.languageMapping = {
		'en': 'VO',
		'fr': 'VF'
	};

});