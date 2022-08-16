var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var insertLogRouter = require('./routes/insertLog');
var deleteLogRouter = require('./routes/deleteLog');
var ReadLogRouter = require('./routes/ReadLog');

var fs = require('fs');
var app = express();
const port = process.env.PORT || 3000;
const http =require("http").createServer(app);  //수정
require('dotenv').config();


app.listen(port, ()=>{
    console.log(`Server listening at http://localhost:${port}`);
})

const bodyParser = require("body-parser");
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json());




// 몽고디비 연결==================================================
const mongoose = require('mongoose');
//const { db } = require('./routes/mongouser');

mongoose.connect(
    process.env.MONGO_URI,
  )
  .then(() => console.log('몽구스 conected'))
  .catch((err) => {
    console.log(err);
  });

  var db = mongoose.connection;


// 전체 조회----------------------------------------------------------------------


app.get('/api/getlog', (request, response) => {
  db.collection("users").find().sort({"_id":1}).toArray((err,rslt) => {
      response.send(rslt);
    });
})





app.delete('/api/deletelog/:LogDate', (request, response) => {
    db.collection("users").deleteMany({
        LogDate:request.params.LogDate
    }, (err, cb) => {
        response.send("Delete LogDate : " + request.params.LogDate);
    });

    db.collection("users").find({}).toArray(function(err,result){
        if(err) throw err;
        fs.writeFileSync("F:/sx_7/New_Pro_2/frontend/src/model/test.json", JSON.stringify(result));

    })

});










//=====================================================================================

app.get('/getlog', (request, response) => {
    db.collection("users").find().sort({"_id":1}).toArray((err,rslt) => {
        response.send(rslt);
      });
  })




app.get('/getlog/LogLevel/:LogLevel', (request, response) => {
    db.collection("users")
    .find({"LogLevel":request.params.LogLevel})
    .sort({"_id":1}).toArray((err,rslt) => {
        response.send(rslt);
      });
})

app.get('/getlog/LogCode/:LogCode', (request, response) => {
    db.collection("users")
    .find({"LogCode":request.params.LogCode})
    .sort({"_id":1}).toArray((err,rslt) => {
        response.send(rslt);
      });
})

app.get('/getlog/LogString/:LogString', (request, response) => {
    db.collection("users")
    .find({"LogString":request.params.LogString})
    .sort({"_id":1}).toArray((err,rslt) => {
        response.send(rslt);
      });
})

//================================================================


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));    //수정
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('connect-history-api-fallback')());



app.use('/', indexRouter);
app.use('/insertLog', insertLogRouter);
app.use('/deleteLog', deleteLogRouter);
app.use('/ReadLog', ReadLogRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


//////////////////////// get

