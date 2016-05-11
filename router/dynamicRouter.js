var urlConfig = require("../config").url;
url = require("url");
var controller = require("../controller/init");
var util = require("./utils");
var Render = require("node-templator");
/**
 * 加载 并 翻译 url
 */
function loadUrl(){
    list = [];
    this.getList = function(){
        return list;

    };

    var isJson = function(obj){
        //var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
        //return isjson;
        return typeof obj == "object"? true : false;
    };

    this.parseUrl = function(urlconfig, map){
        var newMap = null;
        for(var key in urlconfig){
            if (!isJson(urlconfig[key])){
                newMap = JSON.parse(JSON.stringify(map));
                if(["::GET","::POST","::PUT","::DELETE"].indexOf(key.toLocaleUpperCase()) == -1){
                    newMap["url"] += key;
                }
                var tem = joinParam(key, urlconfig[key], newMap);
                list.push(tem);
            } else {
                newMap = JSON.parse(JSON.stringify(map));
                newMap["url"] += key;
                //parse(key, urlconfig[key], newMap);
                this.parseUrl(urlconfig[key], newMap);
            }
        }
        spiltUrls();
    };

    var joinParam = function(key, value, map){
        //拷贝 map 对象
        var newMap = JSON.parse(JSON.stringify(map));
        if(!isJson(value)){
            switch (key.toUpperCase()){
                //先不处理
                case "LOAD-ORDER":
                case "*":
                case "$":
                    break;
                //method
                case "::GET":
                case "::POST":
                case "::PUT":
                case "::DELETE":
                case "::MOVE":
                    newMap["method"] = key.substr(2);
                    newMap["func"] = value;
                    break;
                default :
                    newMap["func"] = value;
                    break;
            }
        }
        return newMap;
    };

    //将单独的数据添加进map value 在这里 是一个map
    var parse = function(key, value, map){
        var newMap = null;
        if (!isJson(value)){
            var tem = joinParam(key, value, map);
            list.push(tem);
        }
        else {
            newMap = JSON.parse(JSON.stringify(map));
            for (var key1 in value) {
                switch (key1.toUpperCase()){
                    case "*":
                    case "$":
                    case "load-order":
                        return;
                    case "::GET":
                    case "::POST":
                    case "::PUT":
                    case "::DELETE":
                        break;
                    default :
                        newMap["url"] += ("/" + key1);
                }
                newMap = JSON.parse(JSON.stringify(newMap));
                parse(key1, value[key1], newMap);
            }
        }
    };


    var spiltUrls = function () {
        for(var i=0;i<list.length;i++){
            var str = list[i]["url"];
            if (str == null){
                continue;
            }
            list[i]["split"] = splitUrl(str);
        }
    };

    var splitUrl = function(str){
        ls = str.split("/");
        var a = [];
        for(var i in ls){
            if (ls[i]!="" && ls[i] != undefined){
                // TODO: 这儿有一个大bug， 对于 * 不能够转换成 正则式。
                a.push(RegExp("^" + ls[i] + "$"));
            }
        }
        return a;
    };

    var sortUrl = function () {
        // TODO: task to be designed and finished
    };

    var compare = function(record1, record2){
        // TODO: a heavy task!
    }
}


function MatchUrl(){
    var urlList = [];
    this.setUrlList = function(list){
        urlList = list;
    },
    /**
     * 现在开始实现方法上的对比
     * @param str
     * @returns {*}
     */
    this.match = function(str, method){
        var mostMatched = null;
        ls = splitUrl(str);

        for(var i= 0, flag=1;i< urlList.length;i++,flag=1){
            var tem = urlList[i]["split"];
            if(ls.length != tem.length){
                continue;
            }
            for(var j=0;j<ls.length;j++){
                //开始逐参对比
                if(ls[j].match(tem[j]) == null){
                    flag = 0;
                    break;
                }
            }
            //匹配上了
            if(flag == 1){
                if(urlList[i]["method"] == method){
                    return urlList[i]["func"];
                }
                mostMatched = urlList[i]["func"];
            }
        }
        //都没匹配上
        return mostMatched;
    };

    var splitUrl = function(str){
        ls = str.split("/");
        var a = [];
        for(var i in ls){
            if (ls[i]!="" && ls[i] != undefined){
                a.push(ls[i]);
            }
        }
        return a;
    };
}

/**
 * 动态资源的路由操作
 * @constructor
 */
function DynamicRouter(){
    this.urlConfig = null;
    var matchUrl = new MatchUrl();
    var renderEngine = new Render({templateDir: "\\resource\\template\\", preCompile: true});
    this.processDynamicRequest = function(req, res){
        param = wrapRequest(req, res);
        var handler = mapUrl2Handler(param);
        if(handler == null){
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("404 fault");
            return;
        }
        console.log(handler);
        execute(req, res, param, handler);
    };

    var wrapRequest = function(req, res){
        info = {};
        info["url"] = url.parse(req.url).pathname;
        info["headers"] = req.headers;
        info["method"] = req.method;
        data = url.parse(req.url, true).query;
        info["data"] = data;

        // add feature to request

        // add feature to response.
        res.writeHeader(200, {"content-Type": "text/html"});
        res.renderFile = function (file, global, isfile) {
            res.write(renderEngine.renderTemplate(file, global, isfile));
        };
        res.readFile = function (path) {
            res.write(fs.readFileSync(path));
        };

        /*
         对于其他数据，我们不做强求，需要的时候再获取。
         if(info["method"].toUpperCase() != "GET"){
         var postData = "";
         req.addListener("data", function(postDataChunk){
         postData += postDataChunk;
         });
         req.addListener("end",function(){
         info["param"] = param = querystring.parse(postData);
         return info;
         });
         } else {
         return info;
         }
         */
        return info;
    };

    /**
     * 通过url 匹配 获取执行的handler
     * @param param
     */
    var mapUrl2Handler = function(param){
        str = matchUrl.match(param["url"], param["method"]);
        if(str == null){
            return "controller.index.get";
        }
        return str;
    };

    var execute = function(req, res, param, handler){
        eval(handler + "(req, res, param)");
    };

    /**
     * 初始化controller
     */
    this.init = function(){
        this.urlConfig = urlConfig;
        var parser = new loadUrl();
        parser.parseUrl(this.urlConfig, {"url":""});
        this.urlList = parser.getList();
        matchUrl.setUrlList(this.urlList);
    };
    this.init();
}

module.exports = DynamicRouter;
