'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.carts', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/carts',
      templateUrl: 'views/cart/main.html',
      controller: 'CartCtrl'
    })  
    .state('app.carts.list', {
      url: '/list/:item_id',   
      templateUrl: 'views/cart/list.html',
      controller: 'CartListCtrl'
    })
  })
  .controller('CartCtrl', function ($scope){

   })
  .controller('CartListCtrl', function ($scope, $location, $stateParams, $cookies, $state, Item, sweet, User){
    $scope.share("未见旅游",
                "未见，未曾遇见过的美好");
    $scope.pickedDate="2015-10-10";
    $scope.pickedPrice="1000";
    $scope.bounds = null;
    $scope.shipping_address = {};
    $scope.is_adult = 1;
    $scope.adult_number = 0;
    $scope.children_number = 0;
    $scope.item_mumber=1;
    $scope.cart = [];
    $scope.total_price = 0;
    $scope.date_check = false;
    $scope.user = {};

    $scope.execute(function(){ 
      User.getUser().then(function(response){
            $scope.user = response.data;
            console.log(response.data);
            $scope.shipping_address = { 
              name: $scope.user.name,
              phone: $scope.user.phone,
              email: $scope.user.email
            }
          });
     }, "//#/app/carts/list/"+$stateParams.item_id);

    if ($cookies.get("o")) {
      if (!$scope.shipping_address) {
        $scope.shipping_address = angular.fromJson($cookies.get("o")).shipping_address;
      };
    }

    Item.getItemById($stateParams.item_id).then(function(response){
        $scope.item = response.data;
        $scope.item.id = $stateParams.item_id;
        console.log($scope.item);
        $scope.selected_combo_id = $scope.item.combo[0][0];
        $scope.selected_combo_name = $scope.item.combo[0][1];
        $scope.comboWithPrice = $scope.item.price[(""+$scope.selected_combo_id)];
                  console.log($scope.comboWithPrice); 

        $scope.share("未见旅游-"+$scope.item.title,
                "未见，未曾遇见过的美好");          

        var date_keys = Object.keys($scope.comboWithPrice);
        $scope.selected_prices = $scope.item.price[(""+$scope.selected_combo_id)][date_keys[0]];
        console.log($scope.selected_prices);
        $scope.dateSet = date_keys[0].split("-").join("/");
        $scope.pickedDate = date_keys[0].split("-").join("/");

        if($scope.selected_prices[3] > 0 ){
          $scope.adult_number = 1;
        }
    });
    
    $scope.cloudTagClicked = function cloudTagClicked(messsage) {
      $scope.selected_combo_id = messsage[0];
      $scope.selected_combo_name = messsage[1];
      console.log($scope.selected_combo_id,$scope.selected_combo_name);
      $scope.comboWithPrice = $scope.item.price[(""+$scope.selected_combo_id)];
                  console.log($scope.comboWithPrice);
      var date_keys = Object.keys($scope.comboWithPrice);
      $scope.selected_prices = $scope.item.price[(""+$scope.selected_combo_id)][date_keys[0]];
      
      $scope.dateSet = date_keys[0].split("-").join("/");
      $scope.pickedDate = date_keys[0].split("-").join("/");
      // if($scope.selected_prices[3] > 0 ){
      //   $scope.adult_number = 1;
      // }
            console.log($scope.selected_prices);
    };

    $scope.changeCouponCheck = function(){
      $scope.coupon_check = !$scope.coupon_check;
    }

    $scope.coupondiscount = function(){
      var fee = 100 * ($scope.adult_number + $scope.children_number);
      if ($scope.user.my_coupon <= fee) {
        return $scope.user.my_coupon;
      }else{
        return fee;
      };
    }

    $scope.changeDateCheck = function(){
      $scope.date_check = !$scope.date_check;
    }

    $scope.changePrice = function(date){
      $scope.dateSet = date;
      $scope.pickedDate =date;
      $scope.selected_prices = $scope.item.price[(""+$scope.selected_combo_id)][date];
      $scope.date_check = false;
    }

    $scope.addNum = function (index) {
      if (index==0) {
        if($scope.adult_number >= $scope.selected_prices[3]){
          return;
        }
        $scope.adult_number++;
      }else{
        if($scope.adult_number == 0){
          return;
        }
        else{
        if($scope.children_number>=$scope.selected_prices[4]){
          return;
        }
        $scope.children_number++;
        }
      };
      $scope.item_mumber++;
      console.log($scope.selected_prices);
      // $scope.pickedPrice = parseInt($scope.selected_prices[0][$scope.is_adult]) * $scope.item_mumber;
    }
    $scope.decNum = function (index) {
      if (index==0) {
        if($scope.adult_number<=0){
           return;
        }
        $scope.adult_number--;
      }else{
        if($scope.children_number<=0){
           return;
        }
        $scope.children_number--;
      };
    }

    // $scope.addToCart = function(){
    //   $scope.cart.push({
    //     combo_name: $scope.selected_combo_name,
    //     combo_id: $scope.selected_combo_id,
    //     is_adult: $scope.is_adult,
    //     item_mumber: $scope.item_mumber,
    //     price: $scope.pickedPrice,
    //     date: $scope.pickedDate
    //   })

    //   var sum = 0;
    //   $scope.cart.forEach(function(element){
    //     sum += element.price;
    //   });

    //   $scope.total_price = sum;
    // }

    // $scope.removeToCart = function(index){
    //   $scope.cart.splice(index,1);
    // }

    $scope.placeOrder = function(){
      var total_price = $scope.adult_number * $scope.selected_prices[1] + $scope.children_number * $scope.selected_prices[2];
      var order = {
        combo_name: $scope.selected_combo_name,
        combo_id: $scope.selected_combo_id,
        // shipping_address: $scope.shipping_address,
        adult_number: $scope.adult_number,
        children_number: $scope.children_number,
        adult_price: $scope.selected_prices[1],
        children_price: $scope.selected_prices[2],
        date:$scope.pickedDate.split("/").join("-"),
        total_price : total_price,
        real_price: $scope.coupon_check ? total_price - $scope.coupondiscount() : total_price,
        created: Date.parse(new Date())/1000,
        title: $scope.item.title,
        coupon_check      :   $scope.coupon_check ? 1 : 0,
        coupon: $scope.coupondiscount()
      };
      $cookies.put("o", JSON.stringify(order));
      var order_params = {
            product     :   $stateParams.item_id,
            combo       :   $scope.selected_combo_id,
            price       :   $scope.comboWithPrice[$scope.pickedDate.split("/").join("-")][0],
            people      :   [order.adult_number, order.children_number],
            total_cost  :   order.real_price,
            coupon      :   $scope.coupon_check ? 1 : 0
          };
      $cookies.put("o_params", JSON.stringify(order_params));
      $state.go("app.information.list");
    }
 
}); 