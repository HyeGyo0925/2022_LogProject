var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var User = require('./mongouser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;



router.delete('/', function(req, res){
    console.log(
            'LogDate :' + req.body.LogDate +
           ', LogLevel : ' + req.body.LogLevel +
           ", LogCode : " + req.body.LogCode +
           ", LogStirng : " + req.body.LogString );

    if(req.body.LogLevel != ''){
        User.find({
            LogLevel : req.body.LogLevel
        }).deleteMany().exec();
        console.log("delete complete")
    }

    if(req.body.LogDate != ''){
        User.find({
            LogDate : req.body.LogDate
        }).deleteOne().exec();;
        console.log("delete complete")
    }

    if(req.body.LogCode != ''){

        User.find({
            LogCode : req.body.LogCode
        }).deleteMany().exec();
        console.log("delete complete")
    }

    if(req.body.LogString != ''){
        User.find({
            LogString : req.body.LogString
        }).deleteOne().exec();
        console.log("delete complete")
    }


     const {LogDate} = req.body;
    const {LogLevel} = req.body;
    const {LogCode} = req.body;
    const {LogString} = req.body;
    res.send(`LogDate : ${LogDate} \nLogLevel : ${LogLevel} \nLogCode : ${LogCode} \nLogString : ${LogString}`)



    MongoClient.connect('mongodb+srv://dbUser:qwer1234@cluster0.tu0fx.mongodb.net/?retryWrites=true&w=majority',
    function(err, db) {
     if (err) throw err;
     var dbo = db.db("test");
     dbo.collection("users").find({}).toArray(function(err, result) {
       if (err) throw err;
       //console.log(result);
       fs.writeFileSync("F:/sx_7/New_Pro_2/frontend/src/model/test.json", JSON.stringify(result));
       db.close();
     });
   });


})

module.exports = router;