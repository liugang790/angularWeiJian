angular.module('WeiJianAppFilter', [])
.filter('ProductFilter', function() {  
   return function(input, p_type, source, destination, departure_time) {
   console.log(input,p_type, source, destination, departure_time) 
   	  if (!input) {return}; 
      
      function filterType(element){
      	if (!p_type || p_type == "全部" || p_type == "产品类型") {
      		return true
      	};
      	return element['p_type'] == p_type;
      }

      function filterSource(element){
      	if (!source || source == "全部" || source == "出发地") {
      		return true
      	};
      	return element['src'] == source;
      }

      function filterDestination(element){
      	if (!destination || destination == "全部" || destination == "目的地") {
      		return true
      	};
      	return element['dst'] == destination;
      }

      function filterDepartreTime(element){
      	if (!departure_time || departure_time == "全部" || departure_time == "出发时间") {
      		return true
      	};
      	return element['off_time'] == departure_time;
      }
      console.log(input.filter(filterType).filter(filterSource).filter(filterDestination).filter(filterDepartreTime));
      return input.filter(filterType).filter(filterSource).filter(filterDestination).filter(filterDepartreTime);  
   };  
 });
