var path = require("path");

/**
 * url 映射， 包含 静态的url 地址映射 (append方法加载)
 * 和动态的 url 处理函数映射。
 * 当然 URl还有另外一种写法，比较直观的那种，就是一对一的。
 */
/*
url = {
    "/": "controller.index.get",
    "/hello": {
        "/world":"controller.index.put",
        "::GET" : "controller.index.put",
        "::POST": "controller.index.post",
        "/this": {
            "::GET": "controller.index.ppp"
        }
    }
 };
 */
url = {
    //basic
    "/": "controller.index.index",
    "/basic": "controller.index.basic",
    "/theory": "controller.index.theory",
    "/join": "controller.index.join",
    //grammar
    "/structure": "controller.grammar.structure",
    "/logic": "controller.grammar.logic",
    "/data": "controller.grammar.data",
    "/other": "controller.grammar.other",
};

exports.url = url;

/**
 * 静态资源的映射表
 * suffix 用于判断是否是静态资源，
 * res:通过url 判断是否为静态资源，不建议使用。
 * exclude： 通过 url 排除一部分 静态资源， 也没想好怎么使用。
 */
mime = {
    suffix: {
        txt: "text/plain",
        css: "text/css",
        js: "text/javascript",
        jpg: "image/jpg",
        gif: "image/gif",
        png: "image/png"
        //and so on
    },
    reg: {},
    exclude: {}
};
exports.mime = mime;

//静态资源位置
var cssDirectory = path.join("resource", "css");
var jsDirectory = path.join("resource", "js");
var imageDirectory = path.join("resource", "img");
staticUrlDirectory = {
    "css": cssDirectory,
    "js": jsDirectory,
    "jpg": imageDirectory,
    "gif": imageDirectory,
    "png": imageDirectory
};
exports.staticUrlDirectory = staticUrlDirectory;