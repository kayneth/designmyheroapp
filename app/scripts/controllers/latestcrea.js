'use strict';

/**
 * @ngdoc function
 * @name designmyheroappApp.controller:LatestcreaCtrl
 * @description
 * # LatestcreaCtrl
 * Controller of the designmyheroappApp
 */
angular.module('designmyheroappApp')
  .controller('LatestcreaCtrl', ['$scope', function ($scope) {
    $scope.lastcrea=[
    //{
    ////    name: 'Costume médiéval',
    ////    user: {
    ////        username: 'Estelle'
    ////    },
    ////    preview: {
    ////        url: "../images/medieval.jpg"
    ////    }
    ////},
    ////    {
    ////        name: 'Costume alternatif',
    ////        user: {
    ////            username: 'Giselle'
    ////        },
    ////        preview: {
    ////            url: "../images/girl.jpg"
    ////        }
    ////    },
        {
            name: 'Costume classique',
            user: {
                username: 'Roberto'
            },
            preview: {
                url: "../images/crea_costume_1.png"
            }
        },
        {
            name: 'Pilote Rogue Squadron',
            user: {
                username: 'Gibbs Darklighter'
            },
            preview: {
                url: "../images/crea_costume_2.png"
            }
        },
        {
            name: 'Pilote inconnu',
            user: {
                username: 'Anonymous'
            },
            preview: {
                url: "../images/crea_costume_3.png"
            }
        }

        ];
  }]);
