'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.dmhToast
 * @description
 * # dmhToast
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('dmhToast', ['ngToast', function (ngToast) {
  var scope = this;

  scope.create = function (content, classname, dismiseOnTimeout) {
    dismiseOnTimeout = dismiseOnTimeout || true;
    classname = classname || '';

    ngToast.create({
      content: content,
      timeout: 4000,
      dismissOnTimeout: dismiseOnTimeout,
      dismissButton: true,
      animation: 'slide'
    })
  };
}]);
