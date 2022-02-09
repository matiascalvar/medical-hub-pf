const nodemailer = require('nodemailer');
import config from "../lib/config";
config;

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: `${config.mailerUser}`, // generated ethereal user
      pass: `${config.mailerPass}` // generated ethereal password
    },
  });