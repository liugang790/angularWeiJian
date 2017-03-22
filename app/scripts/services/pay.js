'use strict';

/**
 * @description
 * # Banner
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Pay', function(ATHttpService, $q) {
	this.getWXQRcode = function(order_id) {
		return ATHttpService.get("/v1/wxqr?trade_no="+order_id+"&result=url").success(function(data,status,headers,config){
			return data;
		});
	};
});
