'use strict';

/**
 * @description
 * # Post
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('User', function(ATHttpService, $q, $cookies, $location) {
	this.createUser = function(params) {
		return ATHttpService.put("/v1/user", params).success(function(data,status,headers,config){
			return data;
		});
	};
  
   this.getUser = function() {
		return ATHttpService.get("/v1/user").success(function(data,status,headers,config){
			return data;
		});
	};

	this.updateUser = function(params) {
		return ATHttpService.post("/v1/user", params).success(function(data,status,headers,config){
			return data;
		});
	};
});
