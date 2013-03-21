'use strict';
/*global angular*/

// Declare app level module which depends on filters, and services
var app = angular.module('myApp', ['$strap.directives', 'ui','myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives'])
	.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'homeCtrl'
	});
	$routeProvider.when('/profile', {
		templateUrl: 'partials/profile.html',
		controller: 'profileCtrl'
	});
	$routeProvider.when('/calendar', {
		templateUrl: 'partials/calendar.html',
		controller: 'calendarCtrl'
	});
	$routeProvider.when('/schedule', {
		templateUrl: 'partials/schedule.html',
		controller: 'scheduleCtrl'
	});
	$routeProvider.when('/map', {
		templateUrl: 'partials/map.html',
		controller: 'mapCtrl'
	});
	$routeProvider.when('/people', {
		templateUrl: 'partials/people.html',
		controller: 'peopleCtrl'
	});
	$routeProvider.otherwise({
		redirectTo: '/'
	});
}]);