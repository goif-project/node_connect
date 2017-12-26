var http = require("http");
var qs = require("querystring");
var fs = require('fs');
var url = require('url');

var server = http.createServer();
server.on("request",function(req,res){
	var reqBody = "";
	req.on('data',function(data){
		reqBody += data;
	}).on('end',function(){
		var path = url.parse(req.url);
		switch(path.pathname){
			case '/':
				fs.readFile('./index.html','UTF-8',function(err,data){
					res.setHeader('Content-Type','text/html');
					res.write(data);
					res.end();
				});
				break;
			default:
				res.setHeader('Content-Type','text/text');
				var form = qs.parse(reqBody);
				if(form)res.write(form.inputA);
				res.end();
				break;
		}
	});
}).listen(1234);
