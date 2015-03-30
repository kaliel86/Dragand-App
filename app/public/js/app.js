'use strict';

// NPM Required
var path = require('path');
var gui  = require('nw.gui');

/*
 * Init APP
 */
var daw = angular.module('daw', ['ui.router', 'pascalprecht.translate'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html"
		});

})

.config(function($translateProvider, languageService) {

	$translateProvider.useStaticFilesLoader({
		prefix: 'languages/',
		suffix: '.json'
	});

	$translateProvider.preferredLanguage(languageService.getDefault());
})

.run(function(settingsService, checkUpdateService) {
	checkUpdateService.launch();
	settingsService.init();
});