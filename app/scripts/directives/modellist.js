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


            productModel.getModels().then(function (data) {
                console.log(data);
                $scope.models = data.products;
            }, function (res) {
                console.log(res);
            });

            $scope.toggleModel = function ($event, model) {
                var classname = 'active'
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
