'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.productModel
 * @description
 * # productModel
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
  .service('productModel', ['$rootScope', '$q', '$http', function ($rootScope,$q, $http) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var scope = this;

    scope.getModels = function () {
        var deferred = $q.defer();

        $http.get($rootScope.api+'/products', {skipAuthorization: true}).then(function(res) {
            deferred.resolve(res.data);
        }, function (res) {
            deferred.reject(res);
        });

        return deferred.promise;
    };

  }]);
