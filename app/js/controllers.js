'use strict';

/* Controllers */

var controllers = angular.module('myApp.controllers', ['ngCookies', 'myApp.services']);

controllers.controller('loadingCtrl', function($scope) {
	$scope.isViewLoading = false;
	$scope.$on('$routeChangeStart', function() {
		$scope.isViewLoading = true;
	});
	$scope.$on('$routeChangeSuccess', function() {
		$scope.isViewLoading = false;
	});
});

controllers.controller('homeCtrl', function($scope, Posts) {
	console.log('here');
	$scope.posts = Posts.query(function(data) {});
});

controllers.controller('profileCtrl', function($scope) {
	console.log('there');
});

controllers.controller('mapCtrl', function($scope) {
	$scope.myMarkers = [];

	$scope.mapOptions = {
		center: new google.maps.LatLng(35.784, -78.670),
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	$scope.addMarker = function($event) {
		$scope.myMarkers.push(new google.maps.Marker({
			map: $scope.myMap,
			position: $event.latLng
		}));
	};

	$scope.setZoomMessage = function(zoom) {
		$scope.zoomMessage = 'You just zoomed to ' + zoom + '!';
		console.log(zoom, 'zoomed');
	};

	$scope.openMarkerInfo = function(marker) {
		$scope.currentMarker = marker;
		$scope.currentMarkerLat = marker.getPosition().lat();
		$scope.currentMarkerLng = marker.getPosition().lng();
		$scope.myInfoWindow.open($scope.myMap, marker);
	};

	$scope.setMarkerPosition = function(marker, lat, lng) {
		marker.setPosition(new google.maps.LatLng(lat, lng));
	};
});

controllers.controller('peopleCtrl', function($scope) {
	console.log('people');
});

controllers.controller('scheduleCtrl', function($scope) {
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();

	$scope.events = [{
		title: 'All Day Event',
		start: new Date(y, m, 1)
	}, {
		title: 'Long Event <span class="seePeople">4<i class="icon-user icon-white"></i></span>',
		start: new Date(y, m, d - 5),
		end: new Date(y, m, d - 2)
	}, {
		id: 999,
		title: 'Repeating Event',
		start: new Date(y, m, d - 3, 16, 0),
		allDay: false
	}, {
		id: 999,
		title: 'Repeating Event',
		start: new Date(y, m, d + 4, 16, 0),
		allDay: false
	}, {
		title: 'Birthday Party',
		start: new Date(y, m, d + 1, 19, 0),
		end: new Date(y, m, d + 1, 22, 30),
		allDay: false
	}, {
		title: 'Click for Google',
		start: new Date(y, m, 28),
		end: new Date(y, m, 29),
		url: 'http://google.com/'
	}];

	$scope.eventSources = [$scope.events, $scope.eventSource];

	$scope.addEvent = function() {
		$scope.events.push({
			title: 'Open Sesame',
			start: new Date(y, m, 28),
			end: new Date(y, m, 29)
		});
	};

	$scope.remove = function(index) {
		$scope.events.splice(index, 1);
	};

	$scope.eventRender = function(event, element) {
		element.find('span.fc-event-title').html(element.find('span.fc-event-title').text());
	};

});