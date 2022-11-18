const mongoose = require("mongoose")

exports.orderSchema = mongoose.Schema({
    status: {
        type: Number,
        default: 1,
        enum: [1, 2, 3]
    },
    vendorId: {
        type: mongoose.Schema.ObjectId
    },
    productId: {
        type: mongoose.Schema.ObjectId,
    },
    orderStatus: {
        type: String,
        default: "Confirmed",
        enum: ["Confirmed", "Dispatched", "outForDelivery", "Delivered", "Cancellation"],
    },
    paymentStatus: {
        type: Boolean,
        default: false
    }
}, {collection: "order", timestamps: true})
