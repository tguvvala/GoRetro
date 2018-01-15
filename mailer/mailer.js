'use strict';

const nodemailer = require('nodemailer');

let user = process.env.SENDGRID_USER;
let password = process.env.SENDGRID_PASSWORD;

let transporter = nodemailer.createTransport({
  service: 'SendGrid',
  auth: {
    user: user,
    pass: password
  }
});

let sendMail = function(name, email, message) {
  let mailOptions = {
    from: 'grantspilsbury@me.com',
    to: 'grantspilsbury@gmail.com',
    subject: 'Contact from a buyer',
    text: 'Hello',
    html: '<p>Hello</p>'
    // html: '<p>From: ' + name + ' </p><p>Email: ' + email + ' </p><p>Message: ' + message + ' </p>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('name', name)
    console.log('email', email)
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports.sendMail = sendMail;

