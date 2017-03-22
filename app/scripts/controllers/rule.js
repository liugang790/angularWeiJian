'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.rule', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/rule',
      templateUrl: 'views/rule/main.html',
      controller: 'RuleCtrl'
    })
    .state('app.rule.list', {
      url: '/list',
      templateUrl: 'views/rule/list.html',
      controller: 'RuleListCtrl'
    })
  })
  .controller('RuleCtrl', function (){
  
   })
  .controller('RuleListCtrl', function ($scope){
    $scope.share("未见旅游-领取代金券",
                "未见，未曾遇见过的美好"); 
    $scope.setWeiXinTitle("活动规则");
});    