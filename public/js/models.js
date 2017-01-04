myApp.factory('usersModel', ['$http', '$cookies', '$location', '$log', function($http, $cookies, $location, $log) {
	var usersModel = {};

	usersModel.attemptLogin = function(credentials) {
		$http({
			method: 'POST',
			url: baseUrl + 'auth/login',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				email: credentials.email,
				password: credentials.password
			}
		}).then(function(successResponse) {
			$cookies.put('auth', JSON.stringify(successResponse.data));
			$location.path('/dashboard');
		}, function(errorResponse) {
			alert(errorResponse.data);
		});
	};

	usersModel.attemptLogout = function() {
		$cookies.remove('auth');
		$location.path('/');
	}

	usersModel.routeAuthStatus = function() {
		var status = $cookies.get('auth');

		if (status) {
			return true;
		} else {
			return false;
		}
	};

	usersModel.getUserObject = function() {
		return angular.fromJson($cookies.get('auth'));
	};

	return usersModel;
}]);
myApp.factory('galleryModel', ['$http', '$location', '$log', function($http, $location, $log) {
	var galleryModel = {};

	galleryModel.getAllGalleries = function() {
		return $http.get(baseUrl + 'galleries');
	};

	galleryModel.saveGallery = function(galleryData) {
		$http({
			method: 'POST',
			url: baseUrl + 'galleries',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				name: galleryData.name
			}
		}).then(function(successResponse) {
			$location.path('/gallery/view');
		}, function(errorResponse) {
			log.log(errorResponse)
		});
	};

	return galleryModel;
}]);
//# sourceMappingURL=models.js.map
