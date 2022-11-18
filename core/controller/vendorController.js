const vendorModel = require("../model/vendor")
const transformer = require("../transformer/vendorTransformer")
const helper = require("../helper/helper")
const {vendorValidation} = require("../validation/vendorValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const {order, product} = require("../conn")
const {orderSchema} = require("../model/order")
const {productSchema} = require("../model/product")
const productModel = product.model("product", productSchema)
const orderModel = order.model("order", orderSchema)
const {
    SERVERERROR,
    META_STATUS_0,
    META_STATUS_1,
    SUCCESSFUL,
    FAILURE,
    JWT_TOKEN_EXPIRE,
    SECRETE_KEY,
    ACTIVE,
    DELETED
} = require("../config/key")


exports.createVendor = async (req, res) => {
    try {

        const reqParam = req.body
        const validationMessage = await vendorValidation(reqParam)
        if (validationMessage) return helper.error(res, validationMessage, FAILURE)

        const existingVendor = await vendorModel.findOne({email: reqParam.email, status: ACTIVE})

        if (existingVendor) {
            return helper.success(res, META_STATUS_0, "Vendor Already exist ..!!", SUCCESSFUL)

        }
        const newVendor = new vendorModel(reqParam)
        const salt = await bcrypt.genSalt(10);
        newVendor.password = await bcrypt.hash(newVendor.password, salt);
        await newVendor.save()
        const response = transformer.addVendorTransformer(newVendor)
        return helper.success(res, META_STATUS_1, "Vendor Created ..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)
    }

}

exports.listVendor = async (req, res) => {
    try {
        const vendorList = await vendorModel.find({status: ACTIVE})
        const response = transformer.listVendorTransformer(vendorList)
        return helper.success(res, META_STATUS_1, "Vendor Listed ..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)
    }
}

exports.logIn = async (req, res) => {
    try {
        const existingVendor = await vendorModel.findOne({email: req.body.email});

        if (!existingVendor) {
            return helper.error(res, "InvalidEmailOrPassword", FAILURE)
        }
        const validPassword = await bcrypt.compare(req.body.password, existingVendor.password);
        if (!validPassword) {
            return helper.error(res, "InvalidEmailOrPassword", FAILURE)
        }
        const tokenData = {
            _id: existingVendor._id,
            name: existingVendor.name,
            email: existingVendor.email,
            phone: existingVendor.phone,
        }
        const token = jwt.sign(tokenData, SECRETE_KEY, {expiresIn: JWT_TOKEN_EXPIRE});
        const response = transformer.vendorsigninTransformer(existingVendor)
        return helper.success(res, META_STATUS_1, "SignInSuccessFully", SUCCESSFUL, response, {token: token})
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)

    }
}

exports.deleteVendor = async (req, res) => {
    try {
        let reqParam = req.body
        let selectAll = reqParam.selectAll
        if (selectAll === true) {
            await vendorModel.updateMany({status: {$ne: DELETED}}, {$set: {status: DELETED}});
        } else {
            await vendorModel.updateMany({_id: {$in: reqParam.vendorId}}, {$set: {status: DELETED}});
        }
        return helper.success(res, META_STATUS_1, "vendorDeletedSuccessFully", SUCCESSFUL)
    } catch (e) {
        return helper.error(res, "Something Wrong", SERVERERROR)

    }
}

exports.viewVendor = async (req, res) => {
    try {
        const VendorView = await vendorModel.findOne({_id: req.user._id, status: ACTIVE})
        const response = transformer.addVendorTransformer(VendorView)
        return helper.success(res, META_STATUS_1, "Profile View..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)
    }
}
