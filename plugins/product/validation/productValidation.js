const Joi = require('joi')
const helper = require("../helper/helper")

module.exports = {
    async productValidation(req) {
        const schema = Joi.object({
            name: Joi.string().required(),
            price: Joi.number().required(),
            discount: Joi.number().min(0).max(100).required(),
            stock: Joi.number().min(5).required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    },
    async productViewValidation(req) {
        const schema = Joi.object({
            productId: Joi.string().required(),
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    }

}

