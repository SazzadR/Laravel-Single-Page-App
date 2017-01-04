myApp.controller('galleryController', ['$scope', '$location', '$timeout', '$log', 'galleryModel', function($scope, $location, $timeout, $log, galleryModel) {
	angular.extend($scope, {
		newGallery: {},
		errorDiv: false,
		errorMessages: []
	});

	galleryModel.getAllGalleries().then(function(successResponse) {
		$scope.galleries = successResponse.data;
		$scope.showGalleries = true;
	});

	angular.extend($scope, {
		saveNewGallery: function(addGalleryForm) {
			if (addGalleryForm.$valid) {
				$scope.submitWithError = false;
				galleryModel.saveGallery($scope.newGallery);
			} else {
				$scope.submitWithError = true;
			}
		}
	});
}]);