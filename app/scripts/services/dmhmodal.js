'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.dmhModal
 * @description
 * # dmhModal
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('dmhModal', ['ngDialog', 'dmhAuthManager','dmhToast', function (ngDialog, dmhAuthManager, dmhToast) {
// AngularJS will instantiate a singleton by calling "new" on this function

    var scope = this;

    scope.login = function () {
        var dialog = ngDialog.open({
        template: 'views/modals/login.html',
        controller: ['$scope', 'dmhAuthManager', function($scope, dmhAuthManager) {
            $scope.user = {
                '_username' : "",
                '_password' : ""
            };

            $scope.loginApi = function() {
                console.log($scope.user);
                dmhAuthManager.login($scope.user).then(function (res) {
                    dialog.close();
                });
            };

            $scope.register = function () {
                $http.post($rootScope.api + '/register', $scope.registeringUser, {skipAuthorization: true}).then(function success(res) {
                    console.log(res);
                    // $scope.user._username = $scope.registeringUser.username;
                    // $scope.user._password = $scope.registeringUser.plainPassword.first;
                    // $scope.loginApi();
                }, function error(res) {
                    console.log(res);
                });
            };
        }]
      })
    };

    scope.saveCreation = function (screenshot, blob) {
      var dialog = ngDialog.open({
          template: 'views/modals/saveCreation.html',
          controller: ['$scope', 'creation', function ($scope, creation) {
              $scope.creation = creation.currentCreation;
              $scope.screenshot = screenshot;
              $scope.creation.preview = blob;
              $scope.postCreation = function () {
                  creation.post(creation.currentCreation).then(function (res) {
                      var toast = dmhToast.create('Sauvegarde réussie');
                      dialog.close();
                  }, function (res) {
                      dmhToast.create('Une erreur est survenue lors de la sauvegarde.', "danger")
                  });
              }
          }]
      });
    };


}]);
