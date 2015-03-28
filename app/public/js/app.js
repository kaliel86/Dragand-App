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
	var file = "The.Flash.2014.S01E15.720p.HDTV.X264-DIMENSION.mkv";
	var fileInformation = fileInfosService.parse(file);

	imdbService.get(fileInformation['name']).then(function(imdbInfos) {

		console.log('Poster : ', imdbInfos['Poster']);

		subtitlesService.find(imdbInfos['imdbID'], fileInformation['season'], fileInformation['episode'], file).then(function(url) {
			console.log('URL : ', url);
		});

	});

});