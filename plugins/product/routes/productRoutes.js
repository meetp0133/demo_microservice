const express = require("express")
const productRoute = new express.Router
const controller = require("../controller/productController")
const auth = require("../middleware/auth")

productRoute.post("/add-product", controller.createProduct)
productRoute.post("/list-product", controller.listProduct)
productRoute.post("/delete-product", controller.deleteProduct)
productRoute.post("/view-product", controller.viewProduct)


module.exports = productRoute