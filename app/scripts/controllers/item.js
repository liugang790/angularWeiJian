'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app.items', {
      abstract:true,//抽象模板（固定不变的模板）
      url: '/items',
      templateUrl: 'views/item/main.html',
      controller: 'ItemCtrl'
    })
    .state('app.items.list', {
      url: '/list/:item_id',
      templateUrl: 'views/item/list.html',
      controller: 'ItemListCtrl'
    })
  })
  .controller('ItemCtrl', function ($scope, Item, $stateParams){
  
   })
  .controller('ItemListCtrl', function ($scope, Item, $stateParams, $location, $ionicScrollDelegate){
     $scope.share("未见旅游",
                "未见，未曾遇见过的美好");
    $scope.getNumber = function(num) {
       var array = new Array(parseInt(num));
       for(var i = 0; i < parseInt(num); i++){
          array[i] = i;
       }
       return array;
    }

    Item.getItemById($stateParams.item_id).then(function(response){
        $scope.item = response.data;
        $scope.item.id = $stateParams.item_id;
        $scope.setWeiXinTitle($scope.item.title);
        console.log($scope.item);

        $scope.share("未见旅游-"+$scope.item.title,
                "未见，未曾遇见过的美好",
                     $scope.item.feature_img[0]);
      });
    $scope.gotoAnchor = function(location, is_open) {
      if (!is_open) {
        $ionicScrollDelegate.resize();
        return;
      };

      $ionicScrollDelegate.resize().then(function(){
          $ionicScrollDelegate.$getByHandle('mainScroll').anchorScroll("#"+ $location.hash(location))
      });
    };
});    