var fs = require('fs');
var url = require('url');
var BASE_DIR = __dirname;
var configMime = require("../config").mime;
var configStaticUrlMapping = require("../config").staticUrlDirectory;
var querystring = require("querystring");

var faviconFile = null;

function StaticRouter() {

    this.processRequest = function(req, res){
        var path = url.parse(req.url).pathname;
        console.log(path);
        //处理静态资源
        var result = this.isStaticFileRequest(req, res);
        if(result != false && result != undefined){
            return this.processStaticRequest(req, res, result);
        }
        //处理 非静态 url 资源请求
        var param = this.wrapRequest(req, res);
        this.processDynamicRequest(req, res, param);
    };

    //静态资源发送
    this.processStaticRequest = function(req, res,mime) {
        //处理 favicon
        if (mime == true && faviconFile != null){
            res.writeHead(200, {"Content-Type": "image/ico"});
            res.write(faviconFile, "binary");
            res.end();
            return;
        }

        //开始处理 文件
        var pathName = url.parse(req.url).pathname;
        var suffix = pathName.substr(pathName.lastIndexOf(".") + 1);
        contentPath = BASE_DIR.substring(0, BASE_DIR.lastIndexOf("\\"));
        var realPath = contentPath + "\\" + configStaticUrlMapping[suffix] + "\\" + pathName.substring(1,pathName.length);

        fs.exists(realPath, function(exists){
            if(!exists){
                res.writeHead(404, {"Content-Type": "text/plain"});
                res.write("file not found");
                res.end();
                return;
            } else {
                fs.readFile(realPath, function(err, file){
                    if(err){
                        res.writeHead(500, {"Content-Type": "text/plain"});
                        res.end(err);
                        return;
                    }else{
                        res.writeHead(200, {"Content-Type" : mime});
                        res.write(file, "binary");
                        res.end();
                        return;
                    }
                });
            }
        });
    };

    this.isStaticFileRequest = function(req, res) {
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
    };
    this.init();
}

module.exports = StaticRouter;