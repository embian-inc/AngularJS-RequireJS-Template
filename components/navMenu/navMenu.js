'use strict'

define([
        'app',
        'jquery',
        'app.route',
	    ], function(app, jquery) {
			app.directive('navMenu', function(){
			var controller = ['$scope', function($scope){
				console.log("navMenu Controller!");
				$scope.navClick = function(menu) {
					$scope.active = menu;
					
				};
			}];
			
			return {
				restrict: 'EA',
				replace: true,
				transclude: true,
				templateUrl: 'components/navMenu/navMenu.html',
				link: function ($scope, $element, $attrs) {
					$scope.active = 'Dashboard';
	//				$scope.active = 'UI-Element';
				},
				controller: controller
			};
		});
	}
);