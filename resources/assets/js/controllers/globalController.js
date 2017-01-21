myApp.controller('globalController', ['$scope', '$log', function ($scope, $log) {
    $scope.globals = {};
    $scope.globals.navTemplate = 'templates/partials/nav.html';
}]);