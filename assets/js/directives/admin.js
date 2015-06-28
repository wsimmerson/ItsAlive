angular.module("ItsAliveApp")
  .directive('adminList', function () {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/admin/list.html",
      controller: function ($scope, $http) {
        $scope.data = {};
        $scope.data.authorized = false;
        $scope.data.users = [];

        $scope.init = function() {
            $http.get('/api/admin/user')
              .then(function(res) {
                if (res.data.success) {
                  $scope.data.authorized = true;
                  $scope.data.users = res.data.users;
                }
              });
        };

        $scope.init();
      }
    };
  })
  .directive('adminNew', function () {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/admin/new.html",
      controller: function ($scope, $http, $location) {
        $scope.data = {};
        $scope.data.authorized = false;
        $scope.data.user = {};

        $scope.init = function() {
            $http.get('/api/admin/user/')
              .then(function(res) {
                if (res.data.success) {
                  $scope.data.authorized = true;
                }
              });
        };

        $scope.create = function(){
          $http.post('/api/admin/user', {user: $scope.data.user})
          .then(function(res) {
            if (res.data.success) {
              $location.path('/admin');
            }
            else {
              $scope.data.message = "Failed to create the user";
            }
          });
        };

        $scope.init();
      }
    };
  })
  .directive('adminView', function () {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/admin/view.html",
      controller: function ($scope, $http, $routeParams, $location) {
        $scope.data = {};
        $scope.data.authorized = false;
        $scope.data.user = {};

        $scope.init = function() {
            $http.get('/api/admin/user/'+$routeParams.id)
              .then(function(res) {
                if (res.data.success) {
                  $scope.data.authorized = true;
                  $scope.data.user = res.data.user;
                }
              });
        };

        $scope.update = function () {
          $http.put('/api/admin/user/'+$routeParams.id, {user: $scope.data.user})
            .then(function(res) {
              if (res.data.success) {
                $scope.data.message = "User Updated!";
              }
              else ($scope.data.message = "Failed to update user");
            });
        };

        $scope.delete = function () {
          $http.delete('/api/admin/user/'+$routeParams.id)
          .then(function(res) {
            if (res.data.success) {
              $location.path("/admin");
            }
            else {
              $scope.data.message = "Deletion Failed!";
            }
          });
        };

        $scope.init();
      }
    };
  });
