const bcrypt = require('bcrypt');
// const emailRegistrationSend = require('../../utils/registerMailer');
const alreadyExists = require('../../validations/alreadyExists');
const knex = require('../../config/knexConnect');
const userRegisterSchema = require('../../validations/userRegisterSchema');

const userRegister = async (req, res) => {
  const user = req.body;

  try {
    await userRegisterSchema.validate(user);

    alreadyExists(user, res);

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
    // emailRegistrationSend(user);

    return res.status(200).json('Usuário cadastrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = { userRegister };
