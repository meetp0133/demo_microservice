const express = require("express")
const vendorRoute = new express.Router
const controller = require("../controller/vendorController")
const auth = require("../middleware/auth")

vendorRoute.post("/create-vendor",controller.createVendor)
vendorRoute.post("/list-vendor",auth.vendorAuth,controller.listVendor)
vendorRoute.post("/delete-vendor",auth.vendorAuth,controller.deleteVendor)
vendorRoute.post("/view-vendor",auth.vendorAuth,controller.viewVendor)
vendorRoute.post("/sign-in",controller.logIn)

module.exports = vendorRoute