'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.basket
 * @description
 * # basket
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('basket', ['$rootScope', function ($rootScope) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var scope = this;

  scope.basket = {
    items: []
  };

  scope.addItem = function (item) {
      if(scope.inBasket(scope.basket.items, item))
      {

      }
      scope.basket.items.push({creation: item, quantity: 1});
      console.log(scope.getSize());
      console.log(scope.basket);
  };

  scope.removeItem = function (item) {
      var array = scope.basket.items;
      var index = array.indexOf(item);
      if (index > -1) {
          array.splice(index, 1);
      }
  };

    scope.removeByCategory = function (type) {
        scope.basket.items.forEach(function (element, index, array) {
            if(element.category.name == type)
            {
                array.splice(index, 1);
            }
        });
    };

  scope.load = function (idUser) {

  };

  scope.inBasket = function (arr, item) {
      return (arr.indexOf(item) != -1);
  };

  scope.getSize = function () {
      return scope.basket.items.length;
  };

  scope.updateLocalStorage = function () {
      var basket =  scope.basket;
      localStorage.setItem("basket", JSON.stringify(basket));
  };

  scope.patchBasket = function () {

  };

  scope.deleteItemApi = function () {

  };

}]);
