'use strict';

/**
 * @ngdoc overview
 * @name designmyheroappApp
 * @description
 * # designmyheroappApp
 *
 * Main module of the application.
 */
angular
.module('designmyheroappApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-jwt',
    'ngDialog'
])
.run(['$rootScope', '$location', 'dmhAuthManager', function($rootScope, $location, dmhAuthManager) {

    $rootScope.apiRoot = "http://127.0.0.1:8000";
    // $rootScope.apiRoot = "http://api.designmyhero.iut-lepuy.fr";
    $rootScope.api =$rootScope.apiRoot+"/api";

    dmhAuthManager.initialize();

    $rootScope.$on('tokenHasExpired', function() {
        $rootScope.$broadcast('unauthenticated');
        dmhAuthManager.refreshToken();
    });

}])
.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl',
            controllerAs: 'main'
        })
        .when('/create', {
            templateUrl: 'views/create.html',
            controller: 'CreateCtrl',
            controllerAs: 'create'
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl',
            controllerAs: 'profile',
            data: {
                requiresLogin: true
            }
        })
        .when('/latestcrea', {
          templateUrl: 'views/latestcrea.html',
          controller: 'LatestcreaCtrl',
          controllerAs: 'latestcrea'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.config(function Config($httpProvider, jwtOptionsProvider) {
    // Please note we're annotating the function so that the $injector works when the file is minified
    jwtOptionsProvider.config({
        whiteListedDomains: ['127.0.0.1', 'localhost', 'api.designmyhero.iut-lepuy.fr', 'iut-lepuy.fr', 'designmyhero.iut-lepuy.fr'],
        unauthenticatedRedirectPath: '/login',

        tokenGetter: ['options','$http', 'jwtHelper', function(options, $http, jwtHelper) {
            // Skip authentication for any requests ending in .html
            if (options && options.url.substr(options.url.length - 5) === '.html') {
                return null;
            }

            var access_token = localStorage.getItem('access_token');
            var refreshToken = localStorage.getItem('refresh_token');

            return access_token;
        }]
    });

    $httpProvider.interceptors.push('jwtInterceptor');
})
;