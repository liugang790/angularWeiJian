'use strict';

/**
 * @ngdoc overview
 * @name WeiJianApp
 * @description
 * # WeiJianApp
 *
 * Main module of the application.
 */
angular.module('WeiJianApp', [
  'config',
  'ngCookies',
  'ngRoute',
  'ngTouch',
  'ui.router',
  'angular-md5',
  'ab-base64',
  'ionic',
  'angular-carousel',
  'WeiJianAppFilter',
  '720kb.datepicker',
  'hSweetAlert',
  'ja.qr'
]).run(function($rootScope, $cookies, $location, User, ENV, WX) {
  document.getElementById("spinner").style.display = "none";
  $rootScope.ua = navigator.userAgent.toLowerCase();
  $rootScope.font_size = window.screen.width*1.0/320*64;
  $rootScope.swidth = window.screen.width;

  var ua = navigator.userAgent.toLowerCase();

  if(ua.indexOf("android")>-1){
    var webkit = parseInt(ua.split('applewebkit/')[1].substring(0,3));
    if (webkit < 537) {
        $rootScope.font_size = $rootScope.font_size / window.devicePixelRatio;
    };
    $rootScope.is_android = true;
  }

  if($rootScope.ua.indexOf("iphone")>-1 || $rootScope.ua.indexOf("ipad")>-1){
      $rootScope.is_ios = true;
    }

  $rootScope.html_font_size = "font-size:"+ $rootScope.font_size +'px'; 
  $rootScope.swidth_rem = window.screen.width/$rootScope.font_size;
  $rootScope.compressImageUrl = function(url, height, width, is_not_qiniu, is_not_jpg){
    console.log(url);
    if(!url){
      return null;
    }

    if (is_not_qiniu === true) {
      return 'http://www.techmars.net/'+url;
    };

    width = width || (window.screen.width / $rootScope.font_size);

    var pixels = width * height * $rootScope.font_size * $rootScope.font_size;
    pixels *= window.devicePixelRatio*window.devicePixelRatio;
    if (is_not_jpg) {
      return url+"?imageMogr2/thumbnail/"+ pixels+"@";
    };
    return url+"?imageMogr2/thumbnail/"+ pixels +"@/format/jpg";
  }

  $rootScope.setWeiXinTitle = function(title){
    if($rootScope.is_ios){   
      var body = document.getElementsByTagName('body')[0];
      document.title = title;
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", "http://7xls5t.com2.z0.glb.qiniucdn.com/loading.png");
      iframe.addEventListener('load', function() {
        setTimeout(function() {
          iframe.removeEventListener('load');
            document.body.removeChild(iframe);
          }, 0);
      });
      document.body.appendChild(iframe);
    }else{
      document.title = title;
    }
  }


  $rootScope.execute = function(callback, url){
    if (ENV.isDebug) {
      $cookies.put("token",ENV.fake_token);
      callback();
      return;
    };
    if (!$cookies.get('token')) {
      // if (!$cookies.get('openid')) {
        // alert("获取openid");
        // if (ua.indexOf("micromessenger")>-1) {
          url = url || window.location.href;
          if (url.indexOf("token=")>-1) {
            url = url.replace("token="+$location.search().token,"");
          };
          url = url.split("/#/app/")[1].replace(/\//g,"OO");
          location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7ddd028c2621995d&redirect_uri=http://www.techmars.net/api/v1/wxauth&response_type=code&scope=snsapi_base&state="
            + url;
        // } else{
        // };
      // } else{
      //   alert("获取token");
      //     var params = angular.fromJson($cookies.get('o')).shipping_address;
      //     params.openid = $cookies.get('openid');
      //     params.password = Math.random().toString(36);
      //     User.createUser(params).then(function(response){
      //       $cookies.put("token", response.data["token"]);
      //       $cookies.put("key", response.data["key"]);
      //       callback();
      //     });
      // };
    } else{
      callback();
    };
  };

  WX.getWX({'url':window.location.href.split("#")[0]}).then(function(response){
        var wx_config = response.data;
        wx_config.jsApiList = ['onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo',
        'onMenuShareQZone'];
        wx.config(wx_config);
  });

  $rootScope.share = function(title, desc, imgUrl, link, success, cancel){
    if (imgUrl && imgUrl.indexOf("http") == -1) {
        imgUrl = "http://www.techmars.net/"+imgUrl;
    };

    link = link || window.location.href;
    if (link.indexOf("?token=")>-1) {
      // alert("token="+$location.search().token);
      link = link.replace("?token="+$location.search().token,"");
    };

    var shareData = {
        title: title,
        desc: desc || '',        
        imgUrl: imgUrl || 'http://7xls5t.com2.z0.glb.qiniucdn.com/250.png',
        link: link,
        type: 'link',
        success: typeof(success) == "function" ? success() : function(){},  
        cancel: typeof(cancel) == "function" ? cancel() : function(){},
    };
    //  if (window.location.href.indexOf("?token=")>-1) {
    //   alert(link);
    // }
    wx.onMenuShareTimeline(shareData);
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareQQ(shareData);
    wx.onMenuShareWeibo(shareData);
    wx.onMenuShareQZone(shareData);
     // if (window.location.href.indexOf("?token=")>-1) {
     //  alert("end all");
     // }
  }

}).controller('RouteCtrl', function ($q, $scope, $state, $location, AppAuth, $cookies) {
    $location.path("/app");
  })
  .controller('LayoutCtrl', function ($scope, ENV, md5) {

  })
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('login', {
      url: '/login',
      template: '<login></login>',
      controller: 'LoginCtrl'
    }).state('register', {
      url: '/register',
      template: '<register></register>',
      controller: 'LoginCtrl'
    }).state('router', {
      url: '/router',
      template: '<div class="lockscreen" style="height: 100%"></div>',
      controller: 'RouteCtrl'
    });

    $urlRouterProvider.otherwise('/router');

  })

  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push(function ($q, $location, AppAuth) {
      return {
        responseError: function (rejection) { 
          return $q.reject(rejection);
        }
      };
    });
  });
