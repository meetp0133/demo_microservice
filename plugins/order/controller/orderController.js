const orderModel = require("../model/order")
const transformer = require("../transformer/orderTrasnformer")
const helper = require("../helper/helper")
const {orderValidation, orderViewValidation} = require("../validation/orderValidation")
const {SUCCESSFUL, SERVERERROR, META_STATUS_1, META_STATUS_0, FAILURE, ACTIVE, DELETED} = require("../config/key")
const {vendorSchema} = require("../model/vendor")
const {vendor} = require("../conn")
const vendorModel = vendor.model("vendor", vendorSchema)
// const productModel = product.model("product",productSchema)

exports.createOrder = async (req, res) => {
    try {
        const reqParam = req.body
        const validationMessage = await orderValidation(reqParam)
        if (validationMessage) return helper.error(res, validationMessage, FAILURE)
        const order = new orderModel(reqParam)
        await order.save()
        const response = transformer.addOrderTransformer(order)
        return helper.success(res, META_STATUS_0, "Order Created ..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong", SERVERERROR)
    }
}

exports.listOrder = async (req, res) => {
    try {
        const orderlist = await orderModel.find({vendorId: req.user._id, status: ACTIVE})
        const response = transformer.listOrderTransformer(orderlist)
        return helper.success(res, META_STATUS_1, "Order Listed ..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong", SERVERERROR)
    }

}

exports.deleteOrder = async (req, res) => {
    try {
        let reqParam = req.body
        let selectAll = reqParam.selectAll
        if (selectAll === true) {
            await orderModel.updateMany({status: {$ne: 3}}, {$set: {status: DELETED}});

        } else {
            await orderModel.updateMany({_id: {$in: reqParam.orderId}}, {$set: {status: DELETED}});
        }
        return helper.success(res, META_STATUS_1, "orderDeletedSuccessFully", SUCCESSFUL)
    } catch (e) {
        return helper.error(res, "Something Wrong", SERVERERROR)

    }
}

exports.viewOrder = async (req, res) => {
    try {
        const reqParam = req.body
        const validationMessage = await orderViewValidation(reqParam)
        if (validationMessage) {
            return helper.error(res, validationMessage, FAILURE)
        }
        const orderView = await orderModel.findOne({_id: req.body.orderId, status: ACTIVE})
        if (!orderView) {
            return helper.success(res, META_STATUS_0, "Order not found..!!", SUCCESSFUL)
        }
        const response = transformer.addOrderTransformer(orderView)
        return helper.success(res, META_STATUS_1, "Order view..!!", SUCCESSFUL, response)
    } catch (e) {
        console.log(e)
        return helper.error(res, "Something Wrong", SERVERERROR)
    }

}