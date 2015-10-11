angular.module('PortalApp', ['ngRoute'])
  .constant('prefixUrl', {
    'test': 'http://localhost:3000/',
    'prod': 'http://localhost:3000/'
  })
  .constant('env', 'test')
  .config(['$routeProvider', function($routeProvider){

    $routeProvider.when('/login', {
      templateUrl: 'views/login.html',
      controller: 'LoginController'
    })
    .when('/appDetail', {
      templateUrl: 'views/appDetail.html',
      controller: 'AppDetailController'
    })
    .otherwise({
      templateUrl: 'views/home.html',
      controller: 'AppListController'
    });

  }])
