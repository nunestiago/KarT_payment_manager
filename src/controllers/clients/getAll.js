const knex = require('../../config/knexConnect');

const clientGetAll = async (req, res) => {
  const { id } = req.user;

  try {
    const getClients = await knex('clientes')
      .select('clientes.id', 'clientes.nome')
      .where('usuario_id', id)
      .orderBy('id', 'asc');

    if (!getClients.length) {
      return res.status(400).json('Nenhum cliente encontrado.');
    }
    return res.status(200).json(getClients);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clientGetAll };
