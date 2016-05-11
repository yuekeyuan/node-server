get = function(req, res, param){
    // res.readFile("./resource/html/index.html");
    res.renderFile("index.yky");
    res.end();
};

post = function(req, res, param){
    res.writeHeader(200, {"content-Type": "text/plain"});
    res.end("it's now my new world!");
};

put = function(req, res, param){
    res.end("it's now my new get world!");
};

ppp = function (req, res, param) {
    res.renderFile("a.yky");
    res.end("");
};

module.exports = {
    get:get,
    post:post,
    put: put,
    ppp: ppp
};