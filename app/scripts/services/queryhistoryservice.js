'use strict';

angular.module('busFeedApp')
  .factory('queryHistoryService', [function() {

    var service = {

      queries: [],

      saveState: function () {
        localStorage.queries = angular.toJson(this.queries);
      },

      restoreState: function () {
        if(localStorage.queries !== undefined){
          this.queries = angular.fromJson(localStorage.queries);
        }
      },

      newQuery: function(obj){
        var found = false;

        for(var ii = 0; ii<this.queries.length; ii++){
          if(this.queries[ii].origin === obj.origin &&
            this.queries[ii].destination === obj.destination){

            found = true;
            break;
          }
        }

        if(found === false){
          this.queries.unshift(obj);
          this.queries = this.queries.slice(0,5);
          this.saveState();
        }
      }
    };

    return service;
  }]);