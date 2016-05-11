var fs = require('fs');
var url = require('url');
var BASE_DIR = __dirname;
var configMime = require("../config").mime;
var configStaticUrlMapping = require("../config").staticUrlDirectory;
var querystring = require("querystring");
var controller = require("../controller/init");
var DynamicRouter = require("./dynamicRouter");
var dynamicRouter = new DynamicRouter();
var StaticRouter  = require("./staticRouter");
var staticRouter    = new StaticRouter();

var faviconFile = null;
/**
 * process 类
 * @constructor
 */
function Processor() {
    this.processRequest = function(req, res){
        var path = url.parse(req.url).pathname;
        console.log("request path: " + path);
        var result = this.isStaticFileRequest(req);
        if(result != false && result != undefined){
            staticRouter.processStaticRequest(req, res, result);
        }else{
            dynamicRouter.processDynamicRequest(req, res);
        }
    };

    this.isStaticFileRequest = function(req) {
        var pathName = url.parse(req.url).pathname;
        //判断是否是favicon
        if (pathName == "/favicon.ico")
            return true;
        var suffix = pathName.substr(pathName.lastIndexOf(".") + 1);
        if(configMime["suffix"][suffix] != undefined){
            return configMime["suffix"][suffix];
        }
    };

    this.init = function(){
        //加载favicon, 保存为静态资源
        path = BASE_DIR.substr(0,BASE_DIR.lastIndexOf("\\")) + "\\" + "favicon.ico";
        fs.exists(path, function (exists) {
            fs.readFile(path, "binary", function(err, file){
                faviconFile = file;
            })
        });
        console.log("init server succeed!");
    };
    this.init();
}

module.exports = Processor;