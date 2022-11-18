const mongoose = require("mongoose")

module.exports.product = mongoose.createConnection("mongodb://localhost:27017/product",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports.order = mongoose.createConnection("mongodb://localhost:27017/orders",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
