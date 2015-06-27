angular.module('ItsAliveApp')
  .directive("editService", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/editService.html",
      controller: function($scope, $http, $location, $routeParams) {
        $scope.data = {};

        $scope.update = function () {
          $http.put("/api/"+$scope.data.id, {data:$scope.data})
            .then(function(res) {
              console.log(res);
              if (res.data.success) {
                $location.path('/');
              }
              else {

              }
            });
        };

        $scope.delete = function () {
          $http.delete("/api/"+$scope.data.id)
          .then(function(res) {
            if (res.data.success) {
              $location.path('/');
            }
          });
        };

        $scope.init = function () {
          $http.get("/api/"+$routeParams.id)
            .then(function(res) {
              console.log(res);
              if (res.data.success) {
                $scope.data = res.data.service;
              }
              else {
                $location.path('/404');
              }
            });
        };

        $scope.init();
      }
    };
  });
