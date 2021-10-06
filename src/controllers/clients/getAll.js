const knex = require('../../config/knexConnect');

const clientGetAll = async (req, res) => {
  const { id } = req.user;

  try {
    const getClients = await knex('cobrancas')
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
      .sum({ feitas: 'valor' })
      .leftJoin('clientes', function () {
        this.on('cobrancas.cliente_id', 'clientes.id').andOn(
          'cobrancas.usuario_id',
          id,
        );
      })
      .where('cobrancas.usuario_id', id)
      .groupBy('cobrancas.cliente_id', 'clientes.id');

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

    for (const key in getClients) {
      getReceived.find((item) =>
        item.cliente_id === getClients[key].id
          ? (getClients[key].recebidas = item.recebidas)
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
