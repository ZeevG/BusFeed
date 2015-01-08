'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:QuerybuilderCtrl
 * @description
 * # QuerybuilderCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('QuerybuilderCtrl', ['$scope', '$location', '$controller',
    function ($scope, $location, $controller) {
    $controller('OverlayCtrl', {$scope:$scope});

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
