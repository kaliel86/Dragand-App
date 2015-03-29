'use strict';

// NPM Required
var path = require('path');
var gui  = require('nw.gui');

/*
 * Init APP
 */
var daw = angular.module('daw', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html"
		});

})

.run(function(settingsService, checkUpdateService, subtitlesService, imdbService, fileInfosService) {
	checkUpdateService.launch();
	settingsService.init();

	/*
	 * Basic Exemple :)
	 */
	var file = "the.originals.215.hdtv-lol.mp4";

	fileInfosService.parse(file).then(function(result) {

		imdbService.get((result['series']) ? result['series'] : result['title']).then(function(imdb) {

			console.log('Poster : ', imdb['Poster']);

			subtitlesService.find(imdb['imdbID'], result, file).then(function(url) {
				console.log('URL : ', url);
			});

		});

	});

});