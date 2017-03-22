'use strict';

describe('Controller: HomeCtrl', function () {

  // load the controller's module
  beforeEach(module('WeiJianApp'));

  var HomeCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomeCtrl = $controller('HomeCtrl', {
      $scope: scope
    });
  }));

  it('测试一下title是否等于3', function () {
    console.log(document.title);
    console.log(scope.a);
    expect(scope.a).toBe(3);
    expect(document.title).toBe('2333');
  });
});
 
