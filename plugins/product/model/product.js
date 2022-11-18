const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
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

const product = new mongoose.model("product",productSchema)
module.exports = product

