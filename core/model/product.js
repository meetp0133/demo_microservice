const mongoose = require("mongoose")

module.exports.productSchema = mongoose.Schema({
    status:{
        type:Number,
        default:1,
        enum:[1,2,3]
    },
    name:{
        type:String
    },
    price:{
        type:Number
    },
    discount:{
        type:Number
    },
    stock:{
        type:Number
    },

},{collection:"product",timestamps:true})


