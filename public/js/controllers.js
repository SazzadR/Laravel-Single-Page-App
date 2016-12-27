myApp.controller('globalController', ['$scope', '$log', function($scope, $log) {
	$scope.globals = {};
	$scope.globals.navTemplate = 'templates/partials/nav.html';
}]);
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
myApp.controller('navController', ['$scope', '$log', 'usersModel', function($scope, $nav, usersModel) {
	/*variables*/
	angular.extend($scope, {
		user: usersModel.getUserObject(),
		navigations: [
			{
				menuName: 'Home',
				url: '/#!/dashboard',
				submenu: [
					{
						menuName: 'View Gallery',
						url: '/#!/gallery/view'
					},
					{
						menuName: 'Add Gallery',
						url: '/#!/gallery/add'
					}
				]
			},
			{
				menuName: 'Test',
				url: '/#!/test'
			}
		]
	});
}]);
//# sourceMappingURL=controllers.js.map
