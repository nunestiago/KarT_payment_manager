const bcrypt = require('bcrypt');
const knex = require('../../config/knexConnect');
// const testeCPF = require('../../utils/cpfValidator');

const editClient = async (req, res) => {
  const newInfo = req.body;
  const { email, cpf, id: idClient } = newInfo;
  const { id } = req.user;
  try {
    const oldClient = await knex('clientes').where({ id: idClient }).first();

    if (oldClient.email !== email) {
      const isClient = await knex('clientes').where({ usuario_id: id, email });
      if (isClient.length) {
        return res.status(400).json('E-mail já cadastrado.');
      }
    }

    if (oldClient.cpf !== cpf) {
      const isCpf = await knex('clientes').where({ usuario_id: id, cpf });
      if (isCpf.length) {
        return res.status(400).json('CPF já cadastrado.');
      }
    }

    if (newInfo.senha) {
      newInfo.senha = await bcrypt.hash(newInfo.senha, 10);
    }

    // if (newInfo.cpf && !testeCPF(newInfo.cpf)) {
    //   return res.status(400).json('CPF inválido');
    // }
    const toUpdate = {
      id: newInfo.id,
      nome: newInfo.nome,
      email: newInfo.email,
      cpf: newInfo.id,
      telefone: newInfo.id,
      cep: newInfo.cep,
      logradouro: newInfo.logradouro,
      bairro: newInfo.id,
      cidade: newInfo.cidade,
      complemento: newInfo.complemento,
    };

    const editClient = await knex('clientes')
      .update(toUpdate)
      .where('id', idClient);

    if (editClient !== 1) {
      return res.status(400).json('Não foi possível atualizar dados');
    }

    res.status(200).json('Cliente atualizado com sucesso');
  } catch (error) {
    console.log(error.message);
    return res.status(400).json(error.message);
  }
};

module.exports = { editClient };
