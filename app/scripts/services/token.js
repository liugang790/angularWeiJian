'use strict';

/**
 * @description
 * # Token
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Token', function(ATHttpService, $q, $http, ENV) {
	this.getToken = function(params) {
		return ATHttpService.post("/v1/tmauth", params).success(function(data,status,headers,config){
			return data;
		});
	};
});