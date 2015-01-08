'use strict';

/**
 * @ngdoc overview
 * @name busFeedApp
 * @description
 * # busFeedApp
 *
 * Main module of the application.
 */
angular
  .module('busFeedApp', [
    'busFeedApp.filters',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'uiGmapgoogle-maps',
    'angularMoment',
    'snap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/feed/', {
        templateUrl: 'views/feed.html'
      })
      .when('/', {
        templateUrl: 'views/querybuilder.html'
      });
  })
  .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
      key: 'AIzaSyCcF6B47_VLar_L3YSHO3vFVlVxJA3HLP8',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  }])
  .config(function(snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
  })
  .constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'Europe/London' // optional
  })
  .run(['queryHistoryService', function(queryHistoryService){
    queryHistoryService.restoreState();
  }])
  // Quick inheritable "Super-controller" for use by concrete controllers
  .controller('OverlayCtrl', function($scope){
    $scope.$watch('$viewContentLoaded', function(){
      console.log('viewContentLoaded');
      angular.element('#overlay').on('animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd', function(event){
        this.remove();
      })
      angular.element('#overlay').addClass('out');
    });
  });

