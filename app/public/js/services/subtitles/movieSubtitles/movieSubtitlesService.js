/**
 * @ngdoc service
 * @name movieSubtitlesService
 * @requires $q
 * @module daw
 *
 * @description
 * Service use for manipulate BetaSeries API
 *
 */
daw.service('movieSubtitlesService', function($q, $http, $timeout) {

	var that = this;
	var url  = 'http://www.moviesubtitles.org';
	var db 	 = require('./public/js/services/subtitles/movieSubtitles/movieSubtitlesDb.json');

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from movieSubtitles.org
	 *
	 */
	that.get = function() {
		// TODO
	};

	that.createDb = function() {

		var list 		= ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
		var moviesList  = [];
		var wstream 	= fs.createWriteStream('./public/js/services/subtitles/movieSubtitles/movieSubtitlesDb.json');

		wstream.on('finish', function () {
		  console.log('Parsing done');
		});

		for(var i in list) {
			$http.get(url+'/movies-'+list[i]+'.html').then(function(result) {

				var body = cheerio.load(result['data']);

				body('.movies a').each(function(i, row) {

					var id 	  = row['attribs']['href'].replace('movie-', '').replace('.html', '');
					var name  = row['children'][0]['children'][0]['children'][0]['data'];
					var years = row['children'][1]['children'][0]['data'];

					wstream.write('{"id":'+parseInt(id)+', "name": "'+name+'", "years": "'+years+'"},\n');
					
				});

			});
		}

	}

});