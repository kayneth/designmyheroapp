'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:CreateCtrl
 * @description
 * # CreateCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('CreateCtrl', ['threeD',function (threeD) {

      var canvas = document.getElementById('designScene');

      threeD.initialize(canvas);
      var scene = threeD.createScene();
      threeD.render();
      threeD.resize();

  }]);
