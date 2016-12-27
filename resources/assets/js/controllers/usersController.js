myApp.controller('usersController', ['$scope', '$log', 'usersModel', function($scope, $log, usersModel) {
	angular.extend($scope, {
		loginUser: function() {
			var credentials = {
				email: $scope.email,
				password: $scope.password
			};

			usersModel.attemptLogin(credentials);
		},

		logoutUser: function() {
			usersModel.attemptLogout();
		}
	});
}]);