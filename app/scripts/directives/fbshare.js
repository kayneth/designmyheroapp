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
        },
        controller: ['$scope', '$rootScope', 'dmhToast', function ($scope, $rootScope, dmhToast) {
            $scope.shareModal = function () {
                var username = $rootScope.creation.user ? $rootScope.creation.user.username : "un utilisateur anonyme";

                try{
                    FB.ui(
                        {
                            method: 'share',
                            href: $rootScope.absUrl,     // The same than link in feed method
                            title: $rootScope.creation.name,  // The same than name in feed method
                            picture: $rootScope.apiRoot+'/'+$rootScope.creation.previewLink,
                            caption: 'créé par '+ username,
                            description: '"'+$rootScope.creation.name +'" réalisé avec l\'application DesignMyHero. Venez personnaliser vos costumes et acheter vos patrons de coutures !'
                        },
                        function(response){
                            console.log(response);
                        });
                }catch (e) {
                    dmhToast.create('Vous êtes hors connexion');
                }

            };

        }]
    };
});
