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

    $scope.toggleDetails = function(index){
      $scope.routes[index].detailsVisible = !$scope.routes[index].detailsVisible;
      console.log(index);
    };

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
          var bounds = directions.routes[ii].bounds;
          var leg = directions.routes[ii].legs[0]; // Not using waypoints so always only one leg
          
          directions.routes[ii].md5 = MD5.hex(angular.toJson(directions.routes[ii]));
          directions.routes[ii].detailsVisible = false;

          directions.routes[ii].center = {
            'latitude': bounds.getCenter().lat(),
            'longitude': bounds.getCenter().lng()
          };
          directions.routes[ii]
          directions.routes[ii].markers = [
            {
              'id': (ii*10)+1,
              'latitude': leg.start_location.lat(),
              'longitude': leg.start_location.lng()
            },
            {
              'id': (ii*10)+2,
              'latitude': leg.end_location.lat(),
              'longitude': leg.end_location.lng()
            }
          ];
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
