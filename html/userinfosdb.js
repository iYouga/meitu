const mongoose = require("mongoose");
const dbconn = require("./dbconn");
module.exports = {
    "add":function(username,userpass,callback){
        // const dbconnObj = dbconn();
        mongoose.Promise = global.Promise;
        var dbconnObj = mongoose.createConnection("10.35.167.88","meitu");
        var userinfosSchema = new mongoose.Schema({
            "username":String,
            "userpass":String
        });
        var userinfosModel = dbconnObj.model("userinfos",userinfosSchema);
        this.find({"username":username},function(has){
            if(!has){
                var userinfosEntity = new userinfosModel({"username":username,"userpass":userpass});
                userinfosEntity.save(function(err,data){
                    if(err){
                        console.log(err);
                    }else{
                        console.log(data);
                        callback(true);
                    }
                });
            }else{
                callback(false);
            }
        });
    },
    "find":function(obj,callback){
        // const dbconnObj = dbconn();
        mongoose.Promise = global.Promise;
        var dbconnObj = mongoose.createConnection("10.35.167.88","meitu");
        var userinfosSchema = new mongoose.Schema({
            "username":String,
            "userpass":String
        });
        var userinfosModel = dbconnObj.model("userinfos",userinfosSchema);
        userinfosModel.find(obj,function(err,data){
            if(err){
                console.log(err);
                callback(false);
            }else{
                if(data.length==1){
                    callback(true);
                }else{
                    callback(false);
                }
            }
        });
    }
}