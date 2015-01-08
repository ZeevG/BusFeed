'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:RecentQueriesCtrl
 * @description
 * # RecentQueriesCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('RecentQueriesCtrl', ['$scope', 'queryHistoryService', function ($scope, queryHistoryService) {
    $scope.queryHistory = queryHistoryService;
  }]);
