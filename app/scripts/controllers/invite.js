'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.invite', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/invite',
      templateUrl: 'views/invite/main.html',
      controller: 'InviteCtrl'
    })
    .state('app.invite.list', {
      url: '/list',
      templateUrl: 'views/invite/list.html',
      controller: 'InviteListCtrl'
    })
  })
  .controller('InviteCtrl', function (){
  
   })
  .controller('InviteListCtrl', function ($scope, $location, Invit, WX){
    $scope.share("未见旅游-邀请得券",
            "关注未见旅游，领取优惠券",
            '',
            'http://www.techmars.net/weijian/#/app'
          );
    if (window.location.href.indexOf("inv_code=")>-1) {
      Invit.getProfileByInvitCode(window.location.href.split("inv_code=")[1]).then(function(response) {
        $scope.invite = response.data;
      })
    }else{
      $scope.execute(function(){
        Invit.getInvitCode().then(function(response){
          $scope.invite = response.data;

          WX.getWX({'url':window.location.href.split("#")[0]}).then(function(response){
              var wx_config = response.data;
              wx_config.jsApiList = ['onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'];
              wx.config(wx_config);
              $scope.share("未见旅游-邀请得券",
                  "我是"+$scope.invite.sender+"这是我的未见邀请码，关注“未见”后填写我的邀请码可以领取20元旅游代金券哦",
                  '',
                  window.location.href+"?inv_code="+$scope.invite.inv_code
                ); 
          });  
        });
      }, "//#/app/invite/list");
    };
});    