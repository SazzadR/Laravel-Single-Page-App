var myApp = angular.module('myApp', ['ngRoute', 'ngCookies', 'bootstrapLightbox']);

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/users/login.html',
        controller: 'usersController',
        authenticated: false
    });

    $routeProvider.when('/dashboard', {
        templateUrl: 'templates/users/dashboard.html',
        controller: 'usersController',
        authenticated: true
    });

    $routeProvider.when('/gallery/view', {
        templateUrl: 'templates/gallery/gallery-view.html',
        controller: 'galleryController',
        resolve: {
            data: function (galleryModel) {
                return {
                    galleries: galleryModel.getAllGalleries()
                };
            }
        },
        authenticated: true
    });

    $routeProvider.when('/gallery/view/:galleryID', {
        templateUrl: 'templates/gallery/gallery-single.html',
        controller: 'galleryController',
        resolve: {
            data: function (galleryModel, $route) {
                return {
                    singleGallery: galleryModel.getGalleryById($route.current.params.galleryID)
                };
            }
        },
        authenticated: true
    });

    $routeProvider.when('/gallery/add', {
        templateUrl: 'templates/gallery/gallery-add.html',
        controller: 'galleryController',
        resolve: {
            data: function () {
                return null
            }
        },
        authenticated: true
    });

    $routeProvider.otherwise('/');
}]);

myApp.run(['$rootScope', '$location', '$log', 'usersModel', function ($rootScope, $location, $log, usersModel) {
    $rootScope.$on('$routeChangeStart', function (event, next) {

        if (angular.isDefined(next.$$route)) {
            if (next.$$route.authenticated) {
                if (!usersModel.routeAuthStatus()) {
                    $location.path('/');
                }
            }

            if (!next.$$route.authenticated) {
                if (usersModel.routeAuthStatus()) {
                    $location.path('/dashboard');
                }
            }
        }
    });
}]);

myApp.directive('dropzone', function () {
    return function (scope, element, attrs) {
        var config, dropzone;

        config = scope[attrs.dropzone];

        // create a Dropzone for the element with the given options
        dropzone = new Dropzone(element[0], config.options);

        // bind the given event handlers
        angular.forEach(config.eventHandlers, function (handler, event) {
            dropzone.on(event, handler);
        });
    };
});