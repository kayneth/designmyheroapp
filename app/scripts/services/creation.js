'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.creation
 * @description
 * # creation
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('creation', ['$q','$http','$rootScope', function ($q, $http, $rootScope) {

  var scope = this;

  scope.currentCreation = {
      name: "Ma superbe création",
      products: [],
      private: false
  };

  scope.getCreations = function ()
  {
    var deffered = $q.defer();

    return deffered.promise();
  };

  scope.post = function (creation) {
      console.log(creation);

      creation = creation || scope.currentCreatio;

      // $http.post($rootScope.api + '/creations', creation, {skipAuthorization: true}).then(function (res) {
      //   console.log(res);
      // }, function (res) {
      //     console.log(res);
      // });
  };

  $rootScope.$on('authenticated', function () {
      scope.currentCreation.private = true;
  })

}]);
