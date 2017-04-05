'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('MainCtrl', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.lastcrea=[];

    $http({
      url: $rootScope.api + '/creations?limit=2&sort=desc',
      method: 'GET'
    },{
      skipAuthorization: true
    }).then(function (res) {
      console.log(res);
      $scope.lastcrea = res.data.creations;
    }, function (err) {
      console.log(err);
    });

  }]);
