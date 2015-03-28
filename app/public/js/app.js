'use strict';

// NPM Required
var path = require('path');

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

.run(function(settingsService) {
	settingsService.init();
});