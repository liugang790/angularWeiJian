'use strict';

/**
 * @description
 * # at-http
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('ATHttpService', function($http, md5, base64, $cookies, $ionicPopup, ENV, sweet) {
    this.authorization = function(jsonString){
        return $cookies.get("token");        
        // jsonString = jsonString == "\"{}\"" ? "{}" : jsonString;
        // var token = $cookies.get("token");
        // var key = $cookies.get("key");
        // var ttl = 120;
        // var deadline = Date.parse(new Date())/1000 + ttl;
        // var base64String = base64.urlencode(deadline + key + jsonString + key + deadline);
        // var md5String = md5.createHash(base64String);
        // return token + ":" + md5String + ":" + deadline;
    }

    this.http = function(theMethod, thePath, params){

        var httpAuthorization = this.authorization(JSON.stringify(params));
        return $http({       
                     method: theMethod, 
                     url: ENV.apiUrl + thePath,
                     data: params,
                     headers:{
                                'Accept' : "application/json",
                                'Authorization': httpAuthorization
                            }
                    }).success(function(data,status,headers,config){

            }).error(function(data,status,headers,config){
       
                console.log("ERROR_STATUS:"+status+data);
                if (ENV.isDebug) {

                if (status == 409) {
                }else{
                    $ionicPopup.alert({
                        title: '对不起，似乎遇到了一些问题...',
                        template: '错误码: '+status+" 错误原因: "+data
                    });
                };
                }
                if (status == 401) {
                    $cookies.remove("token");
                    $cookies.remove("openid");
                    if (ENV.isDebug) {
                        $cookies.put("token",ENV.fake_token);
                        location.href = window.location.href;
                    }else{
                        var url = window.location.href.split("/#/app/")[1].replace(/\//g,"OO");
                        location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7ddd028c2621995d&redirect_uri=http://www.techmars.net/api/v1/wxauth&response_type=code&scope=snsapi_base&state="
                          + url;
                    };
                }

            });
    }

    this.get = function(path){
        return this.http('GET', path, "{}");
    }


    this.post = function(path, params){
        return this.http('POST', path, params);
    }


    this.put = function(path, params){
        return this.http('PUT', path, params);
    }


    this.delete = function(path, params){
    	if (params == null){
    		params = "{}";
    	}
        return this.http('DELETE', path, params);
    }
});
