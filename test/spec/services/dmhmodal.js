'use strict';

describe('Service: dmhModal', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var dmhModal;
  beforeEach(inject(function (_dmhModal_) {
    dmhModal = _dmhModal_;
  }));

  it('should do something', function () {
    expect(!!dmhModal).toBe(true);
  });

});
