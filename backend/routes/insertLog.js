var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
var User = require('./mongouser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var nowDate = new Date();
const https = require('https');


router.post('/', function(req, res){
  console.log(
    'LogLevel : ' + req.body.LogLevel +
  ", LogCode : " + req.body.LogCode +
  ", LogStirng : " + req.body.LogString
  )
  const {LogLevel} = req.body;
  const {LogCode} = req.body;
  const {LogString} = req.body;
  res.send(`LogLevel : ${LogLevel} \nLogCode : ${LogCode} \nLogString : ${LogString}`)


  User.create({
    LogDate : new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0] +" "+ new Date(+new Date() + 3240 * 10000).toISOString().split("T")[1].substring(0, 12),
    LogLevel:req.body.LogLevel,
    LogCode:req.body.LogCode,
    LogString:req.body.LogString,
  });
  console.log(req.body);



  MongoClient.connect('mongodb+srv://dbUser:qwer1234@cluster0.tu0fx.mongodb.net/?retryWrites=true&w=majority',
  function(err, db) {
   if (err) throw err;
   var dbo = db.db("test");
   dbo.collection("users").find({}).toArray(function(err, result) {
     if (err) throw err;
     console.log(result);

     fs.writeFileSync("F:/sx_7/New_Pro_2/frontend/src/model/test.json", JSON.stringify(result));
     db.close();
   });
 });
})


/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
