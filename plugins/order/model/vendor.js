const mongoose = require("mongoose")

module.exports.vendorSchema = mongoose.Schema({
    status:{
        type:Number,
        default:1,
        enum:[1,2,3]
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    }

},{collection:"vendor",timestamps:true})