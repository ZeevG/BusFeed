'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('AboutCtrl', function ($scope, $timeout) {
    $scope.test = 'thing';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.clock = 'loading clock...';
    $scope.tickInterval = 1000;

    var tick = function() {
        $scope.clock = Date.now();
        $timeout(tick, $scope.tickInterval);
    };

    $timeout(tick, $scope.tickInterval);

  });
