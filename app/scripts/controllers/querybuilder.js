'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:QuerybuilderCtrl
 * @description
 * # QuerybuilderCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('QuerybuilderCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.origin = 'My Location';

    $scope.go = function(){
        $location.path('/feed/').search(
            {
                origin: $scope.origin,
                destination: $scope.destination
            }
        );
    };
  }]);
