'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.reward', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/reward',
      templateUrl: 'views/reward/main.html',
      controller: 'RewardCtrl'
    })
    .state('app.reward.list', {
      url: '/list',
      templateUrl: 'views/reward/list.html',
      controller: 'RewardListCtrl'
    })
  })
  .controller('RewardCtrl', function ($scope, $state, Invit){
    $scope.daijinquan = true;
    $scope.all_view = false;
     $scope.execute(function(){ 
       Invit.yaoqingma({inv_code: "test"}).success(function(data,status,headers,config){
       }).error(function(data,status,headers,config){
          if(status == 409){
            $scope.daijinquan = false;
          }
            $scope.all_view = true;
       });
    }, "//#/app/reward/list");          
   })
  .controller('RewardListCtrl', function ($scope, sweet, $state, Invit, $cookies){
    $scope.share("未见旅游-领取代金券",
                "未见，未曾遇见过的美好");        
    $scope.setWeiXinTitle("领代金券");

    if (!$cookies.get('token')) {
      var url = url || window.location.href;
            if (url.indexOf("token=")>-1) {
              url = url.replace("token="+$location.search().token,"");
            };
            url = url.split("/#/app/")[1].replace(/\//g,"OO");
            location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7ddd028c2621995d&redirect_uri=http://www.techmars.net/api/v1/wxauth&response_type=code&scope=snsapi_base&state="
              + url;
    };

    $scope.showAlert = function(code) {

       $scope.execute(function(){ 
         Invit.yaoqingma({inv_code: code}).success(function(data,status,headers,config){
           //  sweet.show({
           //    title:"成功获取优惠券",
           //    type:"success",
           //    showConfirmButton: false,
           //    timer:2000
           // });
           $state.go("app.vouchers.list");
           console.log(data);
         }).error(function(data,status,headers,config){
            if (status != 409) {
              alert("报错码:"+status+data);
            };
            var err_msg = "验证码错误";
            if(status == 409){
              $scope.daijinquan = false;
              return;
            }
            sweet.show({
                    title:err_msg,
                    type:"error",
                    showConfirmButton: false,
                    timer:2000
                  });
         });
      }, "//#/app/reward/list");          
       
     }; 
});    