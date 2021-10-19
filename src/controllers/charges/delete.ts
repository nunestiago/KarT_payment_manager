import knex from '../../config/knexConnect';
import { Request, Response } from 'express';

const deleteCharge = async (req: Request, res: Response) => {
  const charge = req.body;
  try {
    const deleteCharge = await knex('cobrancas').where('id', charge.id).del();
    if (deleteCharge === 0) {
      return res
        .status(400)
        .json(
          'Erro ao tentar apagar cobrança, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Cobrança foi excluída');
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

export default deleteCharge;
