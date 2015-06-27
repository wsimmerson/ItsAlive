angular.module("ItsAliveApp")
  .directive("login", function() {
    return {
        replace: true,
        restrict: "E",
        scope: {},
        templateUrl: "partials/login.html",
        controller: function ($scope, $location, userService) {
          $scope.data = {};

          $scope.login = function() {
            userService.logIn($scope.data.email, $scope.data.password)
            .then(function(res) {
              if (res.data.success) {
                userService.setUser(res.data);
                $location.path('/');
              }
              else {
                $scope.data.message = "Login Failed"
              }
            });
          };

        }
    };
  });
