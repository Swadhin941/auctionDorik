const { default: mongoose } = require("mongoose");

const productAuctionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    startTime: {
        type: Date,
        required: [true, "Start time is(UTC format) required"],
    },
    endTime: {
        type: Date,
        required: [true, "End time is(UTC format) required"],
    },
    isOpened: {
        type: Boolean,
        default: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
});

const productModel = mongoose.model("products", productAuctionSchema);
module.exports = { productModel };
