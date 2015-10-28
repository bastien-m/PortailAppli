angular.module('PortalApp')
  .controller('ProjectController', ['$scope', 'Flash', '$location', '$routeParams', 'AppService', 'UserService',
   function($scope, Flash, $location, $routeParams, AppService, UserService) {

     if (AppService.getSelectedApp()) {
       $scope.project = AppService.getSelectedApp();
     }

     var isAuthenticated = function() {
       if (typeof UserService.base64Authentication === 'undefined' || UserService.base64Authentication === '') {
         Flash.create('danger', 'Vous n\'êtes pas autorisé à effectué cette opération', 'custom-class');
         return false;
       }
       return true;
     }

     var loadProject = function(projectId) {
       AppService.get(projectId)
       .then(function(project) {
         $scope.project = project;
       }, function(err) {
         Flash.create('danger', err, 'custom-class');
       })
     }

     //If we try to access the update page
     //first check authentication, then load data for this
     //project
     if ($location.path() === '/project/update') {
       if (!isAuthenticated()) {
         $location.path('/login');
       }
       else {
         loadProject($routeParams.projectId);
       }
     }

     if ($location.path() === '/project/delete') {
       if (!isAuthenticated()) {
         $location.path('/project/update/' + $rootParam.projectId);
       }
     }

     //if we try to access the create page without being authenticate
     //redirect to the login page and put a flash message
     //explaining why redirected
     if ($location.path() === '/project/create' && !isAuthenticated()) {
        $location.path('/login');
     }

    //if we need to list out apps, load them before
    if ($location.path() === '' || $location.path() === '/project/list') {
      AppService.get(undefined).then(function(appList) {
        $scope.appList = appList;
      }, function(errMsg) {
        Flash.create('danger', errMsg, 'custom-class');
        $scope.appList = [];
      });
    }

    $scope.showDetails = function(project) {
      AppService.setSelectedApp(project);
      $location.path('/project/detail/' + project._id);
    }

    $scope.create = function() {
      var self = $scope;
      self.form.isDone = !self.form.isDev;
      self.form.url = [{name: 'dev', link: self.form.urlTest},
         {name: 'preprod', link: self.form.urlPreprod},
         {name: 'prod', link: self.form.urlProd}];

      AppService.create(self.form).then(function(msg) {
        Flash.create('success', 'Projet créé avec succès', 'custom-class');
        $location.path('/project/list');
      }, function(err) {
        self.errorMsg = err;
        Flash.create('danger', err, 'custom-class');
      });
    }

    $scope.update = function() {
      if (isAuthenticated()) {
        AppService.update($scope.project)
        .then(function(msg) {
          Flash.create('success', 'Projet mis à jour avec succès', 'custom-class');
          $location.path('/project/list');
        }, function(err) {
          $scope.err = err;
        });
      }
    }

    $scope.delete = function() {
      if (isAuthenticated()) {
         AppService.delete($scope.project.id)
        .then(function(msg) {
          Flash.create('success', 'Projet supprimé avec succès', 'custom-class');
          $location.path('/project/list');
        }, function(err) {
          $scope.err = err;
        });
      }
    }

  }]);
