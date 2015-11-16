'use strict'

define([
    'angular',
    'rzslider',
    'angular-route',
    'angular-ui-route',
    'angular-sanitize',
    'angular-animate',
    'webui-popover',
    'bootstrap'
], function(angular) {
	console.log("app.js");
    var app = angular.module('EmbianApp', ['ngRoute', 'ui.router', 'ngSanitize','ngAnimate','ui.bootstrap','rzModule'], function() {});
    app.controller('MainController', function($scope) {
       console.log('# E2E Montoring App start. 2');
       
//       $scope.warnStatus = false;
//       $scope.$on('alertResult', function (args, result){
//    	   $scope.warnStatus = result;
//        });
//       $scope.$on('warnSettingResult', function (args, result){
//    	   $scope.warnSettingTimes = result;
//    	   $scope.alerts[0].msg = "[경고] ";
//    	   $scope.alerts[0].msg = $scope.alerts[0].msg + $scope.warnSettingTimes + "분 동안 ";  
//        });
//       $scope.$on('warnSettingResult2', function (args, result){
//    	   $scope.warnSettingCount = result;
//    	   $scope.alerts[0].msg = $scope.alerts[0].msg + $scope.warnSettingCount + "회 이상의 Fail이 발생하였습니다.";
//        });
//       
//       $scope.alerts = [{ type: 'danger', msg: '' }];
//       
//       $scope.closeAlert = function() {
//    	   $scope.warnStatus = false;
//    	   $(".audioPlay").prop("loop",0);
//    	};
    });
    
    return app;
});
