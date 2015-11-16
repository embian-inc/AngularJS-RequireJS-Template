'use strict'

define([
    'app',
    'jqueryUi',
    'components/dashboard/dashboard',
    'components/uiComponents/uiComponents',
  ], function(app, jqueryUi) {
		app.directive('mainContents', function(){
			return {
				restrict: 'EA',
				replace: true,
				transclude: true,
				templateUrl: 'components/mainContents/mainContents.html',
				link: function ($scope, $element, $attrs) {
				},
			};
		})
	}
);
