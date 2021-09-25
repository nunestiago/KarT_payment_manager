const knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'postgres',
    password: '1',
    database: 'knexjs',
  },
});

module.exports = knex;
