'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.creation
 * @description
 * # creation
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('creation', ['$q','$http','$rootScope', 'toFormData', function ($q, $http, $rootScope, toFormData) {

    var scope = this;

    scope.visualCreation = {};

    scope.currentCreation = {
      name: "Ma superbe création",
      products: [],
      private: false
    };

    scope.getCreations = function ()
    {
    var deffered = $q.defer();

    return deffered.promise;
    };

    scope.post = function (creation) {
      var deffered = $q.defer();

      creation = creation || scope.currentCreation;

      console.log(creation);

      var form_data = new FormData();
      toFormData.getFormData(form_data, creation);

      form_data.append('preview', creation.preview, scope.convertToSlug(creation.name));

      toFormData.log(form_data);

      $http({
          method: 'POST',
          url : $rootScope.api + '/creations',
          data: form_data,
          //assign content-type as undefined, the browser
          //will assign the correct boundary for us
          headers: { 'Content-Type': undefined},
          //prevents serializing payload.  don't do it.
          transformRequest: angular.identity,
      },{
          skipAuthorization: true
      }).then(function (res) {
        console.log(res);
          deffered.resolve(res);
      }, function (res) {
          console.log(res);
          deffered.reject(res);
      });

      return deffered.promise;
    };

    $rootScope.$on('authenticated', function () {
      scope.currentCreation.private = true;
    });

    scope.convertToSlug = function (Text) {
        return Text
            .toLowerCase()
            .replace(/[^\w ]+/g,'')
            .replace(/ +/g,'-')
            ;
    }

}]);
