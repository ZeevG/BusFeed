"use strict";angular.module("busFeedApp",["busFeedApp.filters","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html"})}]).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyCcF6B47_VLar_L3YSHO3vFVlVxJA3HLP8",v:"3.17",libraries:"weather,geometry,visualization"})}]);var sizeMultiplier="2",iconClassName={TRANSIT:"fa fa-bus fa-"+sizeMultiplier+"x",WALKING:"fa fa-male fa-"+sizeMultiplier+"x"},iconSeperator='<i class="fa fa-angle-right fa-'+sizeMultiplier+'x"></i>';angular.module("busFeedApp.filters",[]).filter("iconise_steps",function(){return function(a){var b=a.map(function(a){var b="";return"TRANSIT"===a.travel_mode&&(b=a.transit.line.short_name),'<i class="'+iconClassName[a.travel_mode]+'">&nbsp;'+b+"</i>"});return b.join(iconSeperator)}}),angular.module("busFeedApp").controller("MainCtrl",["$scope","uiGmapGoogleMapApi",function(a,b){a.test="skdlfj",a.routes=[],b.then(function(b){var c=new b.DirectionsService,d={origin:"-31.9705868,115.8149134",destination:"Forrest Place, Perth",travelMode:b.TravelMode.TRANSIT,provideRouteAlternatives:!0},e=c.route(d,function(b,c){console.log(b),console.log(c),a.routes=b.routes,a.query=d});console.log(d),console.log(e)})}]);var app=angular.module("busFeedApp");app.controller("TimeCtrl",["$scope","$timeout",function(a,b){a.clock="loading clock...",a.tickInterval=1e3;var c=function(){a.clock=Date.now(),b(c,a.tickInterval)};b(c,a.tickInterval)}]);