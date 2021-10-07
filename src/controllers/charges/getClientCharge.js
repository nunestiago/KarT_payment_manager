const knex = require('../../config/knexConnect');

const getClientCharge = async (req, res) => {
  const { id } = req.user;
  const { clientId } = req.query;

  try {
    const getClients = await knex('cobrancas')
      .select(
        'cobrancas.id',
        'cobrancas.descricao',
        'cobrancas.vencimento',
        'cobrancas.valor',
        'cobrancas.status',
      )
      .where('cobrancas.usuario_id', id)
      .andWhere('cobrancas.cliente_id', clientId);

    if (!getClients.length) {
      return res.status(400).json('Não há cobranças para o cliente.');
    }
    return res.status(200).json(getClients);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { getClientCharge };
