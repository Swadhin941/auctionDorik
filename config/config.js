require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4000;
const mongoose = require("mongoose");
const dbURI = process.env.DB_URI || "";
const bcrypt= require("bcrypt");
const saltRounds= 10;
const jwt = require("jsonwebtoken");
const access_token = process.env.ACCESS_TOKEN || "";
const backend = process.env.BACKEND || "";
const nodemailer= require("nodemailer");
const smtpUser= process.env.SMTP_USER || "";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USER || "",
        pass: process
    }
})
module.exports = { express, cors, port, mongoose,dbURI, bcrypt, saltRounds, jwt, access_token, backend, transporter, smtpUser };
