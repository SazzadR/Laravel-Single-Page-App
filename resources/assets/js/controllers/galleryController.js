myApp.controller('galleryController', ['$scope', '$location', '$timeout', '$routeParams', '$log', 'galleryModel', 'Lightbox', 'data', function ($scope, $location, $timeout, $routeParams, $log, galleryModel, Lightbox, data) {
    angular.extend($scope, {
        newGallery: {},
        singleGallery: {},
        dropzoneConfig: {
            'options': { // passed into the Dropzone constructor
                'url': baseUrl + 'upload-file'
            },
            'eventHandlers': {
                'sending': function (file, xhr, formData) {
                    formData.append('_token', csrfToken);
                    formData.append('galleryID', $routeParams.galleryID);
                },
                'success': function (file, response) {
                    $scope.singleGallery.images.push(response);
                    $scope.$emit('imageAdded', $scope.singleGallery);
                }
            }
        },
        errorDiv: false,
        errorMessages: []
    });

    $scope.$on('imageAdded', function (event, args) {
        $scope.singleGallery = args;
        $scope.$apply();
    });

    if (data && data.galleries != undefined) {
        data.galleries.then(function (successResponse) {
            $scope.galleries = successResponse.data;
            $scope.showGalleries = true;
            $log.log($scope.galleries);
        });
    }

    if ($routeParams.galleryID) {
        if (data && data.singleGallery != undefined) {
            data.singleGallery.then(function (successResponse) {
                $scope.singleGallery = successResponse.data;
                $scope.showGallery = true;
            })
        }
    }

    angular.extend($scope, {
        saveNewGallery: function (addGalleryForm) {
            if (addGalleryForm.$valid) {
                $scope.submitWithError = false;
                galleryModel.saveGallery($scope.newGallery);
            } else {
                $scope.submitWithError = true;
            }
        },

        viewGallery: function (galleryID) {
            $location.path('/gallery/view/' + galleryID);
        },

        deleteImage: function (imageId) {
            var galleryId = $routeParams.galleryID;
            galleryModel.deleteImage(galleryId, imageId).then(function (successResponse) {
                $scope.singleGallery = successResponse.data.updatedGallery;
            });
        },

        openLightboxModal: function (index) {
            Lightbox.openModal($scope.singleGallery.images, index);
        }
    });
}]);