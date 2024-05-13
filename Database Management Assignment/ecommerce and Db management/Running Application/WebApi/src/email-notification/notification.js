const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  // Configure your email service provider settings
  service: "gmail",
  auth: {
    user: "ziyauddin270499@gmail.com",
    pass: "zeodtlucizemmhnq",
  },
});

module.exports = transporter;
