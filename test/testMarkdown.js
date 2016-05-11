var markdown = require("markdown").markdown;

content = "#hello world";
html = markdown.toHTML(content);
console.log(html);
