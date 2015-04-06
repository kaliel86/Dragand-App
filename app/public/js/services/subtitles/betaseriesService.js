'use strict';

daw.service('betaSeriesService', function($q) {

	var that = this;

	/*
	 * Get subtitles from Betaseries.com
	 * Use for VO and VF
	 */
	that.get = function() {
		// TODO Do stuff
	};

	/*
	 * Download and  rename file !
	 */
	that.download = function (filename, url, path) {

		var deferred 	= $q.defer();
		var regex 		= /(.*)\.[^.]+$/;

		new download({mode: '755', extract: true})
			.get(url)
			.dest(path)
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

	/*
	 * Language Mapping for BetaSeries
	 */
	that.languageMapping = {
		'en': 'VO',
		'fr': 'VF'
	};

});