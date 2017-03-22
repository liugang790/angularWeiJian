'use strict';

/**
 * @description
 * # Banner
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Bound', function(ATHttpService, $q) {

	this.getBounds = function() {
		return ATHttpService.get("/v1/cprecords").success(function(data,status,headers,config){
			return data;
		});
	};
});