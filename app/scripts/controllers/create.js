'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
.controller('CreateCtrl', ['$scope', 'threeD', 'dmhModal' ,function ($scope, threeD, dmhModal) {

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
            threeD.getScreenshotURL().then(function (screenshotURL) {
                  dmhModal.saveCreation(screenshotURL);
            });
      };

      $scope.fbShare = function () {

      };
}]);
