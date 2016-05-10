get = function(req, res, param){
    res.readFile("./resource/html/index.html");
    res.end("it's now my world!");
};

post = function(req, res, param){
    res.writeHeader(200, {"content-Type": "text/plain"});
    res.end("it's now my new world!");
};

put = function(req, res, param){
    res.writeHeader(200, {"content-Type": "text/plain"});
    res.end("it's now my new get world!");
};

module.exports = {
    get:get,
    post:post,
    put:put
};