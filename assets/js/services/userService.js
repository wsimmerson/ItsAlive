angular.module("ItsAliveApp")
  .factory('userService', function($http, $window, $location, $rootScope){
    return {
      logIn: function(email, password) {
        return $http.post("/user/login", {
          email:email,
          password:password
        });
      },
      logOut: function() {
        delete $window.sessionStorage.token;
        delete $window.sessionStorage.authenticated;
        delete $window.sessionStorage.email;
        delete $window.sessionStorage.id;
        $rootScope.$broadcast('logged');
        $location.path('/login');
      },
      setUser: function(data) {
        $window.sessionStorage.authenticated = true;
        $window.sessionStorage.email = data.user.email;
        $window.sessionStorage.id = data.user.id;
        $window.sessionStorage.token = data.token;
        $rootScope.$broadcast('logged');
      },
      isAuthenticated: function(data) {
        return $window.sessionStorage.authenticated;
      },
      restrictAuth: function() {
        if ($window.sessionStorage.authenticated === "false" ||
            typeof($window.sessionStorage.authenticated) == 'undefined') {
          $location.path('/');
        }
      }
    };
  });
