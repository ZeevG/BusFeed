'use strict';

describe('Controller: QuerybuilderCtrl', function () {

  // load the controller's module
  beforeEach(module('busFeedApp'));

  var QuerybuilderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    QuerybuilderCtrl = $controller('QuerybuilderCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
