(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('ItsAliveApp', ['ngMap', 'ngRoute']);


require('./config/routes');

require('./directives/nav');
require('./directives/frontPage');
require('./directives/newService');
require('./directives/editService');
require('./directives/notFound');
require('./directives/login');
require('./directives/admin');

require('./services/userService');
require('./services/tokenInterceptor');

},{"./config/routes":2,"./directives/admin":3,"./directives/editService":4,"./directives/frontPage":5,"./directives/login":6,"./directives/nav":7,"./directives/newService":8,"./directives/notFound":9,"./services/tokenInterceptor":10,"./services/userService":11}],2:[function(require,module,exports){
angular.module('ItsAliveApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationprovider) {
    $routeProvider
      .when('/', {
        template: "<front-page />"
      })
      .when('/new', {
        template: "<new-service />"
      })
      .when('/service/:id', {
        template: "<edit-service />"
      })
      .when('/login', {
        template: "<login />"
      })
      .when('/404', {
        template: "<not-found />"
      })
      .when('/admin', {
        template: "<admin-list />"
      })
      .when('/admin/new', {
        template: "<admin-new />"
      })
      .when('/admin/:id', {
        template: "<admin-view />"
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationprovider.html5Mode(true);
  }]);

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
angular.module('ItsAliveApp')
  .directive("editService", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/editService.html",
      controller: function($scope, $http, $location, $routeParams, userService) {
        $scope.data = {};
        userService.restrictAuth();

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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
angular.module('ItsAliveApp')
  .directive("navBar", function() {
    return {
      replace: true,
      restrict: "EA",
      scope: {},
      templateUrl: "partials/nav.html",
      controller: function($scope, $location, $interval, userService) {
        $scope.format = 'M/d/yy h:mm:ss a';
        $scope.datetime = "";

        $scope.authenticated = userService.isAuthenticated();
        $scope.isAdmin = userService.isAdmin();
        
        $scope.$on('logged', function () {
          $scope.authenticated = userService.isAuthenticated();
          $scope.isAdmin = userService.isAdmin();
        });

        $scope.logOut = userService.logOut;


        $interval(function() {
          $scope.datetime = new Date();
        }, 100);
      }
    };
  });

},{}],8:[function(require,module,exports){
angular.module('ItsAliveApp')
  .directive("newService", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/newService.html",
      controller: function($scope, $http, $location, userService) {
        $scope.data = {};
        $scope.data.status = "warning";

        userService.restrictAuth();

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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
angular.module("ItsAliveApp")
.factory("tokenInterceptor", function ($q, $location, $window){
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers["x-access-token"] = $window.sessionStorage.token;
      }
      return config;
    },
    requestError: function(rejection) {
      return $q.reject(rejection);
    },
    response: function (response) {
      return response || $q.when(response);
    },
    responseError: function(rejection) {
      if ( rejection !== null && rejection.status === 403) {
        $window.sessionStorage.authenticated = false;
        $window.sessionStorage.user = {};
        $location.path("/login");
      }
      return $q.reject(rejection);
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('tokenInterceptor');
});

},{}],11:[function(require,module,exports){
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
        delete $window.sessionStorage.isAdmin;
        $rootScope.$broadcast('logged');
        $location.path('/login');
      },
      setUser: function(data) {
        $window.sessionStorage.authenticated = true;
        $window.sessionStorage.email = data.user.email;
        $window.sessionStorage.id = data.user.id;
        $window.sessionStorage.isAdmin = data.user.isAdmin;
        $window.sessionStorage.token = data.token;
        $rootScope.$broadcast('logged');
      },
      isAuthenticated: function(data) {
        return $window.sessionStorage.authenticated;
      },
      isAdmin: function(data) {
        return ($window.sessionStorage.isAdmin == "false") ? false: true;
      },
      restrictAuth: function() {
        if ($window.sessionStorage.authenticated === "false" ||
            typeof($window.sessionStorage.authenticated) == 'undefined') {
          $location.path('/');
        }
      }
    };
  });

},{}]},{},[1]);
