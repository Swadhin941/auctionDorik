const { dbURI } = require("./config");
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `${dbURI}`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});
const  run= async()=> {
    try {
        await client.connect();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = {run};

