var fs = require("fs");
var a = fs.readFileSync("structure.md", "utf-8").replace(/\r\n/g, "\\n").replace(/"/g, "\"");
console.log({"index": a});
