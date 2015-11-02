angular.module('PortalApp')
  .controller('LoginController', ['$scope', '$rootScope', 'UserService', function($scope, $rootScope, UserService) {

    //show by default the search item in navbar
    $scope.searchable = true;

    $scope.UserService = UserService;
    $scope.base64Authentication = '';
    $scope.$on('logged', function(event, base64login) {
      $scope.base64Authentication = base64login;
    });

    $scope.$on('loggedOut', function(event, base64login) {
      $scope.base64Authentication = base64login;
    });

    //event to hide search item on navbar if needed (only available on listing)
    $scope.$on('updateSearchable', function(event, enable) {
      $scope.searchable = enable;
    });

    $scope.toggleSearchBox = function() {
      $rootScope.$broadcast('search');
    }

  }]);
