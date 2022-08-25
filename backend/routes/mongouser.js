const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    LogDate:{
        type:String,
    },
    LogLevel:String,
    LogCode:String,
    LogString:String,
    // MongoDB TTL(Time To Live)
    //createdAt: { type: Date, expires: 60, index: true, default: Date.now }
    },{
        collection : 'users'
    }
);



module.exports = mongoose.model('User', userSchema);