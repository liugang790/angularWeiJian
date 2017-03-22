'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.vouchers', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/vouchers',
      templateUrl: 'views/vouchers/main.html',
      controller: 'VouchersCtrl'
    })
    .state('app.vouchers.list', {
      url: '/list',
      templateUrl: 'views/vouchers/list.html',
      controller: 'VouchersListCtrl'
    })
  })
  .controller('VouchersCtrl', function (){
  
   })
  .controller('VouchersListCtrl', function ($scope, User){
    $scope.share("未见旅游-领取代金券",
                "未见，未曾遇见过的美好"); 
    $scope.setWeiXinTitle("领代金券");
    $scope.execute(function(){
      User.getUser().then(function(response){
            $scope.user = response.data;
            console.log(response.data);
          });
     }, "//#/app/vouchers/list");
});   