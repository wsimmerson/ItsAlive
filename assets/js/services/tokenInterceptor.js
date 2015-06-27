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
