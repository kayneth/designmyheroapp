'use strict';

/**
 * @ngdoc service
 * @name designmyheroappApp.dmhAuthManager
 * @description
 * # dmhAuthManager
 * Service in the designmyheroappApp.
 */
angular.module('designmyheroappApp')
.service('dmhAuthManager', ['$http', '$rootScope', 'authManager', 'jwtHelper', '$location', 'dmhToast', '$q', function ($http, $rootScope, authManager,jwtHelper, $location, dmhToast, $q) {
  // AngularJS will instantiate a singleton by calling "new" on this function
  var scope = this;

  scope.access_token = localStorage.getItem('access_token');
  //scope.expTime = jwtHelper.getTokenExpirationDate(scope.access_token);

  scope.initialize = function () {
    authManager.checkAuthOnRefresh();
    // authManager.redirectWhenUnauthenticated();

    scope.onAuth();
    scope.onTokenHasExpired();
  };

  scope.refreshToken = function (refreshToken) {
    refreshToken = refreshToken || localStorage.getItem("refresh_token");

    $http({
      url: $rootScope.api+'/token/refresh',
      skipAuthorization: true,
      method: 'POST',
      refresh_token : refreshToken,
      data: {"refresh_token" : refreshToken}
    }).then(function(res) {

      var jwt = res.data.token;

      jwtHelper.getTokenExpirationDate(jwt);

      localStorage.setItem('access_token', res.data.token);
      localStorage.setItem('refresh_token', res.data.refresh_token);
      localStorage.setItem('roles', res.data.data.roles);

      $rootScope.$broadcast('authenticated');

      return jwt;

    }, function (res) {
      console.log(res);
    });
  };

  scope.login = function (user) {

    var deffered = $q.defer();

    $http.post($rootScope.api + '/login_check', user).then(function success(res) {
      console.log(res);

      deffered.resolve(res);

      scope.access_token = res.data.token;

      var roles = jwtHelper.decodeToken(scope.access_token).roles;
      var username = jwtHelper.decodeToken(scope.access_token).username;

      //On stocke en Localstorage les data pour une utilisation futur
      localStorage.setItem("access_token", res.data.token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      localStorage.setItem('roles', roles);
      localStorage.setItem('username', username);

      $rootScope.$broadcast('authenticated');

      dmhToast.create('Vous êtes bien connecté en tant que ' + username);

      $location.path('/');

    }, function error(res) {
      console.log(res);
      deffered.reject(res);
    });
    
    return deffered.promise;
  };

  scope.logout = function () {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem('roles');
    $location.path('/');
    $rootScope.$broadcast('unauthenticated');
    $rootScope.isAuthenticated = false;
    dmhToast.create('Vous êtes bien déconnecté. En espérant vous revoir très bientôt !');
  };

  scope.isAdmin = function () {
    try {
      var roles = jwtHelper.decodeToken(scope.access_token).roles;
    }catch (e){

    }

    if(roles != null)
    {
      var hasRoleAdmin = false;

      angular.forEach(roles, function(value, key) {
        if ( value == "ROLE_ADMIN") {
          hasRoleAdmin =  true;
        }
      });

      return hasRoleAdmin;
    }

    return false;
  };

  scope.onTokenHasExpired = function () {
    $rootScope.$on('tokenHasExpired', function() {
      $rootScope.$broadcast('unauthenticated');
      scope.refreshToken();
    });
  };

  scope.onAuth = function () {
    $rootScope.$on('authenticated', function() {
      scope.refreshToken();
      $rootScope.isAuthenticated = true;
    });
  };

}]);
