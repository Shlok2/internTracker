const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trime:true
    },
    stage:{
        type:String,
        required:true,
        trime:true
    },
    platform:{
        type:String,
        required:true,
        trime:true
    },
    notes:{
        type:String,
        trime:true
    },
    status:{
        type:String,
        required:true,
        trime:true
    },
    // date: {
    //     online: {
    //       type: Boolean
    //     },
    //     verified: {
    //       type: Boolean
    //     },
    //     banned: {
    //       type: Boolean
    //     }
    // }
    // date:{
    //     type:Object,
    //     required:true
    // }
    date : {
        type: String,
        required:true
    },
    datecreated:Date,
    dateUpdated:Date
});

// Model
const users = new mongoose.model("users",usersSchema)

module.exports = users;