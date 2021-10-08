const knex = require('../../config/knexConnect');

const clientGetAll = async (req, res) => {
  const { id } = req.user;

  try {
    const getClients = await knex('clientes')
      .select(
        'clientes.id',
        'clientes.nome',
        'clientes.email',
        'clientes.cpf',
        'clientes.telefone',
        'clientes.cep',
        'clientes.logradouro',
        'clientes.bairro',
        'clientes.cidade',
        'clientes.complemento',
        'clientes.ponto_referencia',
      )
      .where('clientes.usuario_id', id);

    const getReceived = await knex('cobrancas')
      .select(
        'cobrancas.cliente_id',
        knex.raw(`
        case
          when cobrancas.status = true then sum(valor)
        end as recebidas`),
      )
      .where('cobrancas.usuario_id', id)
      .andWhere('cobrancas.status', true)
      .groupBy('cobrancas.cliente_id', 'cobrancas.status');

    const getDone = await knex('cobrancas')
      .select('cobrancas.cliente_id')
      .sum({ feitas: 'valor' })
      .where('cobrancas.usuario_id', id)
      .groupBy('cobrancas.cliente_id');

    for (const key in getClients) {
      getReceived.find((item) =>
        item.cliente_id === getClients[key].id
          ? (getClients[key].recebidas = item.recebidas || 0)
          : '',
      );
    }

    for (const key in getClients) {
      getDone.find((item) =>
        item.cliente_id === getClients[key].id
          ? (getClients[key].feitas = item.feitas || 0)
          : '',
      );
    }

    if (!getClients.length) {
      return res.status(400).json('Nenhum cliente encontrado.');
    }
    return res.status(200).json(getClients);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { clientGetAll };
