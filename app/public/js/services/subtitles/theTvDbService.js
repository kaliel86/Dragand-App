'use strict';

daw.service('theTvDbService', function($q, configService) {

	var that = this;
	var tvdb = new TVDBClient(configService.get('tvDbKey'));
	var URL = "http://thetvdb.com/banners/_cache/";

	/*
	 * Return ID of the episode
	 */
	that.getEpisodeId = function(name, episode, season) {

		var deferred 	= $q.defer();

		tvdb.getSeries(name, function(err, response) {
			
			tvdb.getSeriesAllById(response[0]['seriesid'], function(err, response) {

				for(var i in response['Episodes']) {
					if(response['Episodes'][i]['Combined_episodenumber'] == episode && response['Episodes'][i]['Combined_season'] == season){
						deferred.resolve(response['Episodes'][i]['id']);
					}
				}

			});

		});

		return deferred.promise;
	};

	/*
	 * Return Poster in TheTvDb of the series
	 */
	that.getPoster = function(name) {

		var deferred 	= $q.defer();

		tvdb.getSeries(name, function(err, response) {

			tvdb.getBanners(response[0]['id'], function(error, response) {

				for(var i in response){
					if(response[i]['BannerType'] == 'poster') {
						deferred.resolve(URL+response[i]['BannerPath']);
						break;
					}
				}

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
			deferred.resolve(response[0]['IMDB_ID']);
		});

		return deferred.promise;

	};

});
