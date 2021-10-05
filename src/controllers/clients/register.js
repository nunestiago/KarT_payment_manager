const knex = require('../../config/knexConnect');
const testeCPF = require('../../utils/cpfValidator');
const clientRegisterSchema = require('../../validations/clientRegisterSchema');

const clientRegister = async (req, res) => {
  const client = req.body;
  const { id } = req.user;

  client.usuario_id = id;

  try {
    await clientRegisterSchema.validate(client);

    const isClient = await knex('clientes').where('email', client.email);

    if (isClient.length) {
      return res.status(400).json('E-mail já cadastrado.');
    }

    client.cpf = client.cpf.replace(/[^0-9]/g, '');
    client.telefone = client.telefone.replace(/[^0-9]/g, '');
    client.cep = client.cep.replace(/[^0-9]/g, '');

    if (client.cpf && !testeCPF(client.cpf)) {
      return res.status(400).json('CPF inválido');
    }

    const newClient = await knex('clientes').insert(client);

    if (!newClient.rowCount) {
      return res
        .status(400)
        .json(
          'Erro ao tentar cadastrar cliente, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Cliente cadastrado com sucesso!');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clientRegister };
