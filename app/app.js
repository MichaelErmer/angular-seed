'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngFeathers',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]).
constant('feathersSettings', {
  endpointUrl: 'http://yourapi.url',
  useSocket: true
}).
config(['$locationProvider', '$routeProvider', '$feathersProvider', 'feathersSettings', function($locationProvider, $routeProvider,$feathersProvider, feathersSettings) {
  $feathersProvider.setEndpoint(feathersSettings.endpointUrl)
    
  // true is default; set to false if you like to use REST 
  $feathersProvider.useSocket(feathersSettings.useSocket);

  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
