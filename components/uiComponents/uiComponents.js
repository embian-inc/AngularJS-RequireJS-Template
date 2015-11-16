'use strict'

define([
    'app',
    'components/main/mainService',
    'components/windowTimeBar/windowTimeBar',
    'components/windowTimeBtnGroup/windowTimeBtnGroup',
    'components/autoRefreshBtnGroup/autoRefreshBtnGroup',
    'components/tabExample/tabExample',
    'components/collapseExample/collapseExample',
  ], function(app, jqueryUi) {
       app.directive('uiComponents', ['$route', '$state', 'cookieService',
	                            'timeDataService', 'windowTimeDisplayService',
	                    function($route, $state, cookieService,
	                    			 timeDataService, windowTimeDisplayService){
			var controller = function($scope){
				timeDataService.timeData = windowTimeDisplayService.windowTimeDisplay($scope, timeDataService.selected_time(), timeDataService.timeMoveOpt());
			};

			return {
				restrict: 'EA',
				replace: true,
				transclude: true,
				templateUrl: 'components/uiComponents/uiComponents.html',
				link: function ($scope, $element, $attrs) {
				},
				controller: controller
			};
		}]);
	}
);
