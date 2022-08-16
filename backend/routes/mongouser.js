const mongoose = require('mongoose');

//var today = new Date();

//const date = Date.toISOString().split("T")[0]
//const time = Date.toISOString().split("T")[1]

//const log_time = date + ' ' + time.substring(0,12);

const userSchema = new mongoose.Schema({
    LogDate:{
        type:String,
    },
    LogLevel:String,
    LogCode:String,
    LogString:String,
    //LogFlag:String
    },{
        collection : 'users'
    }
);


module.exports = mongoose.model('User', userSchema);