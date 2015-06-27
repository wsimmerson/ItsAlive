angular.module('ItsAliveApp')
  .directive("frontPage", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/front.html",
      controller: function ($scope, $http, $interval) {
        $scope.services = [];

        $scope.init = function() {
          $http.get("/api/")
          .then(function(res) {
            if (res.data.success) {
              $scope.services = res.data.services;
            }
          });
        };

        $scope.init();

        $interval(function(){
          $http.get("/api/")
          .then(function(res) {
            if (res.data.success) {
              $scope.services = res.data.services;
            }
          });
        }, 60000);

      }
    };
  });
