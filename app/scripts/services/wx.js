'use strict';

/**
 * @description
 * # Banner
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('WX', function(ATHttpService, $q) {
	this.getWX = function(parmas) {
		return ATHttpService.post("/v1/jsconf", parmas).success(function(data,status,headers,config){
			return data;
		});
	};
});
