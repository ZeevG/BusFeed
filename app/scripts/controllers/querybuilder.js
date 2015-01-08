'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:QuerybuilderCtrl
 * @description
 * # QuerybuilderCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('QuerybuilderCtrl', ['$scope', '$rootScope', '$location', '$controller',
    function ($scope, $rootScope, $location, $controller) {
    $controller('OverlayCtrl', {$scope:$scope});

    $scope.origin = 'My Location';

    $scope.go = function(){

      var routeObj = {origin: $scope.origin, destination: $scope.destination};

      $location.path('/feed/').search(routeObj);
    };
  }]);
