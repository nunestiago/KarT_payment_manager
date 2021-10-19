import bcrypt from 'bcrypt';
import knex from '../../config/knexConnect';
// const testeCPF = require('../../utils/cpfValidator');
import { Request, Response } from 'express';

const editClient = async (req: Request, res: Response) => {
  const newInfo = req.body;
  const { email, cpf, id: idClient } = newInfo;
  const { id } = req.user;
  try {
    const oldClient = await knex('clientes').where({ id: idClient }).first();

    if (oldClient.email !== email) {
      const isClient = await knex('clientes').where({ usuario_id: id, email });
      if (isClient.length) {
        return res.status(400).json('E-mail já cadastrado.');
      }
    }

    if (oldClient.cpf !== cpf) {
      const isCpf = await knex('clientes').where({ usuario_id: id, cpf });
      if (isCpf.length) {
        return res.status(400).json('CPF já cadastrado.');
      }
    }

    if (newInfo.senha) {
      newInfo.senha = await bcrypt.hash(newInfo.senha, 10);
    }

    // if (newInfo.cpf && !testeCPF(newInfo.cpf)) {
    //   return res.status(400).json('CPF inválido');
    // }
    const toUpdate = {
      id: newInfo.id,
      nome: newInfo.nome,
      email: newInfo.email,
      cpf: newInfo.cpf,
      telefone: newInfo.telefone,
      cep: newInfo.cep,
      logradouro: newInfo.logradouro,
      bairro: newInfo.bairro,
      cidade: newInfo.cidade,
      complemento: newInfo.complemento,
      ponto_referencia: newInfo.ponto_referencia,
    };

    const editClient = await knex('clientes')
      .update(toUpdate)
      .where('id', idClient);

    if (editClient !== 1) {
      return res.status(400).json('Não foi possível atualizar dados');
    }

    res.status(200).json('Cliente atualizado com sucesso');
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

export default editClient;
