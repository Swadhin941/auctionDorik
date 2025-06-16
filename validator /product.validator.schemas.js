const Joi = require("joi");

const productValidatorSchemas= {
    postProductSchema: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        startTime: Joi.date().iso().required(),
        endTime: Joi.date().iso().required(),
        price: Joi.number().required()
    })
}

module.exports=productValidatorSchemas