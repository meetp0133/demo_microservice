const mongoose = require("mongoose")

module.exports.vendor = mongoose.createConnection("mongodb://localhost:27017/vendors",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports.product = mongoose.createConnection("mongodb://localhost:27017/product",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})