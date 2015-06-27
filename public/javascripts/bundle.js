(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('ItsAliveApp', ['ngMap', 'ngRoute']);


require('./config/routes');

require('./directives/nav');
require('./directives/frontPage');
require('./directives/newService');
require('./directives/editService');
require('./directives/notFound');

},{"./config/routes":2,"./directives/editService":3,"./directives/frontPage":4,"./directives/nav":5,"./directives/newService":6,"./directives/notFound":7}],2:[function(require,module,exports){
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
      .when('/404', {
        template: "<not-found />"
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationprovider.html5Mode(true);
  }]);

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
angular.module('ItsAliveApp')
  .directive("frontPage", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/front.html",
      controller: function ($scope, $http) {
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

      }
    };
  });

},{}],5:[function(require,module,exports){
angular.module('ItsAliveApp')
  .directive("navBar", function() {
    return {
      replace: true,
      restrict: "EA",
      scope: {},
      templateUrl: "partials/nav.html",
      controller: function($scope, $location) {

      }
    };
  });

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}]},{},[1]);
