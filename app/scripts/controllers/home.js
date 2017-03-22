'use strict';

angular.module('WeiJianApp')
  .config(function ($stateProvider) {
    $stateProvider
    .state('app', {
      abstract:true,
      url: '/app',
      templateUrl: 'views/home/main.html',
      controller: 'MainCtrl'
    })
    .state('app.home', {
      url: '',
      templateUrl: 'views/home/list.html',
      controller: 'HomeCtrl'
    })
  })
  .controller('MainCtrl', function ($scope, $cookies) {
  })
  .controller('HomeCtrl', function ($scope, Banner, $location, $cookies,HomeCard, $state) {
    $scope.setWeiXinTitle("未见旅游");
    $scope.share("未见旅游",
                "未见，未曾遇见过的美好");
    Banner.getBanners().then(function(response){
      $scope.banners = response.data;
      var length = $scope.banners.length;
      $scope.banner_style = (($scope.swidth_rem - (.08 * length + .067 * length)) /2.0) +'rem';
    
      $scope.bannerClicked = function(banner){
       location.href=banner.banner_link_to;
      };
    });
    
    HomeCard.getHomeCards().then(function(response){
      $scope.home_cards = response.data;
    });
     $scope.home_cardClicked = function(home_card){
        $state.go('app.categories.list', {category_name:home_card.card_text, link: home_card.card_link_to});
      };
    });

    