var async = require("async");
var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var ObjectId = require("mongodb").ObjectID;
var url = 'mongodb://localhost:27017/test';
function MongoAsync(){
    var functionList = [];
    functionList.push(function(){console.log(1);});
    this.db = null;
    MongoClient = MongoClient.connect(url, function (err, database) {
        assert.equal(err, null);
        this.db = database;
        this.execute = function(){
            if(this.db != null){
                console.log(this.parent);
                async.parallel(functionList);
                this.db.close();
            }
        };
    });
    this.getDB = function(){
        return this.db;
    };
    this.addFunction = function(fun){
        functionList.push(fun);
    };
}
var mongAsync = new MongoAsync();
//mongAsync.addFunction(function(){console.log(1);});
//mongAsync.execute();
