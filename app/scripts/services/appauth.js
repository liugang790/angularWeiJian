'use strict';

/**
 * @ngdoc service
 * @name WeiJianApp.AppAuth
 * @description
 * # AppAuth
 * Factory in the WeiJianApp.
 */
angular.module('WeiJianApp')
  .factory('AppAuth', function ($cookies) {
    return {
      currentUser: null,
      // Note: we can't make the User a dependency of AppAuth
      // because that would create a circular dependency
      //   AppAuth <- $http <- $resource <- LoopBackResource <- User <- AppAuth
      ensureHasCurrentUser: function(User) {
        if (this.currentUser) {
          console.log('Using cached current user.');
        } else {
          console.log('Fetching current user from the server.');
          if($cookies.token != null  && $cookies.key != null){
            this.currentUser = {
               name : $cookies.name,
               token : $cookies.token,
               key : $cookies.key,
               avatar: "http://7sbqrd.com2.z0.glb.clouddn.com/avatar.png-avatarhd",
            };
          }else{
            this.currentUser = false;
          }
        }
      }
    };
  });
