'use strict';

/*
 * NPM Required
 */
var path 			= require('path');
var gui  			= require('nw.gui');
var pkg 			= require('../package.json');
var updater 		= require('node-webkit-updater');
var opensubtitles 	= require("popcorn-opensubtitles");
var guessit 		= require('guessit-wrapper');
var imdb 			= require('node-movie');
var notifier 		= require('node-notifier');
var open 			= require("open");
var http 		  	= require('http');
var fs 		  	  	= require('fs');
var url 		  	= require('url');
var pathNode	  	= require('path');
var download 		= require('download');
var SubDb 			= require("subdb");
var upd 			= new updater(pkg);
var TVDBClient 		= require("node-tvdb");
var copyPath, execPath;

/*
 * Init APP
 */
var daw = angular.module('daw', ['ui.router', 'ngAnimate', 'pascalprecht.translate'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html"
		})
		.state('information', {
			url: "/",
			templateUrl: "views/information.html"
		})
		.state('settings', {
			url: "/",
			templateUrl: "views/settings.html"
		});

})

.config(function($translateProvider, config) {

	$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});

	$translateProvider.preferredLanguage(config.defaultLanguage);

})

.run(function(settingsService, checkUpdateService, translateService, guiService) {
	settingsService.init();
	translateService.init();
	guiService.init();
	checkUpdateService.launch();
});