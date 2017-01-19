myApp.factory('galleryModel', ['$http', '$location', '$log', function($http, $location, $log) {
	var galleryModel = {};

	galleryModel.getAllGalleries = function() {
		return $http.get(baseUrl + 'galleries');
	};

	galleryModel.getGalleryById = function(galleryID) {
		return $http.get(baseUrl + 'gallery/' + galleryID);
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

	galleryModel.deleteImage = function (galleryId, imageId) {
		// $log.log(baseUrl + 'delete-image/' + imageId);
		$http.delete(baseUrl + 'gallery/' + galleryId + '/delete-image/' + imageId).then(function (successResponse) {
			$log.log(successResponse);
        });
    };

	return galleryModel;
}]);