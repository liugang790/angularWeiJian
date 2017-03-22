angular.module('WeiJianApp')
.service('Product', function(ATHttpService, $q) {
	this.product = null;

	this.select_types=[{type_name:"产品类型",type_value:"p_types", select_switch:false, title:"产品类型", total: 0},
    {type_name:"出发地",type_value:"sources", select_switch:false, title:"出发地", total: 0},
    {type_name:"目的地",type_value:"destinations", select_switch:false, title:"目的地", total: 0},
    {type_name:"出发时间",type_value:"departure_time", select_switch:false, title:"出发时间", total: 0}];

	this.getItems = function(link) {
		return ATHttpService.get("/v1/items?type="+link).success(function(data,status,headers,config){
			return data;
		});
	};
  
});
