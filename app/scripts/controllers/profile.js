'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('ProfileCtrl', ['$scope', '$rootScope', 'dmhAuthManager', function ($scope, $rootScope, dmhAuthManager) {

      $scope.authManager = dmhAuthManager;

  }]);
