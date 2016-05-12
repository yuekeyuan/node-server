var index = function (req, res, param) {
    // res.readFile("./resource/html/index.html");
    res.renderFile("index.yky");
    res.end();
};

var basic = function (req, res, param) {
    res.renderFile("page/basic.yky");
    res.end();
};

var theory = function (req, res, param) {
    res.renderFile("page/theory.yky");
    res.end();
};

var join = function (req, res, param) {
    res.renderFile("page/join.yky");
    res.end();
};

module.exports = {
    index: index,
    basic: basic,
    theory: theory,
    join: join,
};