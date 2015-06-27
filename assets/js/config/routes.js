angular.module('ItsAliveApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationprovider) {
    $routeProvider
      .when('/', {
        template: "<front-page />"
      })
      .when('/new', {
        template: "<new-service />"
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationprovider.html5Mode(true);
  }]);
