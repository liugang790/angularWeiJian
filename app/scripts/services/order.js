'use strict';

/**
 * @description
 * # Order
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
.service('Order', function(ATHttpService, $q) {
	this.createOrder = function(params) {
		return ATHttpService.put("/v1/order", params).success(function(data,status,headers,config){
			return data;
		});
	};

	this.getOrders = function() {
		return ATHttpService.get("/v1/orders").success(function(data,status,headers,config){
			return data;
		});
	};
});
