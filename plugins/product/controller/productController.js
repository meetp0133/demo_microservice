const productModel = require("../model/product")
const transformer = require("../transformer/productTransformer")
const helper = require("../helper/helper")
const {productValidation,productViewValidation} = require("../validation/productValidation")
const {SUCCESSFUL, SERVERERROR, META_STATUS_0, META_STATUS_1, FAILURE, ACTIVE, DELETED} = require("../config/key")
// const mongoose = require("mongoose")

exports.createProduct = async (req, res) => {
    try {
        const reqParam = req.body

        const validationMessage = await productValidation(reqParam)
        if (validationMessage) return helper.error(res, validationMessage, FAILURE)

        const existingProduct = await productModel.findOne({name: reqParam.name, status: 1})
        if (existingProduct) {
            return helper.success(res, META_STATUS_0, "Existing Product..!!", SUCCESSFUL)
        }

        const newProduct = new productModel(req.body)
        await newProduct.save()
        const response = transformer.addProductTransformer(newProduct)
        return helper.success(res, META_STATUS_1, "Product Created ..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)
    }
}
exports.listProduct = async (req, res) => {
    try {
        const listProduct = await productModel.find({status: ACTIVE})
        const response = transformer.listProductTransformer(listProduct)
        return helper.success(res, META_STATUS_1, "Product Listed ..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)
    }
}

exports.viewProduct = async (req, res) => {
    try {
        const reqParam = req.body
        const validationMessage = await productViewValidation(reqParam)
        if(validationMessage){
            return helper.error(res,validationMessage,FAILURE)
        }
        const viewProduct = await productModel.findOne({_id: req.body.productId, status: ACTIVE})
        if(!viewProduct){
            return helper.success(res,META_STATUS_0,"Product not found..!!",SUCCESSFUL)
        }
        const response = transformer.addProductTransformer(viewProduct)
        return helper.success(res, META_STATUS_1, "Product view..!!", SUCCESSFUL, response)
    } catch (e) {
        return helper.error(res, "Something Wrong..!!", SERVERERROR)
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let reqParam = req.body
        let selectAll = reqParam.selectAll
        if (selectAll === true) {
            await productModel.updateMany({status: {$ne: 3}}, {$set: {status: DELETED}});

        } else {
            await productModel.updateMany({_id: {$in: reqParam.productId}}, {$set: {status: DELETED}});
        }
        return helper.success(res, META_STATUS_1, "productDeletedSuccessFully", SUCCESSFUL)
    } catch (e) {
        return helper.error(res, "Something Wrong", SERVERERROR)

    }
}