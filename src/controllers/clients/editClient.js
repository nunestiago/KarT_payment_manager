const bcrypt = require('bcrypt');
const knex = require('../../config/knexConnect');
const testeCPF = require('../../utils/cpfValidator');

const editClient = async (req, res) => {
  const newInfo = req.body;
  const { email, cpf } = newInfo;
  const { id } = req.user;

  try {
    const isClient = await knex('clientes').where({ usuario_id: id, email });

    if (isClient.length) {
      return res.status(400).json('E-mail já cadastrado.');
    }

    const isCpf = await knex('clientes').where({ usuario_id: id, cpf });

    if (isCpf.length) {
      return res.status(400).json('CPF já cadastrado.');
    }

    if (newInfo.senha) {
      newInfo.senha = await bcrypt.hash(newInfo.senha, 10);
    }

    if (newInfo.cpf && !testeCPF(newInfo.cpf)) {
      return res.status(400).json('CPF inválido');
    }

    const editClient = await knex('clientes')
      .update(newInfo)
      .where('id', newInfo.id);
    if (editClient !== 1) {
      return res.status(400).json('Não foi possível atualizar dados');
    }

    res.status(200).json('Cliente atualizado com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { editClient };
