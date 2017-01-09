myApp.controller('galleryController', ['$scope', '$location', '$timeout', '$routeParams', '$log', 'galleryModel', function($scope, $location, $timeout, $routeParams, $log, galleryModel) {
	angular.extend($scope, {
		newGallery: {},
		singleGallery: {},
		errorDiv: false,
		errorMessages: []
	});

	galleryModel.getAllGalleries().then(function(successResponse) {
		$scope.galleries = successResponse.data;
		$scope.showGalleries = true;
	});

	if ($routeParams.galleryID) {
		galleryModel.getGalleryById($routeParams.galleryID).then(function(successResponse) {
			$scope.singleGallery = successResponse.data;
			$scope.showGallery = true;
        });
	}

	angular.extend($scope, {
		saveNewGallery: function(addGalleryForm) {
			if (addGalleryForm.$valid) {
				$scope.submitWithError = false;
				galleryModel.saveGallery($scope.newGallery);
			} else {
				$scope.submitWithError = true;
			}
		},

		viewGallery: function(galleryID) {
			$location.path('/gallery/view/' + galleryID);
		}
	});
}]);