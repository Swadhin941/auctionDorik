const { express } = require("../config/config");
const { register, createJWT, login, verifyOTP, forgetEmailCheck, resetPassword } = require("../controller/auth");
const { registerValidator } = require("../validator /auth.validator");
const authValidatorSchemas = require("../validator /auth.validator.schemas");

const authUser = express.Router();

authUser.post("/register",registerValidator(authValidatorSchemas.registerSchemas), register);
authUser.post("/create-jwt", registerValidator(authValidatorSchemas.jwtSchemas), createJWT);
authUser.post("/login", registerValidator(authValidatorSchemas.registerSchemas), login);
authUser.post("/verify-otp", registerValidator(authValidatorSchemas.otpValidation), verifyOTP);
authUser.post("/forget-email-check", registerValidator(authValidatorSchemas.forgetEmailValidation), forgetEmailCheck);
authUser.post('/reset-password', registerValidator(authValidatorSchemas.resetPasswordValidation), resetPassword);

module.exports = authUser;


