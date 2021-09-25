const jwt = require('jsonwebtoken');

const knex = require('../config/knexConnect');

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ['Login required'] });
  }

  const [, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = data;

    const isUser = await knex('usuarios').where('id', user.id);

    if (!isUser.length) {
      return res.status(404).json('Usuário não encontrado');
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = tokenValidation;
