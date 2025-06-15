const registerValidator = (schema)=>{
    return (req, res, next)=>{
        const {error}= schema.validate(req.body, {abortEarly: false});
        if(error){
            return res.status(400).json({
                message: "Validation Error",
                error: error.details.map((err)=> err.message)
            });
        }
        else{
            next();
        }
    }
}

module.exports= {registerValidator};