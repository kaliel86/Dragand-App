'use strict';

/**
 * @ngdoc service
 * @name yifyService
 * @requires $q, $http
 * @module daw
 *
 * @description
 * Service use for manipulate Yify API
 *
 */
daw.service('yifyService', function($q, $http) {

	var that = this;

	var URL 		= "http://api.yifysubtitles.com/subs/";
	var DOWNLOAD 	= "http://yifysubtitles.com";

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from Yify.com and launch download method
	 *
	 * @param {int} imdbId 		- ID IMDB of the movie
	 * @param {string} language - Wanted language
	 * @param {string} filename - File name (Exemple : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} path 	- Path to the directory where the file drag is
	 *
	 */
	that.get = function (imdbId, language, filename, path) {

		var deferred = $q.defer();

		$http.get(URL+imdbId).then(function(result) {

			if(result && typeof(result['data']['subs']) !== 'undefined') {

				var list 			= result['data']['subs'][imdbId];
				var languageMapped 	= that.getLanguageMapped(language);
				var subtitles 		= list[languageMapped];

				if(typeof(subtitles) !== 'undefined'){
					var url = that.getLink(subtitles);

					that.download(DOWNLOAD+url, path, filename).then(function() {
						deferred.resolve();
					}).catch(function() {
						deferred.reject();
					});

				} else {
					deferred.reject();
				}

			} else {
				deferred.reject();
			}
		}).catch(function() {
			deferred.reject();
		});

		return deferred.promise;

	};

	/**
	 * @ngdoc method
	 * @name getLanguageMapped
	 *
	 * @description
	 * Return the language mapped for Yify
	 *
	 * @param {string} language - Wanted language
	 *
	 */
	that.getLanguageMapped = function (language) {

		for(var key in that.languageMapping) {

			var value = that.languageMapping[key];

			if(value == language) {
				return key;
			}

		}

	};

	/**
	 * @ngdoc method
	 * @name getLink
	 *
	 * @description
	 * Get best subtitles, base on rating
	 *
	 * @param {string} list - list of subtitles from Tify
	 *
	 */
	that.getLink = function (list) {

		var highest = list[0].rating;
		var index 	= 0;

		for (var i = 1; i < list.length; i++) {
			if (list[i].rating > highest) {
				highest = list[i].rating;
				index 	= i;
			}
		}
		return list[index]['url'];

	};

	/**
	 * @ngdoc method
	 * @name download
	 *
	 * @description
	 * Download a subtitle, if the file is a zip we unzip it and rename the file for VLC
	 *
	 * @param {string} filename  - File name (Exemple : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} url 		 - URL of the subtitle (Exemple : http://google.com/flash.srt)
	 * @param {string} directory - Path to the directory where the file drag is
	 *
	 */
	that.download = function (url, directory, filename) {

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
	 * Little mapping use by Yify,
	 *
	 */
	that.languageMapping = {
		'albanian': 'sq',
		'arabic': 'ar',
		'bengali': 'bn',
		'brazilian-portuguese': 'pt-br',
		'bulgarian': 'bg',
		'bosnian': 'bs',
		'chinese': 'zh',
		'croatian': 'hr',
		'czech': 'cs',
		'danish': 'da',
		'dutch': 'nl',
		'english': 'en',
		'estonian': 'et',
		'farsi-persian': 'fa',
		'finnish': 'fi',
		'french': 'fr',
		'german': 'de',
		'greek': 'el',
		'hebrew': 'he',
		'hungarian': 'hu',
		'indonesian': 'id',
		'italian': 'it',
		'japanese': 'ja',
		'korean': 'ko',
		'lithuanian': 'lt',
		'macedonian': 'mk',
		'malay': 'ms',
		'norwegian': 'no',
		'polish': 'pl',
		'portuguese': 'pt',
		'romanian': 'ro',
		'russian': 'ru',
		'serbian': 'sr',
		'slovenian': 'sl',
		'spanish': 'es',
		'swedish': 'sv',
		'thai': 'th',
		'turkish': 'tr',
		'urdu': 'ur',
		'ukrainian': 'uk',
		'vietnamese': 'vi'
	};

});