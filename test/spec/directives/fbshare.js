'use strict';

describe('Directive: fbShare', function () {

  // load the directive's module
  beforeEach(module('designmyheroappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<fb-share></fb-share>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the fbShare directive');
  }));
});
