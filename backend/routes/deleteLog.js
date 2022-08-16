var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended:false}));

var User = require('./mongouser');

var fs = require('fs');

var MongoClient = require('mongodb').MongoClient;



router.delete('/', function(req, res){
    console.log(
             'LogLevel : ' + req.body.LogLevel +
           ", LogCode : " + req.body.LogCode +
           ", LogStirng : " + req.body.LogString +
           ", LogFlag : " + req.body.LogFlag);

    if(req.body.LogLevel != ''){

        User.find({
            LogLevel : req.body.LogLevel
        }).deleteMany().exec();

    }else if(req.body.LogCode != ''){

        User.find({
            LogCode : req.body.LogCode
        }).deleteMany().exec();

    }else if(req.body.LogString != ''){

        User.find({
            LogString : req.body.LogString
        }).deleteMany().exec();
    }else if(req.body.LogFlag != ''){

        User.find({
            LogFlag : req.body.LogFlag
        }).deleteMany().exec();
    }

    MongoClient.connect('mongodb+srv://dbUser:qwer1234@cluster0.tu0fx.mongodb.net/?retryWrites=true&w=majority',
    function(err, db) {
     if (err) throw err;
     var dbo = db.db("test");
     dbo.collection("users").find({}).toArray(function(err, result) {
       if (err) throw err;
       console.log(result);
       fs.writeFileSync("F:/sx_log/New_Pro_1/frontend/src/model/test.json", JSON.stringify(result));
       db.close();
     });
   });


})

module.exports = router;