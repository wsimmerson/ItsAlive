angular.module('ItsAliveApp')
  .directive("navBar", function() {
    return {
      replace: true,
      restrict: "EA",
      scope: {},
      templateUrl: "partials/nav.html",
      controller: function($scope, $location, $interval) {
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.datetime = "";


        $interval(function() {
          $scope.datetime = new Date();
        }, 100);
      }
    };
  });
