const { jwt, access_token } = require("../config/config");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send({ message: "Unauthorize access!" });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token, access_token, (err, decoded)=>{
        if(err){
            return res.status(401).send({message: "Unauthorize access!"});
        }
        req.decoded= decoded;
        next();
    });
};
module.exports = { verifyJWT };
