'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
.controller('CreateCtrl', ['$scope', 'threeD', 'dmhModal', 'dmhToast', function ($scope, threeD, dmhModal, dmhToast) {

      var canvas = document.getElementById('designScene');
      $scope.threeD = threeD;

      threeD.initialize(canvas);
      var scene = threeD.createScene();
      threeD.render();
      threeD.resize();

      $scope.getScreenshot = function () {
            threeD.createScreenshot3D(threeD.engine, null, function(ssCanvas) {
                  console.log(ssCanvas);
                  $scope.screenshot = ssCanvas.toDataURL();
                  document.getElementById('preview2D').src = this.screenshot;
            }.bind(this));
      };

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

      $scope.fbShare = function () {

      };
}]);
