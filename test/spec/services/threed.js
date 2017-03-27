'use strict';

describe('Service: threeD', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var threeD;
  beforeEach(inject(function (_threeD_) {
    threeD = _threeD_;
  }));

  it('should do something', function () {
    expect(!!threeD).toBe(true);
  });

});
