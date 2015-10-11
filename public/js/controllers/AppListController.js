angular.module('PortalApp')
  .controller('AppListController', ['$scope', '$q', 'AppService', function($scope, $q, appService) {

    (function(){
      appService.get(undefined).then(function(appList) {
        $scope.listApp = appList;
      }, function(errMsg){
        $scope.errMsg = errMsg;
      })
    })();

  

    //redirect on detail app page
    $scope.clickOnApp = function(id) {

    }

  }]);
