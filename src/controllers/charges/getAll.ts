import knex from '../../config/knexConnect';
import { Request, Response } from 'express';

const clientCharges = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const getCharges = await knex('cobrancas')
      .select(
        'cobrancas.id',
        'cobrancas.cliente_id',
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
    return res.status(400).json((error as Error).message);
  }
};

export default clientCharges;
