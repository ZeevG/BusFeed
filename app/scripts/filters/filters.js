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

      // Whoa, this is a little confusing...
      // Map each step to an icon
      var icons = steps.map(function(step){
        var route = '';

        if(step.travel_mode === 'TRANSIT'){
          if(step.transit.line.vehicle.type === 'BUS'){
            route = step.transit.line.short_name;
          }else{
            route = step.transit.line.name;
          }


          return '<i class="fa fa-2x"><img src="'+step.transit.line.vehicle.icon+'">&nbsp;'+route+'</i>';

        }

        return '<i class="'+iconClassName[step.travel_mode]+'">&nbsp;'+route+'</i>';
      });

      // Join each icon with a seperator
      return '<span class="steps-container">'+
              icons.join(iconSeperator)+
              '</span>';
    };
  })
  .filter('encodeURIComponent', function() {
    return window.encodeURIComponent;
  });