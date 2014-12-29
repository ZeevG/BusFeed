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
    'uiGmapgoogle-maps'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html'
      });
  })
  .config(['uiGmapGoogleMapApiProvider', function (GoogleMapApi) {
    GoogleMapApi.configure({
      key: 'AIzaSyCcF6B47_VLar_L3YSHO3vFVlVxJA3HLP8',
      v: '3.17',
      libraries: 'weather,geometry,visualization'
    });
  }]);