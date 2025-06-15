const Joi = require("joi");

const authValidatorSchemas= {
    registerSchemas: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid("buyer", "seller").required()
    }),
    jwtSchemas: Joi.object({
        email: Joi.string().email().required(),
        role: Joi.string().valid("buyer", "seller").required(),
        isVerified: Joi.boolean().required()
    }),
    otpValidation: Joi.object({
        email: Joi.string().email().required(),
        otp: Joi.number().integer().min(1000).max(9999).required()
    }),
    forgetEmailValidation: Joi.object({
        email: Joi.string().email().required()
    }),
    resetPasswordValidation:Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
}

module.exports= authValidatorSchemas;