'use strict';

/**
 * @ngdoc directive
 * @name designmyheroappApp.directive:toggleClass
 * @description
 * # toggleClass
 */
angular.module('designmyheroappApp')
  .directive('toggleClass', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          element.bind('click', function() {
              element.toggleClass(attrs.toggleClass);
          })
      }
    };
  });
