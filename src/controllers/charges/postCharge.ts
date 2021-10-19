import knex from '../../config/knexConnect';
import chargeRegisterSchema from '../../validations/chargeRegisterSchema';
import { Request, Response } from 'express';

const postCharge = async (req: Request, res: Response) => {
  const charge = req.body;
  const { id } = req.user;
  try {
    await chargeRegisterSchema.validate(charge);
    charge.usuario_id = id;
    const newCharge = await knex('cobrancas').insert(charge);
    if (!newCharge.rowCount) {
      return res
        .status(400)
        .json(
          'Erro ao tentar cadastrar cobrança, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Cobrança cadastrada com sucesso!');
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

export default postCharge;
