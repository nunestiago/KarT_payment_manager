const knex = require('../../config/knexConnect');

const clientCharges = async (req, res) => {
  const { id } = req.user;
  // const id = 20;

  try {
    const getCharges = await knex('cobrancas')
      .select(
        'cobrancas.id',
        'clientes.nome',
        'cobrancas.descricao',
        'cobrancas.valor',
        'cobrancas.status',
        'cobrancas.vencimento',
      )
      .where('cobrancas.usuario_id', id)
      .leftJoin('clientes', 'cobrancas.cliente_id', 'clientes.id')
      .orderBy('cobrancas.id', 'asc');

    return res.status(200).json(getCharges);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clientCharges };
