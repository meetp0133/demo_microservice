const express  =require("express")
const orderRoute = new express.Router
const controller = require("../controller/orderController")
const auth = require("../middleware/auth")

orderRoute.post("/create-order",auth.vendorAuth,controller.createOrder)
orderRoute.post("/list-order",auth.vendorAuth,controller.listOrder)
orderRoute.post("/delete-order",auth.vendorAuth,controller.deleteOrder)
orderRoute.post("/view-order",auth.vendorAuth,controller.viewOrder)

module.exports = orderRoute