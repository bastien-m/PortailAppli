angular.module('PortalApp')
  .controller('LoginController', ['$scope', 'UserService', function($scope, UserService) {

    $scope.UserService = UserService;
    $scope.base64Authentication = '';
    $scope.$on('logged', function(event, base64login) {
      console.log('received logged event');
      $scope.base64Authentication = base64login;
    });

    $scope.$on('loggedOut', function(event, base64login) {
      console.log('loggedOut');
      $scope.base64Authentication = base64login;
      console.log('base: ' + base64login);
    });

  }]);
