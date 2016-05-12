var Render = require("node-templator");

var renderEngine = new Render({templateDir: "\\resource\\template\\", preCompile: false});
var a = renderEngine.renderTemplate("index.yky", {});
console.log(a);
