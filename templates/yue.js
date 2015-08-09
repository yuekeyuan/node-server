var fs = require("fs");
var TaskManager = require("./compiler/taskManager")
var spliter = "\\";
var SUFFIX   = "yky";
var fileName = process.argv[2]; // index.html


function analysFile(fileName){
    name   = fileName.substring(fileName.lastIndexOf(spliter) + 1);
    prefix = name.substring(0, name.lastIndexOf("."));
    suffix = name.substring(name.lastIndexOf(".") + 1);
    if (suffix.toLowerCase() == SUFFIX){
        var taskManager = new TaskManager(fileName, null);
        taskManager.compile();
    }else{
        console.log("not the proper file");
    }
}

analysFile(fileName);