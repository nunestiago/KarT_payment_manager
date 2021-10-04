const knex = require('../../config/knexConnect');

const clientCharges = async (req, res) => {
  const { id } = req.user;

  try {
    const getCharges = await knex('cobrancas')
      .where('usuario_id', id)
      .orderBy('id', 'asc');

    if (!getCharges.length) {
      return res.status(400).json('Nenhuma cobrança encontrada.');
    }
    console.log(getCharges);
    return res.status(200).json(getCharges);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clientCharges };
