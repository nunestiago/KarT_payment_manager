const knex = require('../../config/knexConnect');

const homeInfo = async (req, res) => {
  const { id } = req.user;

  try {
    const queryCobrancas = await knex
      .table('cobrancas')
      .select([
        knex.raw(`
        count(
          case
            when vencimento > now()
            and status = false then 1
          end) as previstas`),
        knex.raw(`count(
          case
            when vencimento < now()
            and status = false then 1
          end) as vencida`),
        knex.raw(`count(
          case
            when  status = true then 1
          end) as pagas`),
      ])
      .where('cobrancas.usuario_id', id);

    const queryClientes = await knex
      .table('clientes')
      .select(
        'clientes.id',
        knex.raw(`
        case
          when count(cobrancas.pago_em) < count(cobrancas.vencimento) then 1
          else 0
        end as cliente_inadimplente,
        case
          when count(cobrancas.pago_em) < count(cobrancas.vencimento) then 0
          else 1
        end as cliente_em_dia`),
      )
      .count('cobrancas.pago_em as cobranca_paga')
      .leftJoin('cobrancas', function () {
        this.on('cobrancas.cliente_id', 'clientes.id').andOn(
          'cobrancas.usuario_id',
          id,
        );
      })
      .where('clientes.usuario_id', id)
      .groupBy('clientes.id');

    const clientes = {
      clienteEmDia: queryClientes.reduce(
        (total, obj) => obj.cliente_em_dia + total,
        0,
      ),
      clienteInadimplente: queryClientes.reduce(
        (total, obj) => obj.cliente_inadimplente + total,
        0,
      ),
    };

    const payload = {
      emDia: clientes.clienteEmDia,
      inadimplente: clientes.clienteInadimplente,
      previstas: queryCobrancas[0].previstas,
      vencidas: queryCobrancas[0].vencida,
      pagas: queryCobrancas[0].pagas,
    };
    return res.status(200).json(payload);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = homeInfo;
