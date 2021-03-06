'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:QuerybuilderCtrl
 * @description
 * # QuerybuilderCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('QuerybuilderCtrl', ['$scope', '$rootScope', '$location', '$controller', 'uiGmapGoogleMapApi',
    function ($scope, $rootScope, $location, $controller, GoogleMapApi) {
    $controller('OverlayCtrl', {$scope:$scope});
    
    var maps;

    $scope.icon = '-';
    $scope.origin = '';
    $scope.destination = '';

    GoogleMapApi.then(function(googleMapsAPI) {
      maps = googleMapsAPI;
      $scope.icon = 'locate';
    });

    $scope.go = function(){

      var routeObj = {origin: $scope.origin, destination: $scope.destination};

      $location.path('/feed/').search(routeObj);
    };

    $scope.geolocate = function(){
      if($scope.icon !== 'locate'){
        return;
      }

      $scope.icon = 'working';
      navigator.geolocation.getCurrentPosition(function(position){
        var latLng = new maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var geocoder = new maps.Geocoder();
        geocoder.geocode({'latLng': latLng}, function(results, status) {
          console.log('Reverse Geocoder', status);
          $scope.$apply(function(){

            // Underscore trickery
            // builds a string from the short_name of
            // the first three address_components
            $scope.origin = _.map(
              results[0].address_components.slice(0, 3),
              function(component){
                return component.short_name;
              }
            ).join(' ');

            $scope.icon = 'success';
          });
        });
      });
    };

  }]);
