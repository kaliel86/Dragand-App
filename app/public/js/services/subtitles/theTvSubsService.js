/**
 * @ngdoc service
 * @name theTvSubsService
 * @requires $q, fileInfosService
 * @module daw
 *
 * @description
 * Service use for manipulate TheTvSubs API
 *
 */
daw.service('theTvSubsService', function($q, fileInfosService) {

	var that = this;

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from TheTvSubs
	 * Download a subtitle, if the file is a zip we unzip it and rename the file for VLC
	 *
	 * @param {string} fileName - fileName
	 * @param {string} serieName - serieName
	 * @param {int} episode - episode
	 * @param {int} season - season
	 * @param {string} language - language
	 * @param {string} releaseGroup - releaseGroup
	 * @param {string} directory - directory
	 *
	 */
	that.get = function(fileName, serieName, episode, season, language, releaseGroup, directory) {

		return $q(function(resolve, reject) {

			tvsubs.search({query:serieName}).then(function(data){

				if(data && typeof(data[0]) !== 'undefined') {

					var value = data[0]['value'];

					tvsubs.episode({path:"/tv/"+value+"/season-"+season+"/episode-"+episode+"/"}).then(function(result){

						if(result) {

							var episodes 	   = result;
							var languageMapped = that.getLanguageMapped(language);
							var i 			   = episodes['list'].length;

							// Recursive method
							getUrl(i - 1);

							function getUrl(i) {

								if(i == 0) {
									reject();
								}

								if(i != 0) {

									if(episodes['list'][i]['lang'] == languageMapped) {

										var pathEpisode = episodes['list'][i]['path'];
										var title 		= episodes['list'][i]['title'];

										fileInfosService.parse(fileName).then(function(fileParse) {

											if(releaseGroup == fileParse['releaseGroup']){

												tvsubs.subtitle({path:pathEpisode}).then(function(url){

													that.download(url['path'], directory, fileName).then(function(){
														resolve();
													}).catch(function(){
														reject();
													});

												});

											} else {
												getUrl(i-1);
											}

										});

									} else {
										getUrl(i-1);
									}

								}

							}

						} else {
							reject();
						}

					}).catch(function(){
						reject();
					});


				} else {
					reject();
				}

			}).catch(function(){
				reject();
			});

		});

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
				return key.charAt(0).toUpperCase() + key.slice(1);
			}

		}

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

		return $q(function(resolve, reject) {

			var regex 		= /(.*)\.[^.]+$/;

			new download({mode: '755', extract: true})
				.get(url)
				.dest(directory)
				.rename(regex.exec(filename)[1] + '.srt')
				.run(function (err, files) {
					if(err !== 'null') {
						resolve();
					} else {
						reject();
					}
				});

		});

	};

	/**
	 * @ngdoc properties
	 * @name languageMapping
	 *
	 * @description
	 * Little mapping use by TheTvSubs,
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