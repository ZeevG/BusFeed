'use strict';

var sizeMultiplier = '2';

var iconClassName = {
  'TRANSIT': 'fa fa-bus fa-'+sizeMultiplier+'x',
  'WALKING': 'fa fa-male fa-'+sizeMultiplier+'x'
};

var iconSeperator = '<i class="fa fa-angle-right fa-'+sizeMultiplier+'x"></i>';

angular.module('busFeedApp.filters', [])
  .filter('iconise_steps', function(){
    return function(steps){
      var icons = steps.map(function(step){
        var route = '';

        if(step.travel_mode === 'TRANSIT'){
          route = step.transit.line.short_name;
        }

        return '<i class="'+iconClassName[step.travel_mode]+'">&nbsp;'+route+'</i>';
      });
      return icons.join(iconSeperator);
    };
  });