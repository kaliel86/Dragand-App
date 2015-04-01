'use strict';

// NPM Required
var path = require('path');
var gui  = require('nw.gui');

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
	// Add menu bar
	var nw = require('nw.gui');
	var win = nw.Window.get();
	var nativeMenuBar = new nw.Menu({ type: "menubar" });
	nativeMenuBar.createMacBuiltin("Dragand");
	win.menu = nativeMenuBar;

	$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});

	$translateProvider.preferredLanguage(config.defaultLanguage);

})

.run(function(settingsService, checkUpdateService, translateService) {
	translateService.init();
	settingsService.init();
	checkUpdateService.launch();
});