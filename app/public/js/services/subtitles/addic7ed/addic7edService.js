/**
 * @ngdoc service
 * @name addic7edService
 * @requires $q
 * @module daw
 *
 * @description
 * Service use for manipulate addic7ed
 *
 */
daw.service('addic7edService', function($q, $http) {

	var that 			  = this;
	var minimumPercent	  = 90;
	var countQuestions 	  = 3;
	var link 			  = 'http://www.addic7ed.com';
	var UrlSubtitlesLinks = 'http://www.addic7ed.com/ajax_loadShow.php';
	var db 	 			  = require('./public/js/services/subtitles/addic7ed/addic7edDb.json');

	/**
	 * @ngdoc method
	 * @name get
	 *
	 * @description
	 * Get subtitles from addic7ed.com
	 *
	 */
	that.get = function(serieName, langueSubtitles, season, episode, releaseGroup, fileName, directory) {

		return $q(function(resolve, reject) {
			that.returnAddic7edId(serieName).then(function(serieId) {

				that.getSubtitlesLinks(serieId, langueSubtitles, season, episode, releaseGroup).then(function(url) {

					that.download(fileName, url, directory).then(function() {
						// console.log('Download Completed');
						resolve();
					}).catch(function() {
						reject();
						// console.log('Error durring download on addic7ed');
					});

				}).catch(function(){
					reject();
					// console.log('No subtitle on addic7ed');
				});

			}).catch(function() {
				reject();
				// console.log('No show with this name on addic7ed.');
			});
		});

	};

	/**
	 * @ngdoc method
	 * @name returnAddic7edId
	 *
	 * @description
	 * Search serie in addic7ed database, or a similarity and return ID
	 *
	 */
	that.returnAddic7edId = function(serieName) {

		var matches = [];
		var idAddic7ed;

		return $q(function(resolve, reject) {

			// Check the name in the DB Addict7ed
			for(var i in db) {
				if(serieName.toLowerCase() == db[i]['name'].toLowerCase()) {
					idAddic7ed = db[i]['id'];
					break;
				} else {
					matches.push({
						name  : db[i]['name'],
						id    : db[i]['id'],
						score : natural.JaroWinklerDistance(serieName, db[i]['name'])
					});
				}
			}

			// Sort matchs >
			matches.sort(function(a, b) {
				return b.score - a.score;
			});

			// Return ID if good or false if not
			if(idAddic7ed) {
				resolve(parseInt(idAddic7ed));
			} else if(matches.length == 0) {
				reject();
			} else {

				var i = 0;
				var idGood;

				do {

					var answer = prompt("Show : "+ matches[i]['name']+"\nAnswer with y/yes");

					if(answer == 'y' || answer == 'yes'){
						idGood = parseInt(matches[i]['id']);
						break;
					} else {
						i++;
					}

				} while(i < countQuestions);

				if(typeof(idGood) === 'number') {
					resolve(idGood);
				} else {
					reject();
				}
				
			}

		});

	};

	/**
	 * @ngdoc method
	 * @name getSubtitlesLinks
	 *
	 * @description
	 *
	 */
	that.getSubtitlesLinks = function(serieId, langueSubtitles, season, episode, releaseGroup) {

		return $q(function(resolve, reject) {

			var idLanguages = parseInt(that.languageMapping[langueSubtitles]);

			$http.get(UrlSubtitlesLinks+"?show="+serieId+"&season="+season+"&langs=\|"+idLanguages+"\|").then(function(result) {

				if(result['status'] !== 200){
					reject();
					return false;
				}

				var body   = cheerio.load(result['data']);
				var subs = [];

				body('div#season tbody tr.epeven.completed').each(function(i, row) {

					var columns = body(row).find('td');
					var percent = that.getStatus(body(columns[5]).text());

					if(body(columns[1]).text() == episode && that.compareReleaseGroup(releaseGroup, body(columns[4]).text())) {
						if(percent == 100) {
							resolve(link+body(columns[9]).find('a').first().attr('href'));
							// console.log('Episode :', body(columns[1]).text());
							// console.log('releaseGroup :', body(columns[4]).text());
							// console.log('Percent Completed :', percent+'%');
							// console.log('URL :', body(columns[9]).find('a').first().attr('href'));
							// console.log('---------------');
							return false;
						} else if(percent > minimumPercent) {
							resolve(link+body(columns[9]).find('a').first().attr('href'));
							// console.log('Episode :', body(columns[1]).text());
							// console.log('releaseGroup :', body(columns[4]).text());
							// console.log('Percent Completed :', percent+'%');
							// console.log('URL :', body(columns[9]).find('a').first().attr('href'));
							// console.log('---------------');
							return false;
						}
					}

				});

				reject();

			}).catch(function(){
				reject();
			});

		});
	
	};

	/**
	 * @ngdoc properties
	 * @name getStatus
	 *
	 * @description
	 * Return the % of the completed subtitle
	 *
	 */
	that.getStatus = function(string) {
		if(string == 'Completed') {
			return 100;
		} else {
			return parseInt(string.replace(' Completed', '').replace('%', ''));
		}
	};

	/**
	 * @ngdoc properties
	 * @name compareReleaseGroup
	 *
	 * @description
	 * Compare the release of the File and release on Addic7ed
	 *
	 */
	that.compareReleaseGroup = function(releaseFile, releaseAddic7ed) {

		var releaseFile 	= releaseFile.toLowerCase();
		var releaseAddic7ed = releaseAddic7ed.toLowerCase();

		if(releaseFile == releaseAddic7ed) {
			return true;
		} else {
			var jaroWiklerScore = natural.JaroWinklerDistance(releaseFile, releaseAddic7ed);

			if(jaroWiklerScore >= 0.9) {
				return true;
			} else {
				return false;
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
	 * @param {string} filename  - File name (Example : The.Flash.2014.S01E17.720p.HDTV.X264-DIMENSION.mkv)
	 * @param {string} url 		 - URL of the subtitle (Example : http://google.com/flash.srt)
	 * @param {string} directory - Path to the directory where the file drag is
     *
	 */
	that.download = function(filename, url, directory) {

		var regex = /(.*)\.[^.]+$/;

		return $q(function(resolve, reject){
			new download({mode: '755', extract: true, headers: {
					referer: 'http://www.addic7ed.com'
				}})
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
	 * Little mapping use by Addic7ed,
	 * Thx https://github.com/AlixBa/addic7ed-subtitles for mapping
	 *
	 */
	that.languageMapping = {
	    "sq": "52",
	    "ar": "38",
	    "arm": "50",
	    "az": "48",
	    "bn": "47",
	    "bs": "44",
	    "bg": "35",
	    "ca": "12",
	    "cn": "41",
	    "zh": "24",
	    "hr": "31",
	    "cs": "14",
	    "da": "30",
	    "nl": "17",
	    "en": "1",
	    "est": "54",
	    "eu": "13",
	    "fi": "28",
	    "fr": "8",
	    "fr-ca": "53",
	    "gl": "15",
	    "de": "11",
	    "el": "27",
	    "he": "23",
	    "hin": "55",
	    "hu": "20",
	    "ice": "56",
	    "id": "37",
	    "it": "7",
	    "ja": "32",
	    "ko": "42",
	    "lav": "57",
	    "lit": "58",
	    "mk": "49",
	    "ms": "40",
	    "no": "29",
	    "fa": "43",
	    "pl": "21",
	    "pt": "9",
	    "pt-br": "10",
	    "ro": "26",
	    "ru": "19",
	    "sr": "39",
	    "sr-la": "36",
	    "sk": "25",
	    "sl": "22",
	    "es": "4",
	    "es-la": "6",
	    "es-es": "5",
	    "sv": "18",
	    "tam": "59",
	    "th": "46",
	    "tr": "16",
	    "ukr": "51",
	    "vi": "45"
	};

});