require.config({
    paths: {
        'jquery': './bower_components/jquery/dist/jquery',
        'jqueryUi': './bower_components/jquery-ui/jquery-ui.min',
        'jqueryClass': './bower_components/BigScatterChart/js/jquery.Class',
        'jqueryDragToSelect': './bower_components/BigScatterChart/js/jquery.dragToSelect',
        'jqueryContextMenu': './bower_components/jQuery-contextMenu/src/jquery.contextMenu',
        'webui-popover': './bower_components/jqueryPopover/js/jquery.webui-popover',
        'angular':'./bower_components/angular/js/angular',
        'angular-route':'./bower_components/angular/js/angular-route',
        'angular-sanitize':'./bower_components/angular/js/angular-sanitize.min',
        'angular-animate':'./bower_components/angular/js/angular-animate.min',
        'angular-ui-route':'./bower_components/angular-ui-router/release/angular-ui-router',
        'bootstrap':'./bower_components/bootstrap/js/bootstrap',
        'd3':'./bower_components/d3/js/d3.v3.min',
        'dagreD3': './bower_components/dagre-d3/js/dagre-d3',
        'c3': './bower_components/c3/js/c3',
        'modernizr': './bower_components/BigScatterChart/js/modernizr',
        'underscore': './bower_components/BigScatterChart/js/underscore-min',
        'bigScatterChart': './bower_components/BigScatterChart/js/jquery.BigScatterChart',
        'rzslider': './bower_components/rzslider/js/rzslider'
    },

    shim: {
        'angular': {
            deps:['jquery'],
            exports: 'angular'
        },
        'angular-route': {
            deps:['angular']
        },
        'angular-ui-route': {
            deps:['angular']
        },
        'angular-sanitize': {
            deps:['angular']
        },
        'angular-animate': {
            deps:['angular']
        },
        'bootstrap': {
            deps:['angular']
        },
        'jqueryContextMenu': {
            deps:['jquery']
        },
        'webui-popover': {
            deps:['jquery']
        },
        'dagreD3': {
            deps:['d3']
        },
        'c3': {
            deps:['d3']
        },
        'jqueryClass': {
            deps:['jquery']
        },
        'jqueryDragToSelect': {
            deps:['jquery']
        },
        'jqueryUi': {
            deps:['jquery']
        },
        'bigScatterChart': {
            deps:['jquery', 'jqueryUi', 'modernizr', 'underscore', 'jqueryClass', 'jqueryDragToSelect']
        }
    },
});

require([
    'angular',
    'jquery',
    'app',
    'app.route',
], function(angular){
    $(function() {
    	console.log("module");
        angular.bootstrap(document, ['EmbianApp']);
    });
});
