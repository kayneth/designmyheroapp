'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:ShowcreationCtrl
 * @description
 * # ShowcreationCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('ShowcreationCtrl', ['$rootScope','$scope','threeD', 'dmhToast', 'dmhModal','$http','$routeParams','basket', 'creation', '$q', 'lodash', function ($rootScope, $scope, threeD, dmhToast, dmhModal, $http, $routeParams, basket, creation, $q, lodash) {
      $scope.params = $routeParams;


      $http.get($rootScope.api+'/creations/'+$scope.params.id).then(function(res) {
          //Creation loadé et à ne pas modifier
          $scope.creation = $rootScope.creation = res.data.creation;
          //Clone éditable
          $scope.creationEditable = creation.visualCreation = JSON.parse(JSON.stringify($scope.creation));
          threeD.loadProducts($scope.creationEditable);
      });

      var canvas = document.getElementById('designScene');
      $scope.threeD = threeD;

      threeD.initialize(canvas);
      var scene = threeD.createScene();
      threeD.render();
      threeD.resize();

      $scope.saveCurrentCostume = function () {
          var deffered = $q.defer();

          var error;

          if(threeD.models.length == 0 )
          {
              error = "Vous devez sélectionner au moins un élément.";
              deffered.reject(error);
              dmhToast.create(error, "warning");
              return ;
          }else if(!$scope.isModify()){
              error = "Vous devez au moins modifier un élément.";
              deffered.reject(error);
              dmhToast.create(error, "warning");
              return;
          }
          threeD.toBlob().then(function (res) {
              console.log(res.url);
              console.log(res.blob);
              dmhModal.saveCreation(res.url, res.blob);
              deffered.resolve("success");
          });

          return deffered.promise;
      };

      $scope.addBasketItem = function () {
          if($scope.isModify()){
              $scope.saveCurrentCostume().then(function (res) {
                  basket.addItem(creation.currentCreation);
                  basket.updateLocalStorage();
              });
              return;
          }
          basket.addItem(creation.currentCreation);
          basket.updateLocalStorage();
      };
      /**
       * @returns {boolean}
       */
      $scope.isModify = function () {
          var a = $scope.creation.products;
          var b = creation.visualCreation.products;
          console.log(a);
          console.log(b);

          if (a.length != b.length) return true;

          return !lodash.isEqual(a, b);
      }
  }]);
