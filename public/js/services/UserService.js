angular.module('PortalApp')
  .factory('UserService',['$location', '$q', '$rootScope', '$http', 'Flash', 'env', 'prefixUrl',
  function($location, $q, $rootScope, $http, Flash, env, prefixUrl) {
    var uri = prefixUrl[env] + 'user';

    var checkUser = function(connectionString) {
      var deferred = $q.defer();
      $http.get(uri + '/' + connectionString).then(function(response) {
        if (response.status === 200) {
          if (response.data.err !== null) {
            deferred.reject('Echec de l\'authentification, vérifiez vos accès');
          }
          else {
            deferred.resolve('Connecté avec succès');
          }
        }
        else {
          deferred.reject('Erreur serveur lors de la requête');
        }
      }, function(err) {
        deferred.reject('Erreur serveur');
      });
      return deferred.promise;
    }

    return {
      login: function(login, password) {
        this.base64Authentication = btoa(login+':'+password);
        checkUser(this.base64Authentication).then(function(msg) {
          $rootScope.$broadcast('logged', this.base64Authentication);
          $location.path('/project/list');
        }, function(err) {
          Flash.create('danger', err, 'custom-class');
        });
      },
      logout: function() {
        this.base64Authentication = '';
        $rootScope.$broadcast('loggedOut', this.base64Authentication);
        $location.path('/project/list');
      }
    }

  }]);
