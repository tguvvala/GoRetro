'use strict';

const nodemailer = require('nodemailer');
const config = require('../config.js');

let user = config.SENDGRID_USER;
let password = config.SENDGRID_PASSWORD;

let transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: user,
    pass: password
  }
});

let sendMail = function(name, email, message) {
  let mailOptions = {
    from: user,
    to: email,
    subject: 'Contact from a buyer',
    text: 'Hello',
    html: '<p>From: ' + name + ' </p><p>Email: ' + email + ' </p><p>Message: ' + message + ' </p>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports.sendMail = sendMail;

