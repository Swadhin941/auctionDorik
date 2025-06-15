const { default: mongoose } = require("mongoose");

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
        enum: {
            values: ["buyer", "seller"],
            message: "{VALUE} is not a valid role",
        },
    },
    createdAt: {
        type: Number,
        default: Date.now(),
    },
});

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    otp: {
        type: Number,
        required: [true, "OTP is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

const Auth = mongoose.model("users", authSchema);
const OTPSchema = mongoose.model("otp", otpSchema);
module.exports = { Auth, OTPSchema };
