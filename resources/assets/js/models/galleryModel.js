myApp.factory('galleryModel', ['$http', '$location', '$log', function($http, $location, $log) {
	var galleryModel = {};

	galleryModel.saveGallery = function(galleryData) {
		$http({
			method: 'POST',
			url: baseUrl + 'gallery/save',
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