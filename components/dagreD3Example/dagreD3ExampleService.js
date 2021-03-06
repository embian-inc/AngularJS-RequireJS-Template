var default_dagreD3e_style = "fill: rgba(255,255,255, 0); stroke: #d5d5d5; stroke-width: 1.5px;";
var default_dagreD3arrowhead_style = "fill: #c5c5c5; stroke: #c5c5c5; stroke-width:4px;";

var outbound_edge_style = "fill: rgba(255,255,255, 0); stroke: #800080; stroke-width: 1.5px;";
var outbound_arrowhead_style = "fill: #800080; stroke: #800080; stroke-width:4px;";

var inbound_edge_style = "fill: rgba(255,255,255, 0); stroke: #32CD32; stroke-width: 1.5px;";
var inbound_arrowhead_style = "fill: #32CD32; stroke: #32CD32; stroke-width:4px;";


'use strict'

define([
    'app',
    'd3',
    'dagreD3',
    'config',
    ], function(app, d3, dagreD3) {
		app.service('dagreD3AjaxService', function($http, config, dagreD3Service){
			this.callAjax = function ($scope) {
				$http({
					method: 'GET',
	//				url: url,
					url: './sampleData/dagreD3SampleData.json',
					params: paramObj
				}).success(function(data,status,headers,config) {
					if(data.code == 200) {
						$scope.diagramData = data.result.data;
						dagreD3Service.dagreD3_graph($scope.diagramData, "#dagre-d3", 'group', null);
					} else {
						console.log('Transaction Map Ajax : ' + data.error);
						console.log("Transaction Map : No Data");
					}
				}).error(function(data,status,headers,config) {
					console.log('Transaction Map Ajax : ' + data.error);
					console.log("Transaction Map : No Data");
				});
			};
		
			this.setParams = function (pObj) {
				paramObj = pObj;
			};
			var url = config.urlConfig();
			var paramObj = {};
		})
		.service('dagreD3Service', function() {
			/*
			 * Graph Object
			 */
			create_graph_obj = function() {
				var g = new dagreD3.graphlib.Graph({
					directed : true,
					multigraph : false,
					compound : true
				});
				g.setGraph({
					rankdir : "LR", // Graph 방향
					ranksep : 100,
					nodesep : 30,
					marginx : 40,
					marginy : 40,
				});
				return g;
			};
			
			/// Dagre D3 Graph ///
			dagreD3_graph = function(data, disply_place, mode, open_G) {
				$(disply_place + " > g > *").remove();
				var svg = d3.select(disply_place), inner = svg.select("g");
				var render = new dagreD3.render();
				var g = this.create_graph_obj();
	
				make_closed_group_node(data, g);
				dagreD3_style_node_edge(g);
				
				// Set up zoom support
				var zoom = d3.behavior.zoom().on("zoom", function() {
					inner.attr("transform", "translate(" + d3.event.translate + ")" + "scale(" + d3.event.scale + ")");
				});
				svg.call(zoom);
				render(inner, g);
				dagreD3_zoom_translate(zoom, g, svg);
				
				window.onresize = function(event) {
					dagreD3_zoom_translate(zoom, g, svg);
				};
				
				//node click event (highlight)
				svg.selectAll("g.node").on("click",function(id) {
					var highLight = node_click_action(g, id);
					render(inner, g);
				});
			};
	
			this.dagreD3_graph = function(data, disply_place, mode, open_G) {
				dagreD3_graph(data, disply_place, mode, open_G);
			};		
	//--------------------------------------------------------------------------------------------------------------//
			make_closed_group_node = function(data, g) {
				data.forEach(function(item, index) {
					var start = item.start;
					var end = item.end;
					var edge_s = item.edge_s;
					var edge_f = item.edge_f;
					var node_f = item.node_f;
					
					var eclass = (node_f == 1) ? ' dagreD3FailNode' : '';
					
					if (start.toLowerCase() != 'none'){
						if (!g.node(start)) {
							g.setNode(start, {
								labelType : 'html',
								label : label_html(start, node_f, g),
								class: 'dagreD3Node'
							});
						} else {
							g.node(start).label = label_html(start, node_f, g);
						}
					}
					if (end.toLowerCase() != 'none'){
						if (!g.node(end)) {
							g.setNode(end, {
								labelType : 'html',
								label : label_html(end, node_f, g),
								class: 'dagreD3Node'
							});
						} else {
							g.node(end).label = label_html(end, node_f, g);
						}
					}
					if (start.toLowerCase() != 'none' && end.toLowerCase() != 'none'){
						g.setEdge(start, end, {
							labelType : 'html',
							label: edge_label_cnt(start, end, edge_s, edge_f),
							arrowhead: "vee",
							lineInterpolate: 'monotone'
						});
					}
				})
			};
			
	//--------------------------------------------------------------------------------------------------------------//
			/*
			 * Set dagreD3 Edge Label
			 */
			edge_label_cnt = function(start, end, edge_s, edge_f) {
				var dagreD3EdgeLabelHtml = '<div class="dagreD3EdgeLabel">' + edge_s + ' / <span style="color: #ff0033;">' + edge_f + '</span></div>';
				return dagreD3EdgeLabelHtml;
			}
			
			/*
			 * Set dagreD3 Node Label
			 */
			label_html = function(label, sunit, g) {
				var newLabel = label;
	
				if (g.node(label)) {
					var sunit_label = g.node(label).label.match(/Fail : [+-]?\d+/);
					var new_sunit = sunit_label ? ((sunit != 0) ? (sunit_label[0].match(/\d+/)*1 + sunit) : (sunit_label[0].match(/\d+/)*1)) : ((sunit != 0) ? sunit : "");
					var l_html = (new_sunit != "") ? ('<p class="dagreD3NodeLabel">' + newLabel + '</p><tr><td><span class="nodeFailCnt">Fail : ' + new_sunit + '</td></tr>')
													   : ('<p class="dagreD3NodeLabel">' + newLabel + '</p>');
					return l_html;
				}
				
				var l_html = (sunit != 0) ? ('<p class="dagreD3NodeLabel">' + newLabel + '</p><tr><td><span class="nodeFailCnt">Fail : ' + sunit + '</td></tr>')
										     : ('<p class="dagreD3NodeLabel">' + newLabel + '</p>');
				return l_html;
			}
			
			dagreD3_style_node_edge = function(g) {
				// Set custom edge labelpos
				g.edges().forEach(function(v) {
					var edge = g.edge(v);
	//				edge.labelpos = 'c';
					edge.style = default_dagreD3e_style;
					edge.arrowhead = "vee";
					edge.arrowheadStyle = default_dagreD3arrowhead_style;
				});
				
				g.nodes().forEach(function(v) {
						var node = g.node(v);
						node.rx = node.ry = 5;
				});
			};
			
			/*
			 * Node Click Highlight Action 
			 */
			node_click_action = function(g, id) {
				var highLight;
				var nodeClass = g.node(id).class;
	
				if(nodeClass.indexOf('highLight') != -1) {
					g.node(id).class = nodeClass.toString().replace('highLight', ' ').trim();
					
					g.edges().forEach(function(e, v, w) {
						var edge = g.edge(e);
						edge.style = default_dagreD3e_style;
						edge.arrowhead = "vee";
						edge.arrowheadStyle = default_dagreD3arrowhead_style;
					});
					highLight = 'off';
				} 
				else {
					g.nodes().forEach(function(v) {
						var node = g.node(v);
						nodeClass = node.class;
						if (nodeClass) node.class = nodeClass.replace('highLight', ' ').trim();
					});
					g.edges().forEach(function(e, v, w) {
						var edge = g.edge(e);
						edge.style = default_dagreD3e_style;
						edge.arrowhead = "vee";
						edge.arrowheadStyle = default_dagreD3arrowhead_style;
						if (e.v == id) {
					 		edge.style = outbound_edge_style;
					 		edge.arrowhead = "vee";
					 		edge.arrowheadStyle = outbound_arrowhead_style;
						} else if(e.w == id) {
							edge.style = inbound_edge_style;
					 		edge.arrowhead = "vee";
					 		edge.arrowheadStyle = inbound_arrowhead_style;
						}
					});
					g.node(id).class += ' highLight';
					highLight = 'on'
				}
				console.debug('click node : ' + id);
				
				return highLight;
			};
	
			dagreD3_zoom_translate = function (zoom, g, svg) {
				var zoomScale = zoom.scale();
				var graphWidth = g.graph().width + 80;
				var graphHeight = g.graph().height + 40;
				var width = parseInt(svg.style("width").replace(/px/, ""));
				var height = parseInt(svg.style("height").replace(/px/, ""));
				
				zoomScale = Math.min(width / graphWidth, height / graphHeight);
				if (zoomScale > 1.4) zoomScale -= 0.1;
				var translate = [(width/2) - ((graphWidth*zoomScale)/2), (height/2) - ((graphHeight*zoomScale)/2)];
				zoom.translate(translate);
				zoom.scale(zoomScale);
				zoom.event(d3.select("svg"));
			};
		});
	}
);
