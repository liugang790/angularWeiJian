'use strict';

/**
 * @description
 * # Banner
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Item', function(ATHttpService, $q) {

	this.getItemById = function(item_id) {
		return ATHttpService.get("/v1/item?pid="+item_id).success(function(data,status,headers,config){
			return data;
		});
	};

});
