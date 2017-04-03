'use strict';

describe('Service: canvasToBlob', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var canvasToBlob;
  beforeEach(inject(function (_canvasToBlob_) {
    canvasToBlob = _canvasToBlob_;
  }));

  it('should do something', function () {
    expect(!!canvasToBlob).toBe(true);
  });

});
