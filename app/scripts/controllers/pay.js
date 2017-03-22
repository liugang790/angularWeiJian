'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.pay', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/pay',
      templateUrl: 'views/pay/main.html',
      controller: 'PayCtrl'
    })
    .state('app.pay.list', {
      url: '/list/:order_id',
      templateUrl: 'views/pay/list.html',
      controller: 'PayListCtrl'
    })
    .state('app.pay.wxpay', {
      url: '/wxpay/:order_id',
      templateUrl: 'views/pay/wxpay.html',
      controller: 'WXPayCtrl'
    })
    .state('app.pay.xxpay', {
      url: '/xxpay/:order_id',
      templateUrl: 'views/pay/xxpay.html',
      controller: 'XXPayCtrl'
    })
  })
.controller('PayCtrl', function ($scope, $stateParams){
})
.controller('PayListCtrl', function ($scope, $stateParams, $cookies, $state){
  $scope.share("未见旅游",
                "未见，未曾遇见过的美好"
                );
   $scope.setWeiXinTitle("去支付");
    $scope.order = angular.fromJson($cookies.get('o'));
    $scope.pay_ways = {
      is_wx_pay : true,
      is_xx_pay: false
    }
    console.log($scope.order);
    $scope.order_id = $stateParams.order_id;

    $scope.goToPay = function(){
      if ($scope.pay_ways.is_xx_pay) {
        $state.go("app.pay.xxpay",{order_id:$stateParams.order_id});
      }
      if ($scope.pay_ways.is_wx_pay) {
        $state.go("app.pay.wxpay",{order_id:$stateParams.order_id});
      }

    }
})

.controller('WXPayCtrl', function ($scope, $stateParams, $cookies, ENV, Pay){
  $scope.share("未见旅游",
                "未见，未曾遇见过的美好",
                '',
                "http://www.techmars.net/weijian/#/app");
  $scope.order_id = $stateParams.order_id;
  var order = angular.fromJson($cookies.get('o'));
  var order_params = $cookies.put("o_params")
  $scope.real_price = order.real_price;
  $scope.qcode_image_url = ENV.apiUrl+"/v1/wxqr?trade_no="+$scope.order_id;

  Pay.getWXQRcode($scope.order_id).then(function(response){
    $scope.qrcode_url = response.data.url;
    console.log($scope.qrcode_url);
  });
})

.controller('XXPayCtrl', function ($scope, $stateParams, $cookies, ENV){
  $scope.share("未见旅游",
                "未见，未曾遇见过的美好",
                '',
                "http://www.techmars.net/weijian/#/app");
  $scope.order_id = $stateParams.order_id;
  var order = angular.fromJson($cookies.get('o'));
});