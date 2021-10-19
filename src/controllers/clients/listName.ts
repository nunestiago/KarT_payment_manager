import knex from '../../config/knexConnect';
import { Request, Response } from 'express';

const listName = async (req: Request, res: Response) => {
  const { id } = req.user;

  try {
    const getClients = await knex('clientes')
      .select('clientes.id', 'clientes.nome')
      .where('clientes.usuario_id', id);

    if (!getClients.length) {
      return res.status(400).json('Nenhum cliente encontrado.');
    }
    return res.status(200).json(getClients);
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

export default listName;
