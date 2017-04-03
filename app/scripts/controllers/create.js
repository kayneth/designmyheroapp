'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
.controller('CreateCtrl', ['$scope', 'threeD',function ($scope, threeD) {

      var canvas = document.getElementById('designScene');
      $scope.threeD = threeD;

      threeD.initialize(canvas);
      var scene = threeD.createScene();
      threeD.render();
      threeD.resize();

      $scope.screenshot = function () {
            // threeD.screenshot();
            threeD.createScreenshot3D(threeD.engine, {
                  width: 512,
                  height: 512
            }, function(ssCanvas) {
                  $scope.screenshot = ssCanvas.toDataURL();
                  document.getElementById('preview2D').src = this.screenshot;
            }.bind(this), threeD.camera);
            // threeD.toBlob();
            // document.getElementById('preview2D').src = threeD.preview2D;
      };
}]);
