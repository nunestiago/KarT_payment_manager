const knex = require('../config/knexConnect');

const alreadyExists = async (subject, res) => {
  const isAlreadyInDB = await knex('usuarios').where('email', subject.email);

  if (isAlreadyInDB.length) {
    return res.status(400).json('E-mail já cadastrado.');
  }
};

module.exports = alreadyExists;
