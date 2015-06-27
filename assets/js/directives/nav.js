angular.module('ItsAliveApp')
  .directive("navBar", function() {
    return {
      replace: true,
      restrict: "EA",
      scope: {},
      templateUrl: "partials/nav.html",
      controller: function($scope, $location, $interval, userService) {
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.datetime = "";

        $scope.authenticated = userService.isAuthenticated();
        $scope.$on('logged', function () {
          $scope.authenticated = userService.isAuthenticated();
        });

        $scope.logOut = userService.logOut;


        $interval(function() {
          $scope.datetime = new Date();
        }, 100);
      }
    };
  });
