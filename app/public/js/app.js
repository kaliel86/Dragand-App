'use strict';

/*
 * NPM Required
 */
var path 			= require("path");
var gui  			= require("nw.gui");
var win 			= gui.Window.get();
var pkg 			= require("./package.json");
var semver 			= require("semver");
var opensubtitles 	= require("popcorn-opensubtitles");
var guessit 		= require("guessit-wrapper");
var imdb 			= require("node-movie");
var open 			= require("open");
var http 		  	= require("http");
var fs 		  	  	= require("fs");
var url 		  	= require("url");
var pathNode	  	= require("path");
var download 		= require("download");
var SubDb 			= require("subdb");
var tvsubs 			= require("tv-subs")();
var TVDBClient 		= require("node-tvdb");
var childProcess	= require("child_process");
var registry 		= require('windows-no-runnable').registry;
var natural			= require('natural');
var cheerio 		= require('cheerio');

/*
 * APP
 */
var daw = angular.module('daw', ['ui.router', 'ngAnimate', 'pascalprecht.translate'])

/*
 * Router
 */
.config(function($stateProvider, $urlRouterProvider, $compileProvider, config) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html",
			requireRules: true
		})
		.state('information', {
			url: "/",
			templateUrl: "views/information.html",
			requireRules: true
		})
		.state('settings', {
			url: "/",
			templateUrl: "views/settings.html",
			requireRules: true
		});

		$compileProvider.debugInfoEnabled(config['devMode']);

})

/*
 * TRANSLATION
 */
.config(function($translateProvider, config) {

	$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});

	$translateProvider.preferredLanguage(config.defaultLanguage);

})

/*
 * INIT SERVICE
 */
.run(function(settingsService, checkUpdateService, translateService, guiService, rulesService, addic7edService) {
	settingsService.init();
	translateService.init();
	guiService.init();
	rulesService.check();
	checkUpdateService.launch();
	addic7edService.init();
});