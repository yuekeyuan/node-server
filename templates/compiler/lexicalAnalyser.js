/*
词法分析，断句用的。
 */
var fs = require("fs");
var spliter = "\\";
var BASE_DIR = __dirname;
var TEMPLATE_DIR = BASE_DIR.substr(0, BASE_DIR.lastIndexOf(spliter));
console.log(TEMPLATE_DIR);


function Analyser(){
    var str = "";
    this.analyse = function(fileName){
        var realPath = TEMPLATE_DIR + spliter + fileName;
        console.log(realPath);
        fs.exists(realPath, function (exists) {
            if(!exists){
                console.log("file not exist");
                process.exit();
            }else{
                str += fs.readFileSync(realPath, "utf-8");
                return str;
            }
        });
    };
}

module.exports = Analyser;