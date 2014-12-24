'use strict';

/**
 * @ngdoc function
 * @name busFeedApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the busFeedApp
 */
angular.module('busFeedApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
