'use strict';

daw.service('theTvDbService', function($q, configService) {

	var that = this;
	var tvdb = new TVDBClient(configService.get('tvDbKey'));
	var URL = "http://thetvdb.com/banners/_cache/";

	/*
	 * Return the IMDBID of the series
	 */
	that.getImdbIdAndPoster = function(name) {

		var deferred 	= $q.defer();

		var returnInfo  = {
			IMDB_ID: null,
			Poster: null
		};

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

					deferred.resolve(returnInfo);

				});

			} else {
				deferred.resolve(returnInfo);
			}

		});

		return deferred.promise;

	};

});
