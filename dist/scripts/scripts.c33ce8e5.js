"use strict";angular.module("busFeedApp",["busFeedApp.filters","ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","uiGmapgoogle-maps","angularMoment","snap"]).config(["$routeProvider",function(a){a.when("/feed/",{templateUrl:"views/feed.html"}).when("/",{templateUrl:"views/querybuilder.html"})}]).config(["uiGmapGoogleMapApiProvider",function(a){a.configure({key:"AIzaSyCcF6B47_VLar_L3YSHO3vFVlVxJA3HLP8",v:"3.17",libraries:"weather,geometry,visualization"})}]).config(["snapRemoteProvider",function(a){a.globalOptions.disable="right"}]).constant("angularMomentConfig",{preprocess:"unix",timezone:"Europe/London"}).run(["queryHistoryService",function(a){a.restoreState()}]).controller("OverlayCtrl",["$scope",function(a){a.$watch("$viewContentLoaded",function(){console.log("viewContentLoaded"),angular.element("#overlay").on("animationend animationend webkitAnimationEnd oanimationend MSAnimationEnd",function(){this.remove()}),angular.element("#overlay").addClass("out")})}]);var sizeMultiplier="2",iconClassName={TRANSIT:"fa fa-bus fa-"+sizeMultiplier+"x",WALKING:"fa fa-male fa-"+sizeMultiplier+"x"},iconSeperator='<i class="fa fa-angle-right fa-'+sizeMultiplier+'x"></i>';angular.module("busFeedApp.filters",[]).filter("iconise_steps",function(){return function(a){var b=a.map(function(a){var b="";return"TRANSIT"===a.travel_mode&&(b=a.transit.line.short_name),'<i class="'+iconClassName[a.travel_mode]+'">&nbsp;'+b+"</i>"});return b.join(iconSeperator)}}).filter("encodeURIComponent",function(){return window.encodeURIComponent}),angular.module("busFeedApp").factory("queryHistoryService",[function(){var a={queries:[],saveState:function(){localStorage.queries=angular.toJson(this.queries)},restoreState:function(){void 0!==localStorage.queries&&(this.queries=angular.fromJson(localStorage.queries))},newQuery:function(a){for(var b=!1,c=0;c<this.queries.length;c++)if(this.queries[c].origin===a.origin&&this.queries[c].destination===a.destination){b=!0;break}b===!1&&(this.queries.unshift(a),this.queries=this.queries.slice(0,5),this.saveState())}};return a}]),angular.module("busFeedApp").controller("MainCtrl",["$scope","$rootScope","$routeParams","$timeout","uiGmapGoogleMapApi","$controller","queryHistoryService",function(a,b,c,d,e,f,g){function h(b){var c=new b.DirectionsService;a.query=k,c.route(k,function(b,c){var d=new Hashes.MD5;g.newQuery(a.query),console.log(c);for(var e=0;e<b.routes.length;e++)b.routes[e].md5=d.hex(angular.toJson(b.routes[e]));a.$apply(function(){a.routes=b.routes})})}function i(a){h(a),d(function(){i(a)},j)}f("OverlayCtrl",{$scope:a}),a.routes=[];var j=12e4,k={travelMode:"TRANSIT",provideRouteAlternatives:!0};angular.extend(k,c),e.then(function(a){i(a)})}]);var app=angular.module("busFeedApp");app.controller("TimeCtrl",["$scope","$rootScope","$timeout",function(a,b,c){b.clock="Time...",a.tickInterval=1e3;var d=function(){b.clock=Date.now(),c(d,a.tickInterval)};c(d,a.tickInterval)}]),angular.module("busFeedApp").controller("QuerybuilderCtrl",["$scope","$rootScope","$location","$controller","uiGmapGoogleMapApi",function(a,b,c,d,e){d("OverlayCtrl",{$scope:a});var f;a.icon="working",e.then(function(b){f=b,a.icon="locate"}),a.go=function(){var b={origin:a.origin,destination:a.destination};c.path("/feed/").search(b)},a.geolocate=function(){"locate"===a.icon&&(a.icon="working",navigator.geolocation.getCurrentPosition(function(b){var c=new f.LatLng(b.coords.latitude,b.coords.longitude),d=new f.Geocoder;d.geocode({latLng:c},function(b,c){console.log("Reverse Geocoder",c),a.$apply(function(){a.origin=_.map(b[0].address_components.slice(0,3),function(a){return a.short_name}).join(" "),a.icon="success"})})}))}}]),angular.module("busFeedApp").controller("RecentQueriesCtrl",["$scope","queryHistoryService",function(a,b){a.queryHistory=b}]);