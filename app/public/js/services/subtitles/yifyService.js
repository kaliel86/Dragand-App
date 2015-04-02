'use strict';

daw.service('yifyService', function($q, $http) {

	var that = this;

	var URL 		= "http://api.yifysubtitles.com/subs/";
	var DOWNLOAD 	= "http://yifysubtitles.com";

	/*
	 * Get Subtitles link from Yify
	 */
	that.get = function (imdbId, language) {
		var deferred = $q.defer();

		$http.get(URL+imdbId).then(function(result) {
			if(result && typeof(result['data']['subs']) !== 'undefined') {

				var list 			= result['data']['subs'][imdbId];

				var languageMapped 	= that.getLanguageMapped(list, language);
				var subtitles 		= list[languageMapped];
				var url 			= that.getLink(subtitles);

				deferred.resolve(DOWNLOAD+url);

			} else {
				deferred.reject();
			}
		}).catch(function() {
			deferred.reject();
		});

		return deferred.promise;
	};

	that.getLanguageMapped = function (list, language) {

		for(var key in that.languageMapping) {

			var value = that.languageMapping[key];

			if(value == language) {
				return key;
			}

		}

	};

	that.getLink = function (list) {
		var highest = list[0].rating;
		var index = 0;
		for (var i=1; i<list.length; i++) {
			if (list[i].rating > highest) {
				highest = list[i].rating;
				index = i;
			}
		}
		return list[index]['url'];
	}

	/*
	 * Mapping use by Yify
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