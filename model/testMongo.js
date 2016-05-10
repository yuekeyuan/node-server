var async = require("async");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectId = require("mongodb").ObjectID;
var url = 'mongodb://localhost:27017/test';
function MongoAsync(req, res){
    functionList = [];
    MongoClient = MongoClient.connect(url, function (err, database) {
        assert.equal(err, null);
        var step1 = function () {
            console.log(11);
        };
        var step2 = function () {
            console.log("333");
        };
        var step3 = function () {
            console.log("dddd");
            for(var i=0;i<100000;i++);
        };
        functionList.push(step1, step2, step3);
        async.parallel(functionList);
        console.log("ddddasdfa");
        database.close();
    });
}
new MongoAsync();