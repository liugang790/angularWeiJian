'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.wait', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/wait',
      templateUrl: 'views/wait/main.html',
      controller: 'WaitCtrl'
    })
    .state('app.wait.list', {
      url: '/list/:title',
      templateUrl: 'views/wait/list.html',
      controller: 'WaitListCtrl'
    })
  })
.controller('WaitCtrl', function ($scope, $stateParams){

})
.controller('WaitListCtrl', function ($scope, $stateParams){
  $scope.setWeiXinTitle($stateParams.title||"敬请期待");
    
});