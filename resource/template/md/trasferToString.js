var fs = require("fs");
var a = fs.readFileSync("basic.md", "utf-8").replace(/\r\n/g, "\\n").replace(/"/g, "\"");
console.log({"index": a});
