/**
 * @ngdoc service
 * @name theTvDbService
 * @requires $q, configService
 * @module daw
 *
 * @description
 * Service use for manipulate TheTvDb API
 *
 */
daw.service('theTvDbService', function($q, configService) {

	var that = this;
	var tvdb = new TVDBClient(configService.get('tvDbKey'));
	var URL = "http://thetvdb.com/banners/_cache/";

	/**
	 * @ngdoc method
	 * @name getImdbIdAndPoster
	 *
	 * @description
	 * Get subtitles from opensubtitles.org
	 * Download a subtitle, if the file is a zip we unzip it and rename the file for VLC
	 *
	 * @param {string} name - Name of the file (Exemple : The Flash)
	 *
	 */
	that.getImdbIdAndPoster = function(name) {

		var returnInfo = {
			IMDB_ID: null,
			Poster : null
		};

		return $q(function(resolve) {

			tvdb.getSeries(name, function(err, response) {

				if(response && typeof(response[0]) !== 'undefined'){

					returnInfo['IMDB_ID'] = response[0]['IMDB_ID'];

					tvdb.getBanners(response[0]['id']).then(function(response) {

						for(var i in response){
							if(response[i]['BannerType'] === 'poster') {
								returnInfo['Poster'] = URL+response[i]['BannerPath'];
								break;
							}
						}

						resolve(returnInfo);

					});

				} else {
					resolve(returnInfo);
				}

			});

		});

	};

});
