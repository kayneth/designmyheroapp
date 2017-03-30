'use strict';

describe('Service: productModel', function () {

  // load the service's module
  beforeEach(module('designmyheroappApp'));

  // instantiate service
  var productModel;
  beforeEach(inject(function (_productModel_) {
    productModel = _productModel_;
  }));

  it('should do something', function () {
    expect(!!productModel).toBe(true);
  });

});
