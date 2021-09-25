const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const knex = require('../config/knexConnect');
const yup = require('yup');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
setLocale(pt);

const userRegister = async (req, res) => {
  const user = req.body;

  const schema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    senha: yup.string().required(),
  });

  try {
    await schema.validate(user);

    const isUser = await knex('usuarios').where('email', user.email);

    if (isUser.length) {
      return res.status(400).json('E-mail já cadastrado.');
    }

    const { senha: oldPass, ...rest } = user;
    const senha = await bcrypt.hash(oldPass, 10);
    const userToBD = { ...rest, senha };
    const newUser = await knex('usuarios').insert(userToBD);

    if (!newUser.rowCount) {
      return res
        .status(400)
        .json(
          'Erro ao tentar cadastrar usuário, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Usuário cadastrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { userRegister };
