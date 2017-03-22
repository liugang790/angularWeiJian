'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.bounds', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/bounds',
      templateUrl: 'views/bounds/main.html',
      controller: 'BoundsCtrl'
    })
    .state('app.bounds.list', {
      url: '/list',
      templateUrl: 'views/bounds/list.html',
      controller: 'BoundsListCtrl'
    })
  })
.controller('BoundsCtrl', function ($scope, $stateParams){

})
.controller('BoundsListCtrl', function ($scope, $stateParams, Bound){
   $scope.setWeiXinTitle("我的代金券");
    $scope.bounds = {};
    $scope.selecTabIndex = 0;
    $scope.execute(function(){
      Bound.getBounds().then(function(response){
            $scope.bounds = response.data;
            $scope.display_bounds = $scope.bounds.income.concat($scope.bounds.outcome) ;
            console.log($scope.display_bounds);
          });
        }, "//#/app/bounds/list");
    $scope.changeTab = function(index){
      if (index == $scope.selecTabIndex) {
        return;
      };
      $scope.selecTabIndex = index; 
      switch (index)
      {
        case 0:
            $scope.display_bounds = $scope.bounds.income.concat($scope.bounds.outcome);
          break;
        case 1:
            $scope.display_bounds = $scope.bounds.income;
          break;
        case 2:
            $scope.display_bounds = $scope.bounds.outcome;
          break;
      }
    }
});