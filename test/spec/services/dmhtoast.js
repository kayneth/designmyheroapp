'use strict';

describe('Service: dmhToast', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var dmhToast;
  beforeEach(inject(function (_dmhToast_) {
    dmhToast = _dmhToast_;
  }));

  it('should do something', function () {
    expect(!!dmhToast).toBe(true);
  });

});
