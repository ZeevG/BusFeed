'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the busFeedApp
 */

angular.module('busFeedApp')
  .controller('MainCtrl', ['$scope', '$rootScope', '$timeout', 'uiGmapGoogleMapApi',
  function ($scope, $rootScope, $timeout, GoogleMapApi) {

    $scope.routes = [];

    function getRoutes(maps){
      var directions = new maps.DirectionsService();

      var callback = function(directions, DirectionsStatus) {
        console.log(directions);
        console.log(DirectionsStatus);
        $scope.routes = directions.routes;
      };

      var args = {
        origin: '-31.9705868,115.8149134',
        destination: 'Forrest Place, Perth',
        travelMode: maps.TravelMode.TRANSIT,
        // departureTime: '1419431153',
        provideRouteAlternatives: true,
      };
      $scope.query = args;
      console.log(args);

      directions.route(args, callback);

    }

    function refreshRoutes(maps){
      getRoutes(maps);
      $timeout(function(){
        refreshRoutes(maps);
      }, 
      30000);
    }

    GoogleMapApi.then(function(maps) {

      getRoutes(maps);
      $timeout(function(){
        refreshRoutes(maps);
      }, 
      30000);
      
    });


  }]);
