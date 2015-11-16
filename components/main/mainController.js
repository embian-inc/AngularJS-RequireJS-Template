'use strict'

define([
    'app',
    'config',
    'function',
    'jqueryUi',
    'components/navMenu/navMenu',
    'components/mainContents/mainContents',
    'components/slideUpdownWindow/slideUpdownWindow',
  ], function(app, jqueryUi) {
	console.log("main controller");
	    var app;
	    app.controller("MainController",['$scope', '$state', '$route',
		                     function ($scope, $state, $route) {

			/* ui.router 이용시 Page Reload 방식 */
	//		$state.reload();

			/* ngRoute 이용시 Page Reload 방식 */
	//		$route.reload();

		 }]);
	}
);
