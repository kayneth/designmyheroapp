'use strict';

/**
 * @ngdoc directive
 * @name designmyheroappApp.directive:fbShare
 * @description
 * # fbShare
 */
angular.module('designmyheroappApp')
.directive('fbShare', function () {
    return {
        templateUrl: 'views/directives/fbShare.html',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            //https://github.com/Ciul/angular-facebook
            //https://developers.facebook.com/docs/javascript/examples
            //https://developers.facebook.com/docs/graph-api/reference/v2.8/post
            //https://developers.facebook.com/docs/graph-api/photo-uploads
            //http://stackoverflow.com/questions/7524585/how-do-i-get-the-information-from-a-meta-tag-with-javascript
        }
    };
});
