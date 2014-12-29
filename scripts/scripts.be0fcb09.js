"use strict";angular.module("busFeedApp",["busFeedApp.filters","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","angularMoment"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html"})}]).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyCcF6B47_VLar_L3YSHO3vFVlVxJA3HLP8",v:"3.17",libraries:"weather,geometry,visualization"})}]).constant("angularMomentConfig",{preprocess:"unix",timezone:"Europe/London"});var sizeMultiplier="2",iconClassName={TRANSIT:"fa fa-bus fa-"+sizeMultiplier+"x",WALKING:"fa fa-male fa-"+sizeMultiplier+"x"},iconSeperator='<i class="fa fa-angle-right fa-'+sizeMultiplier+'x"></i>';angular.module("busFeedApp.filters",[]).filter("iconise_steps",function(){return function(a){var b=a.map(function(a){var b="";return"TRANSIT"===a.travel_mode&&(b=a.transit.line.short_name),'<i class="'+iconClassName[a.travel_mode]+'">&nbsp;'+b+"</i>"});return b.join(iconSeperator)}}),angular.module("busFeedApp").controller("MainCtrl",["$scope","$rootScope","$timeout","uiGmapGoogleMapApi",function(a,b,c,d){function e(b){var c=new b.DirectionsService,d=function(b,c){console.log(b),console.log(c),a.routes=b.routes},e={origin:"-31.9705868,115.8149134",destination:"Forrest Place, Perth",travelMode:b.TravelMode.TRANSIT,provideRouteAlternatives:!0};a.query=e,console.log(e),c.route(e,d)}function f(a){e(a),c(function(){f(a)},3e4)}a.routes=[],d.then(function(a){e(a),c(function(){f(a)},3e4)})}]);var app=angular.module("busFeedApp");app.controller("TimeCtrl",["$scope","$rootScope","$timeout",function(a,b,c){b.clock="Time...",a.tickInterval=1e3;var d=function(){b.clock=Date.now(),c(d,a.tickInterval)};c(d,a.tickInterval)}]);