const { default: mongoose } = require("mongoose");
const { dbURI } = require("./config");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `${dbURI}`;

const  run= async()=> {
    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = {run};

