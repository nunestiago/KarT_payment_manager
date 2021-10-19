import knex from '../config/knexConnect';
import { Response } from 'express';

interface ISubject {
  email: string;
}

const alreadyExists = async (subject: ISubject, res: Response) => {
  const isAlreadyInDB = await knex('usuarios').where('email', subject.email);

  if (isAlreadyInDB.length) {
    return res.status(400).json('E-mail já cadastrado.');
  }
};

export default alreadyExists;
