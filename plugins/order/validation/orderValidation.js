const Joi = require('joi')
const helper = require("../helper/helper")

module.exports = {
    async orderValidation(req) {
        const schema = Joi.object({
            vendorId:Joi.string().required(),
            productId:Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async orderViewValidation(req) {
        const schema = Joi.object({
            orderId:Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },

}

