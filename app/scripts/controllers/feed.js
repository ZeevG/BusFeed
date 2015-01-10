'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the busFeedApp
 */

angular.module('busFeedApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$routeParams', '$timeout', 'uiGmapGoogleMapApi', '$controller', 'queryHistoryService',
  function ($scope, $rootScope, $routeParams, $timeout, GoogleMapApi, $controller, queryHistoryService) {
    $controller('OverlayCtrl', {$scope:$scope});

    $scope.routes = [];

    // Time interval in miliseconds between polls
    var refreshInterval = 120000;

    // Default settings for directions request
    var args = {
      travelMode: 'TRANSIT',
      provideRouteAlternatives: true,
    };

    // If origin/destination is supplied in $routeParams
    angular.extend(args, $routeParams);

    function getRoutes(maps){
      var directions = new maps.DirectionsService();
      $scope.query = args;

      directions.route(args, function(directions, DirectionsStatus) {
        var MD5 = new Hashes.MD5();
        
        // Query returned something - Add it to the history service
        queryHistoryService.newQuery($scope.query);

        console.log(DirectionsStatus);
        for(var ii=0;ii<directions.routes.length;ii++){
          directions.routes[ii].md5 = MD5.hex(angular.toJson(directions.routes[ii]));
        }

        $scope.$apply(function(){
          $scope.routes = directions.routes;
        });
      });
    }

    function refreshRoutes(maps){
      getRoutes(maps);
      $timeout(function(){refreshRoutes(maps);}, refreshInterval);
    }

    GoogleMapApi.then(function(maps) {
      refreshRoutes(maps);
    });


  }]);
