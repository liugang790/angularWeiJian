'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.categories', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/categories',
      templateUrl: 'views/category/main.html',
      controller: 'CategoryCtrl'
    })
    .state('app.categories.list', {
      url: '/list/:category_name/link/:link',
      templateUrl: 'views/category/list.html',
      controller: 'CategoryListCtrl'
    })
  })
  .controller('CategoryCtrl', function ($scope, Product, $state, $stateParams) {
  })  
  .controller('CategoryListCtrl', function ($scope, $stateParams, Product, $ionicScrollDelegate) {
    $scope.current_index = 0;
    $scope.setWeiXinTitle($stateParams.category_name);
    $scope.share("未见旅游-"+$stateParams.category_name,
                "未见，未曾遇见过的美好");
    $scope.select_data = [];
    $scope.items = [];

    $scope.select_types = Product.select_types;
    Product.getItems($stateParams.link).then(function(response){
      $scope.product = response.data;
      console.info(response.data);

      $scope.select_data[0] = $scope.product.p_types;
      $scope.select_data[1] = $scope.product.sources;
      $scope.select_data[2] = $scope.product.destinations;
      $scope.select_data[3] = $scope.product.departure_time;

      $scope.select_data[0].name = "产品类型";
      $scope.select_data[1].name = "出发地";
      $scope.select_data[2].name = "目的地";
      $scope.select_data[3].name = "出行时间";
      for (var i = $scope.select_data.length - 1; i >= 0; i--) {
        $scope.select_data[i].sets.unshift(['全部', $scope.select_data[i].total]);//在 $scope.select_data[i].sets数组最前面添加一个名为 “全部”的元素，返回添加的数组
      };
      console.log("图:"+$scope.product.items[0].img_url);
      $scope.share("未见旅游-"+$stateParams.category_name, 
                $scope.product.items[0].img_url);
      $scope.items = angular.copy($scope.product.items);
      console.log($scope.items);
      console.log($scope.select_data);
    });

    function filterItems(){
      $scope.items = $scope.product.items.filter(filterType("产品类型","p_type",0))
                                .filter(filterType("出发地","src",1))
                                .filter(filterType("目的地","dst",2))
                                .filter(filterDate("出发时间","off_time",3)); 
      $ionicScrollDelegate.resize(); 
      console.log($scope.items);
    }


    function filterDate(name, key, index){
      return function(element){
        console.log(name,key,$scope.select_data[index].title);
        if (!$scope.select_data[index].title || $scope.select_data[index].title == "全部" || $scope.select_data[index].title == name) {
            return true
        };
        return element[key].indexOf($scope.select_data[index].title) > -1;
      }
    }

    function filterType(name, key, index){
      return function(element){
        console.log(name,key,$scope.select_data[index].title);
        if (!$scope.select_data[index].title || $scope.select_data[index].title == "全部" || $scope.select_data[index].title == name) {
            return true
        };
        return element[key] == $scope.select_data[index].title;
      }
    }

    $scope.selectClick = function(index){
      if ($scope.current_index == index && $scope.is_select_menu) {
        $scope.is_select_menu = false;
        return;
      };
      $scope.is_select_menu = true;
      $scope.current_index = index;
    }

    $scope.listItemClicked = function(index){
      $scope.is_select_menu = false;
      $scope.select_data[$scope.current_index].title = $scope.select_data[$scope.current_index].sets[index][0];
      filterItems();
    }

    $scope.isSelectTitle = function(index){
      return (index == $scope.current_index) && $scope.is_select_menu;
    }

    $scope.getTitle = function(index){
      if (!(!$scope.select_data[index].title || ($scope.select_data[index].title == "全部"))) {
        return $scope.select_data[index].title;
      } else{
        return $scope.select_data[index].name;
      };
    }
})