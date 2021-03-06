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
    $scope.routeStatus = 'OK'

    $scope.toggleDetails = function(index){
      $scope.routes[index].detailsVisible = !$scope.routes[index].detailsVisible;
      
      if($scope.routes[index].detailsVisible){
        $scope.routes[index].NumSteps = 12000;
      }else{
        $scope.routes[index].NumSteps = 3;
      }
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

        for(var ii=0;ii<directions.routes.length;ii++){
          var bounds = directions.routes[ii].bounds;
          
          directions.routes[ii].md5 = MD5.hex(angular.toJson(directions.routes[ii]));
          directions.routes[ii].detailsVisible = false;
          directions.routes[ii].NumSteps = 3;

          directions.routes[ii].center = {
            'latitude': bounds.getCenter().lat(),
            'longitude': bounds.getCenter().lng()
          };
        }
        $scope.$apply(function(){
          $scope.routes = directions.routes;
          $scope.routeStatus = DirectionsStatus
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
