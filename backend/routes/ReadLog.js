var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:false}));

var User = require('./mongouser');

router.get('/', function(req, res){
    console.log("please")
})

module.exports = router;