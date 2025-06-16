const { productModel } = require("../models/auction.model");

const postProduct= async(req, res)=>{
    try{
        // console.log(req.body);
        const result = await new productModel({...req.body, email: req.decoded.email});
        return res.status(201).send({message: "Product uploaded successfully"});
    }
    catch(error){
        return res.status(500).send({message: "Internal server error", error: error.message})
    }
}

//Scheduler for product

cron.schedule("0 * * * *", async () => {
    const now = new Date().toISOString();
    await productModel.updateMany(
        { startTime: { $lte: now }, endTime: { $gte: now } },
        { $set: { isOpened: true } }
    );
    await productModel.updateMany(
        { $or: [{ startTime: { $gt: now } }, { endTime: { $lt: now } }] },
        { $set: { isOpened: false } }
    );
});


module.exports={postProduct}