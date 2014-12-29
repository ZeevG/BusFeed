'use strict';

var app = angular.module('busFeedApp');
app.controller('TimeCtrl', ['$scope', '$rootScope', '$timeout', function ($scope, $rootScope, $timeout) {
        $rootScope.clock = 'Time...';
        $scope.tickInterval = 1000;

        var tick = function() {
            $rootScope.clock = Date.now();
            $timeout(tick, $scope.tickInterval);
        };

        $timeout(tick, $scope.tickInterval);
}]);