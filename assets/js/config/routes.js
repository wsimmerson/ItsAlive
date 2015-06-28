angular.module('ItsAliveApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationprovider) {
    $routeProvider
      .when('/', {
        template: "<front-page />"
      })
      .when('/new', {
        template: "<new-service />"
      })
      .when('/service/:id', {
        template: "<edit-service />"
      })
      .when('/login', {
        template: "<login />"
      })
      .when('/404', {
        template: "<not-found />"
      })
      .when('/admin', {
        template: "<admin-list />"
      })
      .when('/admin/new', {
        template: "<admin-new />"
      })
      .when('/admin/:id', {
        template: "<admin-view />"
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationprovider.html5Mode(true);
  }]);
