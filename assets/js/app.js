angular.module('ItsAliveApp', ['ngMap', 'ngRoute']);


require('./config/routes');

require('./directives/nav');
require('./directives/frontPage');
require('./directives/newService');
require('./directives/editService');
require('./directives/notFound');
require('./directives/login');

require('./services/userService');
require('./services/tokenInterceptor');
