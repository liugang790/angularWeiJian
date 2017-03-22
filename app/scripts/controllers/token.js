'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.sb', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/sb',
      templateUrl: 'views/sb/main.html',
      controller: 'SbCtrl'
    })
    .state('app.sb.list', {
      url: '/list',
      templateUrl: 'views/sb/list.html',
      controller: 'SbListCtrl'
    })
  })
  .controller('SbCtrl', function (){
  
   })
  .controller('SbListCtrl', function ($scope, $cookies){
    $scope.token = $cookies.get('token')

});    