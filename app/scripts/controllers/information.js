'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.information', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/information',
      templateUrl: 'views/information/main.html',
      controller: 'InformationCtrl'
    })
    .state('app.information.list', {
      url: '/list',
      templateUrl: 'views/information/list.html',
      controller: 'InformationListCtrl'
    })
  })
  .controller('InformationCtrl', function (){
  
   })
  .controller('InformationListCtrl', function ($scope, $cookies, sweet, Order, $state, User){
    $scope.share("未见旅游",
                "未见，未曾遇见过的美好");
     $scope.setWeiXinTitle("提交订单");
      $scope.shipping_address = {};
      var order = angular.fromJson($cookies.get('o'));//从cookies取出字符串然后转换成对象（Object）
      if (order.shipping_address) {
        $scope.shipping_address = order.shipping_address;
      };

      $scope.execute(function(){
        User.getUser().then(function(response){
          console.log(response.data);
            $scope.shipping_address = response.data;
        });
      });
   $scope.placeOrder = function(){
      if(!$scope.shipping_address.name){
        $scope.showAlert("姓名");
        return;
      }
      if(!$scope.shipping_address.phone){
        $scope.showAlert("电话");
        return;
      }
      if (!$scope.shipping_address.email) {
        $scope.showAlert("邮箱");
        return;
      }

      if($scope.shipping_address.phone.length < 7 || $scope.shipping_address.phone.length > 15){
        $scope.showHint("电话");
        return;
      }
      if (!$scope.shipping_address.email.match("^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$")) {
        $scope.showHint("邮箱");
        return;
      };

      order.shipping_address = $scope.shipping_address;
      $cookies.put("o", JSON.stringify(order));


        $scope.execute(function(){
          var params =  angular.fromJson($cookies.get('o_params'));
          console.log(params);
          User.updateUser($scope.shipping_address).then(function(response){
            Order.createOrder(params).then(function(response){
              $cookies.put("oid", response.data['order_num']);
              console.log(response.data);
              $state.go("app.pay.list",{order_id:response.data['order_num']});
            }); 
          });
        });
     }
       $scope.showAlert = function(hint) {
        sweet.show({
          title:"请完成预订人信息",
          text:hint+"没有输入哟！",    
          type:"error",
          confirmButtonText: "确认"
        });
     };
       $scope.showHint = function(hint) {
        sweet.show({
          title:"请完成预订人信息",
          text:hint+"的格式不正确诶！",    
          type:"error",
          confirmButtonText: "确认"
        });
     };
});    
