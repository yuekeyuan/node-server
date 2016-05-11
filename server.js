var http = require('http');
var Processor = require('./router/processor');
var port = 18080;

processor = new Processor();
http.createServer(function(req, res) {
    req.setEncoding('utf-8');
    processor.processRequest(req, res);
}).listen(port);

/**
 * 处理流程：
 * request -> 拦截器  ->request 处理器 ->路由器 -> mvc ->
 */
