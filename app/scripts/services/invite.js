'use strict';

/**
 * @description
 * # Banner
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Invit', function(ATHttpService, $q) {

	this.getInvitCode = function(item_id) {
		return ATHttpService.put("/v1/invit").success(function(data,status,headers,config){
			return data;
		});
	};

	this.getProfileByInvitCode = function(inv_code) {
		return ATHttpService.get("/v1/invit?inv_code="+inv_code).success(function(data,status,headers,config){
			return data;
		});
	};

	this.receiveInvitCode = function(item_id) {
		return ATHttpService.post("/v1/invit").success(function(data,status,headers,config){
			return data;
		});
	};
  	this.yaoqingma = function(data){
		return ATHttpService.post("/v1/invit",data).success(function(data,status,headers,config){
			return data;
		});
  }

});
