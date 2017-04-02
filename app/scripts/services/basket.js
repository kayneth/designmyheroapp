'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.basket
 * @description
 * # basket
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('basket', function () {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var scope = this;

  scope.basket = {
    costumes: []
  };

  scope.addItem = function (product) {

  };

  scope.removeItem = function (name) {

  };

  scope.load = function (idUser) {

  };

  scope.getSize = function () {
    return scope.basket.costumes.length;
  };

});
