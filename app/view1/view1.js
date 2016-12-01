'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $log, $feathers) {
	$scope.message = {
		text: ""
	};
	$scope.messages = [];
	$scope.totalMessagesCount = 0;

	$feathers.service('messages').find({query: {}}).then(function(result) {
		$scope.messages=result.data;
		$scope.totalMessagesCount = result.total;
	})
	.catch(function (error) {
		$log.error(error);
	});

	$feathers.service('messages').on('created', function(message) {
		$scope.messages.push(message);
		$scope.totalMessages++;
	});

	$scope.addMessage = function() {
		$log.log("creating...", $scope.message);
		$feathers.service('messages').create($scope.message).then(function(message) {
			$log.log("messages was created", message);
			$scope.message.text = "";
		})
		.catch(function(error) {
			$log.error(error);
		});
	}
});