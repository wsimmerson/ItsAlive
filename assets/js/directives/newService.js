angular.module('ItsAliveApp')
  .directive("newService", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/newService.html",
      controller: function($scope, $http, $location) {
        $scope.data = {};
        $scope.data.status = "warning";

        $scope.create = function () {
          $http.post("/api/", {data:$scope.data})
            .then(function(res) {
              console.log(res);
              if (res.data.success) {
                $location.path('/');
              }
              else {

              }
            });
        };
      }
    };
  });
