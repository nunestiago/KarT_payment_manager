const knex = require('../config/knexConnect');
const yup = require('yup');
const { pt } = require('yup-locales');
const { setLocale } = require('yup');
const testeCPF = require('../utils/cpfValidator');
require('yup-phone');
setLocale(pt);

const clientRegister = async (req, res) => {
  const client = req.body;
  const { id } = req.user;
  client.usuario_id = id;

  const schema = yup.object().shape({
    nome: yup.string().required(),
    email: yup.string().email().required(),
    cpf: yup.string().required(),
    telefone: yup.string().phone('BR'),
    cep: yup.string().nullable(true),
    logradouro: yup.string().nullable(true),
    bairro: yup.string().nullable(true),
    cidade: yup.string().nullable(true),
    complemento: yup.string().nullable(true),
    ponto_referencia: yup.string().nullable(true),
  });

  try {
    await schema.validate(client);

    const isClient = await knex('clientes').where('email', client.email);
    // TODO ver relação de mesmo cliente para usuários diferentes

    if (isClient.length) {
      return res.status(400).json('E-mail já cadastrado.');
    }

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
