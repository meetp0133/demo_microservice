const jwt = require("jsonwebtoken");
const {vendor} = require("../conn")
const {vendorSchema} = require("../model/vendor")
const vendorModel = vendor.model("vendor",vendorSchema)
const helper = require("../helper/helper")
const {
    SECRETE_KEY,
    SERVERERROR,
    EXISTING
} = require("../config/key")

exports.vendorAuth = async (req, res, next) => {
    try {
            const token = req.header('Authorization').replace('Bearer ', '');
            let decode = await jwt.verify(token, SECRETE_KEY);
            if (!decode) {
                return helper.error(res, "Token Expired..!!!", EXISTING)
            }
            const user = await vendorModel.findOne({_id: decode._id});
            if (!user) {
                return helper.error(res, "User Not Found..!!!", EXISTING)
            }
            req.user = decode;
            await next();
    } catch (error) {
        return helper.error(res, "InvalidToken", SERVERERROR)
    }
}