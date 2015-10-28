'use strict';

/*
* This service handle the App part, get/update/delete/create (update/delete/create) require authentication
*/

angular.module('PortalApp')
  .factory('AppService', ['$http', '$q', 'prefixUrl', 'env', 'UserService', function($http, $q, prefixUrl, env, UserService) {
    var uri = prefixUrl[env] + 'project';
    var httpError = 'Une erreur est survenue veuillez ressayer plus tard';
    var selectedApp = null;

    return {
      setSelectedApp : function(app) {
        this.selectedApp = app;
      },
      getSelectedApp : function() {
        return this.selectedApp;
      },

      get: function(id) {
        var deferred = $q.defer();
        if (angular.isUndefined(id)) {
          id = '';
        }

        $http.get(uri + '/' + id).then(function(response) {
          if (response.status === 200) {
            deferred.resolve(response.data.projects);
          }
          else {
            deferred.reject(httpError);
          }

        }, function(err) {
          deferred.reject(err);
        });
        return deferred.promise;
      },

      create: function(appObject) {
        var deferred = $q.defer();
        if (angular.isDefined(appObject)) {
          //set header for basic auth
          $http.defaults.headers.common['Authorization'] = 'Basic ' + UserService.base64Authentication;
          $http.post(uri, appObject)
          .then(function(response) {
            if (response.status === 200) {
              if (response.data.err === null) {
                deferred.resolve(response.data.msg);
              }
              else {
                deferred.reject(response.err);
              }
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
