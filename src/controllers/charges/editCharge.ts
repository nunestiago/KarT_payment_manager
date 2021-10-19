import knex from '../../config/knexConnect';
import chargeRegisterSchema from '../../validations/chargeRegisterSchema';
import { Request, Response } from 'express';

const editCharge = async (req: Request, res: Response) => {
  const charge = req.body;
  const { id } = req.user;
  try {
    await chargeRegisterSchema.validate(charge);
    const infoToUpdate = {
      id: charge.id,
      cliente_id: charge.cliente_id,
      usuario_id: id,
      vencimento: charge.vencimento,
      status: charge.status,
      valor: charge.valor,
      descricao: charge.descricao,
    };
    const editCharge = await knex('cobrancas')
      .update(infoToUpdate)
      .where('id', charge.id);

    if (editCharge === 0) {
      return res
        .status(400)
        .json(
          'Erro ao tentar editar cobrança, favor entrar em contato com suporte da KarT Devs.',
        );
    }

    return res.status(200).json('Cobrança editada com sucesso!');
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

export default editCharge;
