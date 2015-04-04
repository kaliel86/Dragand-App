'use strict';

daw.service('theTvDbService', function($q, configService, settingsService) {

	var that = this;
	var tvdb = new TVDBClient(configService.get('tvDbKey', settingsService.get('language')));

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

});
