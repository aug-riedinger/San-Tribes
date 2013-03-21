'use strict';

/* Services */

var services = angular.module('myApp.services', ['ngResource']);

services.factory('Posts', ['$resource', function($resource) {
	return $resource('/json/timeline.json', {}, {
		query: {
			method: 'GET',
			isArray: true
		}
	});
}]);

services.factory('User', function($resource) {
    return $resource('/api/me', {}, {});
});

services.factory('facebook', [function() {
    return FB;
}]);

window.fbAsyncInit = function () {
    FB.init({
        appId: '142275899274139', // App ID
        status: true, // check login status
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true,  // parse XFBML
        oauth: true
        // channelUrl : '/channel'
    });
};

// Load the SDK Asynchronously
(function (d) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/en_US/all.js";
    ref.parentNode.insertBefore(js, ref);
})(document);