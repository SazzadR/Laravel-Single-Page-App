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