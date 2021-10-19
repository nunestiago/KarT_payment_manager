import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knex from '../../config/knexConnect';
import { Request, Response } from 'express';

import userLoginSchema from '../../validations/userLoginSchema';

const userLogin = async (req: Request, res: Response) => {
  const user = req.body;

  try {
    await userLoginSchema.validate(req.body);

    const isUser = await knex('usuarios').where('email', user.email);

    if (!isUser.length) {
      return res.status(400).json('Senha ou e-mail inválido.');
    }

    const foundUser = isUser[0];

    const verifyPass = await bcrypt.compare(user.senha, foundUser.senha);
    if (!verifyPass) {
      return res.status(400).json('Senha ou e-mail inválido.');
    }
    const jwtSecret = process.env.TOKEN_SECRET;
    const userSend = {
      id: foundUser.id,
      nome: foundUser.nome,
      email: foundUser.email,
      telefone: foundUser?.telefone,
      cpf: foundUser?.cpf,
    };
    const token = jwt.sign(userSend, jwtSecret, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });
    return res.status(200).json({ usuario: userSend, token });
  } catch (error) {
    return res.status(400).json((error as Error).message);
  }
};

export default userLogin;
