'use strict';

angular.module('subtitles', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "views/home.html"
		});

})

.run(function() {
	console.log('----------------------');
	console.log('DragAndWatch : launched');
	console.log('----------------------');
});