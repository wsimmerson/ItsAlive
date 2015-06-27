angular.module('ItsAliveApp')
  .directive("frontPage", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/front.html",
      controller: function ($scope, $http, $interval) {
        $scope.services = [
          {"name": "RevolutionIP", "address":"8605 Twin Oaks Drive, windsor, ontario", "Lat": 42.2928590, "Long": -82.9147780, "status": "up"},
          {"name": "Mayson Machine", "address":"3706 sandwich st. w, windsor, ontario", "Lat": 42.2917970, "Long": -83.0824950, "status": "down"}
        ];

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
