var myApp = angular.module('myApp', ['ngRoute', 'ngCookies']);

myApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
		templateUrl: 'templates/users/login.html',
		controller: 'usersController',
		authenticated: false
	});

	$routeProvider.when('/dashboard', {
		templateUrl: 'templates/users/dashboard.html',
		controller: 'usersController',
		authenticated: true
	});

	$routeProvider.when('/logout', {
		templateUrl: 'templates/users/logout.html',
		controller: 'usersController',
		authenticated: true
	});

	$routeProvider.otherwise('/');
}]);

myApp.run(['$rootScope', '$location', '$log', 'usersModel', function($rootScope, $location, $log, usersModel) {
	$rootScope.$on('$routeChangeStart', function(event, next) {

		if (angular.isDefined(next.$$route)) {
			if (next.$$route.authenticated) {
				if (!usersModel.routeAuthStatus()) {
					$location.path('/');
				}
			}

			if (!next.$$route.authenticated) {
				if (usersModel.routeAuthStatus()) {
					$location.path('/dashboard');
				}
			}
		}
	});
}]);
//# sourceMappingURL=app.js.map
