'use strict';

describe('Controller: LatestcreaCtrl', function () {

  // load the controller's module
  beforeEach(module('designmyheroappApp'));

  var LatestcreaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LatestcreaCtrl = $controller('LatestcreaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(LatestcreaCtrl.awesomeThings.length).toBe(3);
  });
});
