'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.order', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/order',
      templateUrl: 'views/order/main.html',
      controller: 'OrderCtrl'
    })
    .state('app.order.list', {
      url: '/list',
      templateUrl: 'views/order/list.html',
      controller: 'OrderListCtrl'
    })
  })
.controller('OrderCtrl', function ($scope, $stateParams){

})
.controller('OrderListCtrl', function ($scope, $stateParams, Order){
   $scope.setWeiXinTitle("我的订单");
    var orders = {}
    $scope.selecTabIndex = 0;
    $scope.execute(function(){
    Order.getOrders().then(function(response){
          orders = response.data;

          $scope.display_orders = orders['complete'].concat(orders['incomplete']);
          
          console.log($scope.display_orders);
        }); 
    }, "//#/app/order/list");
    // $scope.goToPay = function(order){
    //      $state.go("app.item.list",{order_id:order});
    // }
    $scope.changeTab = function(index){
      if (index == $scope.selecTabIndex) {
        return;
      };
      $scope.selecTabIndex = index;
      switch (index)
      {
        case 0:
          $scope.display_orders = orders['complete'].concat(orders['incomplete']);
          break;
        case 1:
          $scope.display_orders = orders['incomplete']
          break;
        case 2:
          $scope.display_orders = orders['complete'];
          break;
      }
    }
});