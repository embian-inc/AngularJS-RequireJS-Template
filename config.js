'use strict'

define([
    'app',
    ], function(app) {
       app.service('config', function(){
    	   console.log(" config");
			this.urlConfig = function(){
	//			var url = 'http://192.168.1.226:8080/';
				var url = 'sampleData/sampleData.json';
				return url;
			};
		})
		.service('defaultService', function(){
			this.configServiceName = function(){
				var name = '애뮬레이터';
				return name;
			};
			
			this.configServiceCode = function(){
				var code = 'EMULATOR';
				return code;
			};
		});
	}
);
