var structure = function (req, res, param) {
    // res.readFile("./resource/html/index.html");
    res.renderFile("page/structure.yky");
    res.end();
};
var logic = function (req, res, param) {
    // res.readFile("./resource/html/index.html");
    res.renderFile("page/logic.yky");
    res.end();
};
var data = function (req, res, param) {
    // res.readFile("./resource/html/index.html");
    res.renderFile("page/data.yky");
    res.end();
};
var other = function (req, res, param) {
    // res.readFile("./resource/html/index.html");
    res.renderFile("page/other.yky");
    res.end();
};

module.exports = {
    structure: structure,
    logic: logic,
    data: data,
    other: other
};