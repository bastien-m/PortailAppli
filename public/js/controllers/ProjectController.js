angular.module('PortalApp')
  .controller('ProjectController', ['$scope', 'Flash', '$location', 'AppService', 'UserService',
   function($scope, Flash, $location, AppService, UserService) {

     //if we try to access the create page without being authenticate
     //redirect to the login page and put a flash message
     //explaining why redirected
     if ($location.path() === '/project/create' &&
      (typeof UserService.base64Authentication === 'undefined' || UserService.base64Authentication === '')) {
        Flash.create('danger', 'Vous n\'êtes pas autorisé à créer un projet', 'custom-class');
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

  }]);
