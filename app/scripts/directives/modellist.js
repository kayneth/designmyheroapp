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
        controller: ['$scope', '$rootScope', '$http', 'productModel', function ($scope, $rootScope, $http, productModel) {
            $scope.models = {};

            $scope.getModelList = function () {
                productModel.getModels().then(function (data) {
                    console.log(data);
                    $scope.models = data.products;
                }, function (res) {
                    console.log(res);
                })
            };

            $scope.showModel = function (model) {
                $rootScope.$broadcast("show-model", model);
            };

            $scope.getModelList();
        }]
    };
  });
