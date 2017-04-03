'use strict';

describe('Service: creation', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var creation;
  beforeEach(inject(function (_creation_) {
    creation = _creation_;
  }));

  it('should do something', function () {
    expect(!!creation).toBe(true);
  });

});
