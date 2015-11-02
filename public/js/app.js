angular.module('PortalApp', ['ngRoute', 'flash', 'ngAnimate'])
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
    .when('/project/delete/:projectId', {
      templateUrl: 'views/project/delete.html',
      controller: 'ProjectController'
    })
    .when('/project/list', {
      templateUrl: 'views/project/list.html',
      controller: 'ProjectController'
    })
    .when('/project/detail/:projectId', {
      templateUrl: 'views/project/detail.html',
      controller: 'ProjectController'
    })
    .when('/project/update/:projectId', {
      templateUrl: 'views/project/update.html',
      controller: 'ProjectController'
    })
    .when('/project/create', {
      templateUrl: 'views/project/create.html',
      controller: 'ProjectController'
    })
    .otherwise({
      templateUrl: 'views/project/list.html',
      controller: 'ProjectController'
    });

  }])
