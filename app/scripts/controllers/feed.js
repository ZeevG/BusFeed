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

      // If still no origin, try to use HTML5 Geolocation
      if((!('origin' in args) || args.origin === 'My Location') && (navigator.geolocation)){
        console.log('geolocation OK');
        var geocoder = new maps.Geocoder();

        navigator.geolocation.getCurrentPosition(function(position){
          var latLng = new maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );

          geocoder.geocode({'latLng': latLng}, function(results, status) {
            console.log('Reverse Geocoder', status);

            args.origin = _.map(
              results[0].address_components.slice(0, 3),
              function(component){
                return component.short_name;
              }
            ).join(' ');

            $scope.query = args;

            queryHistoryService.newQuery($scope.query);

            directions.route(args, function(directions, DirectionsStatus) {
              var MD5 = new Hashes.MD5();

              console.log(DirectionsStatus);
              for(var ii=0;ii<directions.routes.length;ii++){
                directions.routes[ii].md5 = MD5.hex(angular.toJson(directions.routes[ii]));
              }
              $scope.routes = directions.routes;
            });
          });
        });

      }else{
        $scope.query = args;

        queryHistoryService.newQuery($scope.query);

        directions.route(args, function(directions, DirectionsStatus) {
          var MD5 = new Hashes.MD5();

          console.log(DirectionsStatus);
          for(var ii=0;ii<directions.routes.length;ii++){
            directions.routes[ii].md5 = MD5.hex(angular.toJson(directions.routes[ii]));
          }
          $scope.routes = directions.routes;
        });
      }
    }

    function refreshRoutes(maps){
      getRoutes(maps);
      $timeout(function(){refreshRoutes(maps);}, refreshInterval);
    }

    GoogleMapApi.then(function(maps) {
      refreshRoutes(maps);
    });


  }]);
