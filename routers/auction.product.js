const { express } = require("../config/config");
const { postProduct } = require("../controller/product");
const { registerValidator } = require("../validator /auth.validator");
const productValidatorSchemas = require("../validator /product.validator.schemas");

const auctionRouters= express.Router();

auctionRouters.post("/upload-product",registerValidator(productValidatorSchemas.postProductSchema), postProduct)

module.exports= auctionRouters;