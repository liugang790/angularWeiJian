'use strict';

/**
 * @description
 * # Banner
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Banner', function(ATHttpService, $q) {

	this.getBanners = function() {
		return ATHttpService.get("/v1/banners/").success(function(data,status,headers,config){
			return data;
		});
	};

});
