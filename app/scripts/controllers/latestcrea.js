'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:LatestcreaCtrl
 * @description
 * # LatestcreaCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('LatestcreaCtrl', ['$rootScope','$scope','$http', function ($rootScope, $scope, $http) {

    $scope.lastcrea=[];

      $http({
          url: $rootScope.api + '/creations',
          method: 'GET'
      },{
          skipAuthorization: true
      }).then(function (res) {
          $scope.lastcrea = res.data.creations;
      }, function (err) {
          console.log(err);
      });
  }]);
