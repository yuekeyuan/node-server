fs = require("fs");
module.exports = {
    "getMime" : function(fileName, mimeCollection){
        a = mimeCollection["suffix"][fileName.substring(fileName.lastIndexOf(".") + 1)];
        console.log("filename:", fileName);
        console.log(fileName.substring(fileName.lastIndexOf(".") + 1));
        console.log(a);
        return a;
    }
};