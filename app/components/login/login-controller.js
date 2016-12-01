'use strict';

angular.module('myApp').
controller('LoginController', LoginController);

function LoginController($scope, $feathers, $log) {
	$scope.username = "";
  	$scope.password = "";

  	$scope.user = false;

	$scope.submit = function() {
      $feathers.authenticate({
        type: 'local',
        username: $scope.username,
        password: $scope.password
      }).then(function (result) {
        $log.log('Authenticated!', result);
        $scope.user = result;
        // Go to special page on success $state.go("dashboard");
      }).catch(function (error) {
      	alert(error);
      	// Show Error messagse somehow?
        $log.error('Error authenticating!', error)
      })
      $log.log($scope.username, $scope.password);
    };
}