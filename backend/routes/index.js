var express = require('express');
var path = require('path');
var router = express.Router();

var User = require('./mongouser');

router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public', 'index.html'))
});

// router.get('/:LogLevel', function(req, res){
//   User.find({LogLevel: req.body.LogLevel},  function(err, users){
//     if(err) return res.status(500).json({error: err});
//     if(users.length == 0) return res.status(404).json({error: 'not found'});
//     res.json(users);
// })
// })

module.exports = router;