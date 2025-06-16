const { express } = require("../config/config");
const { postProduct } = require("../controller/product");
const { verifyJWT } = require("../middlewares/verifyJWT");
const { verifySeller, verifyForbidden } = require("../middlewares/verifyUsers");
const { registerValidator } = require("../validator /auth.validator");
const productValidatorSchemas = require("../validator /product.validator.schemas");

const auctionRouters= express.Router();

auctionRouters.post("/upload-product",registerValidator(productValidatorSchemas.postProductSchema),verifyJWT, verifySeller, verifyForbidden, postProduct);

module.exports= auctionRouters;