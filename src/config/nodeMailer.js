const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '292dc3ca241f42',
    pass: '574a710e5de890',
  },
});

module.exports = transport;
