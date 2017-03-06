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
    'ngTouch'
  ])
    .run(['$rootScope', '$location', function($rootScope, $location) {

    //$rootScope.apiRoot = "http://127.0.0.1:8000";
    $rootScope.apiRoot = "http://api.sharecrea.iut-lepuy.fr";
    $rootScope.api = $rootScope.apiRoot+"/api";

    }])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl',
                controllerAs: 'main'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
;