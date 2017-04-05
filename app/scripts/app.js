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
    'ngDialog',
    'duScroll',
    'ngToast',
    'ngLodash'
])
.run(['$rootScope', '$location', 'dmhAuthManager','basket', function($rootScope, $location, dmhAuthManager, basket) {

    $rootScope.apiRoot = "http://127.0.0.1:8000";
    // $rootScope.apiRoot = "http://api.designmyhero.iut-lepuy.fr";
    $rootScope.api =$rootScope.apiRoot+"/api";

    $rootScope.absUrl = $location.absUrl();

    dmhAuthManager.initialize();

    $rootScope.basket = basket;

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
        .when('/creation/:id', {
          templateUrl: 'views/showcreation.html',
          controller: 'ShowcreationCtrl',
          controllerAs: 'showCreation'
        })
        .when('/basket', {
          templateUrl: 'views/basket.html',
          controller: 'BasketCtrl',
          controllerAs: 'basket'
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