'use strict';

describe('Directive: modelList', function () {

  // load the directive's module
  beforeEach(module('designmyheroappApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<model-list></model-list>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the modelList directive');
  }));
});
