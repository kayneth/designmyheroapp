'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.creation
 * @description
 * # creation
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('creation', function ($q, $http) {

  var scope = this;

  scope.getCreations = function ()
  {
    var deffered = $q.defer();

    return deffered.promise();
  };

  scope.post = function (creation, isPublic) {

  };

});
