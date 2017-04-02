'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:NavbarCtrl
 * @description
 * # NavbarCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('NavbarCtrl', ['$rootScope', '$scope', '$location', 'dmhAuthManager', 'dmhModal', function ($rootScope, $scope, $location, dmhAuthManager, dmhModal) {

      $scope.account = function () {
          if($rootScope.isAuthenticated)
          {
              $location.path('/profile');
          }else{
              dmhModal.login();
          }
      };


  }]);
