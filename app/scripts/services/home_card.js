angular.module('WeiJianApp')
.service('HomeCard', function(ATHttpService, $q){

	this.getHomeCards = function() {
		return ATHttpService.get("/v1/home_cards/").success(function(data,status,headers,config){
			return data;
		});
	};
});
