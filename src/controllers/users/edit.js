const bcrypt = require('bcrypt');
const knex = require('../../config/knexConnect');
const testeCPF = require('../../utils/cpfValidator');
const userEditSchema = require('../../validations/userEditSchema');

const editUser = async (req, res) => {
  const user = req.user;
  const newInfo = req.body;

  try {
    await userEditSchema.validate(newInfo);

    if (user.email !== newInfo.email) {
      const isEmail = await knex('usuarios').where('email', newInfo);
      if (isEmail.length) {
        return res.status(400).json('E-mail já cadastrado');
      }
    }

    if (newInfo.senha) {
      newInfo.senha = await bcrypt.hash(newInfo.senha, 10);
    }

    if (newInfo.cpf && !testeCPF(newInfo.cpf)) {
      return res.status(400).json('CPF inválido');
    }

    const editUser = await knex('usuarios')
      .update(newInfo)
      .where('id', user.id);

    if (editUser !== 1) {
      return res.status(400).json('Não foi possível atualizar dados');
    }

    res.status(200).json('Usuário atualizado com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { editUser };
