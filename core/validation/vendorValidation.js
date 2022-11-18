const Joi = require('joi')
const helper = require("../helper/helper")

module.exports = {
    async vendorValidation(req) {
        const schema = Joi.object({
            name:Joi.string().required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim(true).required(),
            phone:Joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/),
            address:Joi.string().required()
        }).unknown(true);
        const {error} = schema.validate(req);
        if (error) {
            return helper.validationMessageKey("validation", error);
        }
        return null;
    }

}

