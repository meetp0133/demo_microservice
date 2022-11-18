const mongoose = require('mongoose')

module.exports.vendor = mongoose.createConnection("mongodb://localhost:27017/vendors",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
module.exports.order = mongoose.createConnection("mongodb://localhost:27017/orders",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})