'use strict';

angular.module('busFeedApp')
  .factory('routeService', ['$rootScope', function ($rootScope) {

    var service = {

      model: {
          orifin: '',
          destination: ''
      },

      SaveState: function () {
          sessionStorage.routeService = angular.toJson(service.model);
      },

      RestoreState: function () {
          service.model = angular.fromJson(sessionStorage.routeService);
      }
    };

    $rootScope.$on('savestate', service.SaveState);
    $rootScope.$on('restorestate', service.RestoreState);

    return service;
  }]);