'use strict';

/*
* This service handle the App part, get/update/delete/create (update/delete/create) require authentication
*/

angular.module('PortalApp')
  .factory('AppService', ['$http', '$q', 'prefixUrl', 'env', function($http, $q, prefixUrl, env) {
    var uri = prefixUrl[env] + 'product';
    var httpError = 'Une erreur est survenue veuillez ressayer plus tard';

    return {

      get: function(id) {
        var deferred = $q.defer();
        if (angular.isUndefined(id)) {
          id = '';
        }

        $http.get(uri + '/' + id).success(function(response) {
          if (response.status === 200) {
            deferred.resolve(response.data);
          }
          else {
            deferred.reject(httpError);
          }

        });
        return deferred.promise;
      },

      create: function(appObject) {
        var deferred = $q.defer();
        if (angular.isDefined(appObject)) {
          $http.post(uri, appObject)
          .then(function(response) {
            if (response.status === 200) {
              deferred.resolve(response.data.msg);
            }
            else {
              deferred.reject(httpError);
            }
          }, function(err) {
            deferred.reject(err);
          });
        }
        else {
          deferred.reject('Paramètres requis non fournis, veuillez compléter votre demande');
        }
        return deferred.promise;
      },

      update: function(id, appObject) {
        var deferred = $q.defer();
        $http.put(uri + '/' + id, appObject)
        .then(function(response) {
          if (response.status === 200) {
            deferred.resolve(response.data.msg);
          }
          else {
            deferred.reject(httpError);
          }
        }, function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      delete: function(id) {
        var deferred = $.defer();

        $http.delete(uri + '/' + id)
        .then(function(response) {
          if (response.status === 200) {
            deferred.resolve(response.data.msg);
          }
          else {
            deferred.reject(httpError);
          }
        }, function(err) {
          deferred.reject(err);
        })

        return deferred.promise;
      }
    };

  }]);
