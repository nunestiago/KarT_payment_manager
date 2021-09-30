const knex = require('../../config/knexConnect');

const clientGetAll = async (req, res) => {
  const { id } = req.user;

  try {
    const getClients = await knex('clientes')
      .where('usuario_id', id)
      .return('*');

    if (!getClients.rowCount) {
      return res
        .status(400)
        .json(
          'Erro ao tentar recuperar clientes, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json(getClients);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clientGetAll };
