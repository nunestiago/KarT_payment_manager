import nodemailer from '../config/nodeMailer';

interface IUser {
  email: string;
  nome: string;
}

const emailRegistrationSend = (user: IUser) => {
  const dataSendEmail = {
    from: 'KarT Dev <nao-responder@kartdevs.com>',
    to: user.email,
    subject: 'Bem vindo ao KarT Payments',
    text: `Olá ${user.nome}. Você realizou um cadastro no KarT Payments!`,
  };

  nodemailer.sendMail(dataSendEmail);
};

export default emailRegistrationSend;
