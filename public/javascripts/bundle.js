(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module('ItsAliveApp', ['ngMap', 'ngRoute']);


require('./config/routes');

require('./directives/nav');
require('./directives/frontPage');

},{"./config/routes":2,"./directives/frontPage":3,"./directives/nav":4}],2:[function(require,module,exports){
angular.module('ItsAliveApp')
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationprovider) {
    $routeProvider
      .when('/', {
        template: "<front-page />"
      })
      .otherwise({
        redirectTo: '/'
      });

    $locationprovider.html5Mode(true);
  }]);

},{}],3:[function(require,module,exports){
angular.module('ItsAliveApp')
  .directive("frontPage", function() {
    return {
      replace: true,
      restrict: "E",
      scope: {},
      templateUrl: "partials/front.html",
      controller: function ($scope) {
        $scope.services = [
          {"name": "RevolutionIP", "address":"8605 Twin Oaks Drive, windsor, ontario", "Lat": 42.2928590, "Long": -82.9147780, "status": "up"},
          {"name": "Mayson Machine", "address":"3706 sandwich st. w, windsor, ontario", "Lat": 42.2917970, "Long": -83.0824950, "status": "down"}
        ];

      }
    };
  });

},{}],4:[function(require,module,exports){
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

},{}]},{},[1]);