angular.module("ItsAliveApp")
  .directive("notFound", function() {
    return {
      restrict: "E",
      replace: true,
      $scope: {},
      templateUrl: "partials/404.html",
      controller: function() {

      }
    };
  });
