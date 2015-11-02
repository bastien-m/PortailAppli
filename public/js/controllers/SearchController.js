angular.module('PortalApp')
  .controller('SearchController', ['$scope', '$rootScope', 'AppService', 'Flash',
  function($scope, $rootScope, AppService, Flash) {

    $scope.isSelected = false;

    //event received from LoginController, when the user click
    //on the search button
    $scope.$on('search', function(event) {
      $scope.isSelected = !$scope.isSelected;
    });

    //search a project using the value passed in
    //show all the project containing the search value inside
    //of their name and properties field (url, description,stack, host)
    $scope.search = function(searchValue) {
      //if no search value, print out the whole list
      if (!searchValue) {
        searchValue = ".*";
      }
      AppService.search(searchValue)
      .then(function(projects) {
        $rootScope.$broadcast('projectsFound', projects);
      }, function(err) {
        $scope.error = err;
      });
    }

  }]);
