const knex = require('../../config/knexConnect');

const clienteDelete = async (req, res) => {
  const { id } = req.params;
  const userId = req.user;

  try {
    const isClient = await knex('clientes').where({ id, usuario_id: userId });

    if (isClient.length) {
      return res.status(400).json('Cliente não encontrado.');
    }

    const removeClient = await knex('clientes').where({ id }).del();

    if (removeClient.length) {
      return res.status(400).json('Não foi possível remover cliente.');
    }

    return res.status(200).json('Cliente removido com sucesso');
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clienteDelete };
