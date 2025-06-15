const express = require("express");
const {
    bcrypt,
    saltRounds,
    jwt,
    access_token,
    backend,
    smtpUser,
} = require("../config/config");
const { Auth, OTPSchema } = require("../models/auth.model");

const sendVerificationEmail = async (email, username) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const mailOptions = {
            from: smtpUser,
            to: email,
            subject: "Email Verification",
            html: `<p>Hi ${username},</p>
                   <p>Your verification code is <strong>${otp}</strong>.</p>
                   <p>Please use this code to verify your email address.</p>
                   <p>Thank you!</p>`,
        };
        const info = await transporter.sendMail(mailOptions);
        if (info.messageId) {
            console.log("Verification email sent successfully to " + email);
            return otp;
        } else {
            throw new Error("Failed to send verification email");
        }
    } catch (error) {
        throw new Error("Error sending verification email: " + error.message);
    }
};

const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const name = email.split("@")[0];
        const findEmail = await Auth.findOne({ email });
        if (findEmail) {
            return res.status(400).json({
                message: "Email already exists",
            });
        }
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: "Error hashing password",
                    error: err.message,
                });
            }
            const newUser = new Auth({
                name,
                email,
                role: role,
                isVerified: false,
            });
            const result = await newUser.save();
            const otp = await sendVerificationEmail(email, name);
            if (!otp) {
                return res.status(500).json({
                    message: "Error sending verification email",
                });
            }
            const otpSave = await new OTPSchema({
                email: email,
                otp: otp,
            }).save();
            if (!otpSave) {
                return res.status(500).json({
                    message: "Error saving OTP",
                });
            }
            return res
                .status(201)
                .send({ result, message: "User registered successfully" });
        });
        if (result.name) {
            return res.status(201).json({
                message: "User registered successfully",
                user: {
                    name: result.name,
                    email: result.email,
                    role: result.role,
                    isVerified: result.isVerified,
                },
            });
        } else {
            return res.status(400).json({
                message: "User registration failed",
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const findEmail = await Auth.findOne({
            $and: [{ email }, { isVerified: true }],
        });
        if (findEmail === null) {
            return res.status(400).json({
                message: "Email not found or not verified",
            });
        }
        bcrypt.compare(password, findEmail.password, async (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Error comparing password",
                    error: err.message,
                });
            }
            if (!result) {
                return res.status(400).json({
                    message: "Invalid password",
                });
            }
            const tokenInfo = await fetch(backend + "/api/auth/create-jwt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: findEmail.email,
                    role: findEmail.role,
                    isVerified: findEmail.isVerified,
                }),
            });
            const tokenResponse = await tokenInfo.json();
            if (tokenResponse.message !== "JWT created successfully") {
                return res.status(400).json({
                    message: "Error creating JWT",
                    error: tokenResponse.error,
                });
            } else {
                return res.status(200).json({
                    message: "Login successful",
                    user: {
                        name: findEmail.name,
                        email: findEmail.email,
                        role: findEmail.role,
                        isVerified: findEmail.isVerified,
                    },
                    token: tokenResponse.token,
                });
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const createJWT = async (req, res) => {
    try {
        const findEmail = await Auth.findOne({
            $and: [{ email: req.body.email }, { isVerified: true }],
        });
        if (findEmail === null) {
            return res.status(400).json({
                message: "Email not found or not verified",
            });
        }
        const token = jwt.sign({ ...req.body }, access_token, {
            expiresIn: "1h",
        });
        return res.status(200).json({
            message: "JWT created successfully",
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const findOtp = await OTPSchema.deleteOne({
            $and: [
                { email },
                { otp: otp },
                { createdAt: { $lte: Date.now() - 300000 } },
            ],
        });
        if (findOtp.deletedCount >= 1) {
            const updatedDoc = {
                $set: {
                    isVerified: true,
                },
            };
            const option = { upsert: false };
            const updateAuth = await Auth.updateOne(
                { email: email },
                updatedDoc,
                option
            );
            if (updateAuth.modifiedCount >= 1) {
                return res.status(200).send({ isVerified: true });
            } else {
                return res.status(400).send({ message: "Cannot update user" });
            }
        } else {
            return res.status(400).send({ message: "Invalid user or OTP" });
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

const forgetEmailCheck = async (req, res) => {
    try {
        const { email } = req.body;
        const findUser = await Auth.find({
            $and: [{ email }, { isVerified: true }],
        });
        if (findUser) {
            return res.status(200).send({ user: true, email });
        } else {
            return res.status(400).send({ message: "Invalid user" });
        }
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Internal Server error", error: error.message });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        bcrypt.hash(password, saltRounds, async (err, hash) => {
            if (err) {
                return res.status(400).send({ message: "Password hash error" });
            }
            const updatedDoc = {
                $set: {
                    password: hash
                },
            };
            const option= {upsert: false};
            const updatePass= await Auth.updateOne({email: email}, updatedDoc, option);
            if(updatePass.modifiedCount>=1){
                return res.status(201).send({message: "Password changed!"});
            }
            else{
                return res.status(400).send({message: "Failed to change password"});
            }
        });
    } catch (error) {
        return res
            .status(500)
            .send({ message: "Internal server error!", error: error.message });
    }
};

module.exports = {
    register,
    createJWT,
    login,
    verifyOTP,
    forgetEmailCheck,
    resetPassword,
};
