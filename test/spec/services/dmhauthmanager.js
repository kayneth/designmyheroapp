'use strict';

describe('Service: dmhAuthManager', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var dmhAuthManager;
  beforeEach(inject(function (_dmhAuthManager_) {
    dmhAuthManager = _dmhAuthManager_;
  }));

  it('should do something', function () {
    expect(!!dmhAuthManager).toBe(true);
  });

});
