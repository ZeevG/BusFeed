'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the busFeedApp
 */

angular.module('busFeedApp')
  .controller('MainCtrl', ['$scope', 'uiGmapGoogleMapApi', function ($scope, GoogleMapApi) {
    $scope.test = 'skdlfj';
    $scope.routes = [];

    GoogleMapApi.then(function(maps) {
      var directions = new maps.DirectionsService();

      var args = {
        origin: '-31.9705868,115.8149134',
        destination: 'Forrest Place, Perth',
        travelMode: maps.TravelMode.TRANSIT,
        // departureTime: '1419431153',
      };

      var result = directions.route(args, function(directions, DirectionsStatus) {
        console.log(directions);
        console.log(DirectionsStatus);
        $scope.routes[0] = directions.routes[0];
      });

      console.log(args);
      console.log(result);
    });

  }]);
