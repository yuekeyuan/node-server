var Analyser = require("./lexicalAnalyser");
var analyser = new Analyser()

/*
分配任务的一个文件
 */
function Compiler(fileName, condition){
    console.log("start to compile file");
    slice = null;
    this.compile = function(){
        console.log("start to compile file");
        slice = analyser.analyse(fileName);
        console.log(slice);
    }
}

module.exports = Compiler
