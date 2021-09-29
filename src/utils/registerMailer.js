const nodemailer = require('../config/nodeMailer');

const emailRegistrationSend = (user) => {
  const dataSendEmail = {
    from: 'KarT Dev <nao-responder@kartdevs.com>',
    to: user.email,
    subject: 'Bem vindo ao KarT Payments',
    text: `Olá ${user.nome}. Você realizou um cadastro no KarT Payments!`,
  };

  nodemailer.sendMail(dataSendEmail);
};

module.exports = emailRegistrationSend;
