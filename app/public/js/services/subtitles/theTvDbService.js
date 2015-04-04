'use strict';

daw.service('theTvDbService', function($q, configService) {

	var that = this;
	var tvdb = new TVDBClient(configService.get('tvDbKey'));
	var URL = "http://thetvdb.com/banners/_cache/";

	/*
	 * Return Poster in TheTvDb of the series
	 */
	that.getPoster = function(name) {

		var deferred 	= $q.defer();

		tvdb.getSeries(name, function(err, response) {

			tvdb.getBanners(response[0]['id'], function(error, response) {

				for(var i in response){
					if(response[i]['BannerType'] === 'poster') {
						deferred.resolve(URL+response[i]['BannerPath']);
						break;
					}
				}

				deferred.resolve();

			});

		});

		return deferred.promise;

	};

	/*
	 * Return the IMDBID of the series
	 */
	that.getImdbId = function(name) {

		var deferred 	= $q.defer();

		tvdb.getSeries(name, function(err, response) {
			if(response && typeof(response[0]) !== 'undefined'){
				deferred.resolve(response[0]['IMDB_ID']);
			} else {
				deferred.resolve();
			}
		});

		return deferred.promise;

	};

});
