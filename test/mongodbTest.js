var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectId = require("mongodb").ObjectID;
var url = 'mongodb://localhost:27017/test';

var insertDocument = function(db, callback){
    db.collection("classes").insertOne({
        "address":"ddd",
    },function(err, result){
        assert.equal(null, null);
        console.log("doc inserted");
        callback();
    });
};

var findClasses = function(db, callback){
    var cursor = db.collection("classes").find();
    cursor.each(function (err, doc) {
        assert.equal(err, null);
        if(doc != null){
            console.dir(doc);
        }else{
            callback();
        }
    })
};

MongoClient.connect(url, function (err, db) {
   assert.equal(null,err);
    insertDocument(db, function(){
        db.close();
    });
});