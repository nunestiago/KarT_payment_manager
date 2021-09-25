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

const userLogin = async (req, res) => {
  const user = req.body;

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    senha: yup.string().required(),
  });

  try {
    await schema.validate(req.body);

    const isUser = await knex('usuarios').where('email', user.email);

    if (!isUser.length) {
      return res.status(400).json('Senha ou e-mail inválido.');
    }

    const foundUser = isUser[0];

    const verifyPass = await bcrypt.compare(user.senha, foundUser.senha);
    if (!verifyPass) {
      return res.status(400).json('Senha ou e-mail inválido.');
    }
    const jwtSecret = process.env.TOKEN_SECRET;
    const userSend = {
      id: foundUser.id,
      nome: foundUser.nome,
      email: foundUser.email,
    };
    const token = jwt.sign(userSend, jwtSecret, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.status(200).json({ usuario: userSend, token });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const editUser = async (req, res) => {
  // TODO confirmar se o edit é user ou client
};

module.exports = { userRegister, userLogin, editUser };
