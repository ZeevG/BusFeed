'use strict';

var app = angular.module('busFeedApp');
app.controller('TimeCtrl', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.clock = 'Time...';
        $scope.tickInterval = 1000;

        var tick = function() {
            $scope.clock = Date.now();
            $timeout(tick, $scope.tickInterval);
        };

        $timeout(tick, $scope.tickInterval);
}]);