// config/emailConfig.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // e.g., your Gmail address
    pass: process.env.EMAIL_PASS, // Gmail app password (not your Gmail login password)
  },
});

module.exports = transporter;