'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:ShowcreationCtrl
 * @description
 * # ShowcreationCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('ShowcreationCtrl', ['$rootScope','$scope','threeD', 'dmhToast', 'dmhModal','$http','$routeParams', function ($rootScope, $scope, threeD, dmhToast, dmhModal, $http, $routeParams) {
      $scope.params = $routeParams;


      $http.get($rootScope.api+'/creations/'+$scope.params.id).then(function(res) {
          console.log(res);
          $scope.creation = $rootScope.creation = res.data.creation;
          console.log($scope.creation);
          $scope.ready = true;

          threeD.loadProducts($scope.creation.products);
      });

      var canvas = document.getElementById('designScene');
      $scope.threeD = threeD;

      threeD.initialize(canvas);
      var scene = threeD.createScene();
      threeD.render();
      threeD.resize();

      $scope.saveCurrentCostume = function () {
          if(threeD.models.length == 0)
          {
              dmhToast.create("Vous devez sélectionner au moins un élément.", "warning");
              return ;
          }
          threeD.toBlob().then(function (res) {
              console.log(res.url);
              console.log(res.blob);
              dmhModal.saveCreation(res.url, res.blob);
          });
      };
  }]);
