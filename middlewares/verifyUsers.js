const { Auth } = require("../models/auth.model");

const verifySeller = async (req, res, next) => {
    try {
        if (req.decoded.role === "seller") {
            const checkValidity = await Auth.findOne({
                $and: [
                    { email: req.decoded.email },
                    { role: req.decoded.role },
                    { isVerified: true },
                ],
            });
            if (checkValidity) {
                next();
            } else {
                return res.status(401).send({ message: "Unauthorize access!" });
            }
        } else {
            return res.status(401).send({ message: "Unauthorize access!" });
        }
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
};

const verifyBuyer = async (req, res, next) => {
    try {
        if (req.decoded.role === "buyer") {
            const checkValidity = await Auth.findOne({
                $and: [
                    { email: req.decoded.email },
                    { role: req.decoded.role },
                    { isVerified: true },
                ],
            });
            if (checkValidity) {
                next();
            } else {
                return res.status(401).send({ message: "Unauthorize access!" });
            }
        } else {
            return res.status(401).send({ message: "Unauthorize access!" });
        }
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Internal server error", error: error.message });
    }
};

const verifyForbidden = (req, res, next)=>{
    if(req.query.user!== req.decoded.email){
        return res.status(403).send({message: "Forbidden access"});
    }
    next();
}

module.exports = { verifySeller, verifyBuyer, verifyForbidden };
