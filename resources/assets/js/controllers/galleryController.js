myApp.controller('galleryController', ['$scope', '$location', '$log', 'galleryModel', function($scope, $location, $log, galleryModel) {
	angular.extend($scope, {
		newGallery: {},
		errorDiv: false,
		errorMessages: []
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