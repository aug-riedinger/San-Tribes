'use strict';

/* Directives */

angular.module('myApp.directives', ['ngCookies'])
.directive('login', function($rootScope, $cookies, $compile, User) {
	return {
		restrict: 'E',
		template: '<div class="nav pull-right login"></div>',
		replace: true,
		controller: function($scope, $cookies, $location, User) {

			$scope.user = User.get(function(data) {
				$scope.$emit('user');
			});
			$scope.loginPopUpClosed = function() {
				$scope.user = User.get(function() {
					$scope.$emit('user'); 
				});
			};

			$scope.facebookConnect = function() {
				window.open('/auth/facebook', 'SignIn', 'width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0').focus();
				return false;
			};
			$scope.facebookUnConnect = function() {
				window.open('/logout', 'SignOut', 'width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0').focus();
				return false;
			};

		},
		link: function(scope, elm, attrs) {
			function render(user) {
				if (user && user.id) {
					elm.html('<a href="#/profile">Hello ' + user.name.givenName + '<img src="http://graph.facebook.com/' + user.id + '/picture?type=square" width=50 height=50 /></a> <a class="logout btn-inverse btn-mini btn" ng-click="facebookUnConnect()"">Logout</a>');
				} else {
					elm.html('<a ng-click="facebookConnect()">Connect with<img src="img/fb-logo50.png" /></a>');
				}
			}

			scope.$on('user', function() {
				render(scope.user);
				$compile(elm)(scope);
			});
		}
	};
})
.directive('day', function() {
	return {
		restrict: 'E',
		template: '<li class="span3 well"></li>',
		replace: true,
		link: function(scope, elm, attrs) {
			console.log(attrs);
			elm.append('<h3>'+attrs.date+'</h3>');
			elm.append('<div class="btn-group"><button class="btn btn-success"><i class="icon-home icon-white"></i></button><button class="btn btn-info"><i class="icon-search icon-white"></i></button><button class="btn btn-inverse"><i class="icon-briefcase icon-white"></i></button></div>');
		}
	};
});