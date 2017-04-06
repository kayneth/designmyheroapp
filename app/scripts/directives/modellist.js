'use strict';

/**
 * @ngdoc directive
 * @name designmyheroappApp.directive:modelList
 * @description
 * # modelList
 */
angular.module('designmyheroappApp')
  .directive('modelList', function () {
    return {
        templateUrl: 'views/directives/modelList.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {

        },
        scope: {

        },
        controller: ['$scope', '$rootScope', '$http', 'productModel', '$q', function ($scope, $rootScope, $http, productModel, $q) {
            $scope.models = {};
            $scope.products = [];

            $scope.getProductsByCategoryId = function (item) {
                console.log(item);
                var id = item;
                var cat = $scope.categories[id];
                return $scope.products[cat.id];
                // loadProductByCategory(cat).then(function (res) {
                //     return res;
                // });
            };

            $http.get($rootScope.api+'/categories', {skipAuthorization: true}).then(function(res) {
                $scope.categories = res.data.categories;
                loadProductByCategory($scope.categories[0]);
                $scope.categories.forEach(function (element, index) {
                    $scope.products[element.id] = [];
                });

                productModel.getModels().then(function (data) {
                    $scope.models = data.products;
                    data.products.forEach(function (element, index) {
                        $scope.products[element.category.id].push(element);
                    });
                }, function (res) {
                    console.log(res);
                });

            });

            function loadProductByCategory(category) {
                var deffered = $q.defer();
                $http.get($rootScope.api+'/categories/'+category.id+'/products', {skipAuthorization: true}).then(function (res) {
                    console.log(res);
                    $scope.products[category.id] =  res.data.products;
                    deffered.resolve(res.data.products);
                });
                return deffered.promise;
            }



            $scope.toggleModel = function ($event, model) {
                var classname = 'active';
                var classList = $event.currentTarget.classList;
                var isActive = classList.contains(classname);

                if(isActive)
                {
                    classList.remove(classname);
                    $rootScope.$broadcast("remove-model", model);
                }else{
                    classList.add(classname);
                    $rootScope.$broadcast("show-model", model);
                }

            };
        }]
    };
  });
