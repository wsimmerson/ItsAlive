angular.module('ItsAliveApp')
  .directive("frontPage", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/front.html",
      controller: function ($scope, $http, $interval, userService) {
        $scope.services = [];
        $scope.table_visible = true;

        $scope.toggle_visible = function () {
          $scope.table_visible = $scope.table_visible === true ? false : true;
        };

        $scope.init = function() {
          userService.restrictAuth();
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
