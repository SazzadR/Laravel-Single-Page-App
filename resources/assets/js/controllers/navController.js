myApp.controller('navController', ['$scope', '$location', '$log', 'usersModel', function($scope, $location, $log, usersModel) {
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
			}
		]
	});

	/*methods*/
	angular.extend($scope, {
		checkActiveLink: function(routeLink) {
			var requestLink = '/#!' + $location.path();

			if (requestLink == routeLink) {
				return 'make-active';
			}
		}
	});
}]);