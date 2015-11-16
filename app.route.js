/*
Embian AngularJS Template version 1.0

Copyright ⓒ 2015 Embian.Inc All rights reserved.
*/

'use strict'

define([
    'app',
    'components/main/mainController',
    ], function(app) {
	console.log("app.route");
        app.config(function($stateProvider, $urlRouterProvider, $routeProvider) {
			/*
			   ui-view
			   ui.router
			*/
			$urlRouterProvider.otherwise("/main1");
			$stateProvider
			.state('MainPage', {
				url : '/main',
				templateUrl: 'components/main/main.html',
				controller: 'MainController'
			})
			.state('MainPage_2', {
				url : '/main2',
				templateUrl: 'components/main02/main2.html',
	//			controller: "Main2Controller"
			});
			  
			/*
				ng-view
				ngRoute
			*/
			$routeProvider.when('/main', {
				templateUrl: 'components/main/main.html',
				controller: 'MainController'
			})
			.when('/main2', {
				templateUrl: 'components/main02/main2.html',
	//			controller: "Main2Controller"
			})
			.otherwise({
				redirectTo: '/main' //그 외에의 모든 경로는 여기로 이동
			});
		});
	}
);
